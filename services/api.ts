
import { Book, VolumeInfo, AccessInfo } from "../types";

const GOOGLE_BOOKS_BASE = "https://www.googleapis.com/books/v1/volumes";
const GUTENDEX_BASE = "https://gutendex.com/books";

// --- HELPER: Image Normalization ---
export const getBookCover = (book: Book): string => {
  const images = book.volumeInfo.imageLinks;
  if (!images) return "https://via.placeholder.com/300x450?text=No+Cover";
  
  // Prefer largest available
  const url = images.extraLarge || images.large || images.medium || images.thumbnail || images.smallThumbnail;
  if (!url) return "https://via.placeholder.com/300x450?text=No+Cover";
  
  return url.replace('http://', 'https://');
};

// --- PROVIDER 1: Google Books ---
const fetchGoogleBooks = async (query: string, startIndex = 0, maxResults = 20): Promise<Book[]> => {
  try {
    // Filter: free-ebooks ensures we get full viewability or at least significant previews
    let url = `${GOOGLE_BOOKS_BASE}?q=${encodeURIComponent(query)}&filter=free-ebooks&printType=books&maxResults=${maxResults}&startIndex=${startIndex}&langRestrict=en`;
    
    const response = await fetch(url);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.items) return [];

    return data.items.map((item: any) => ({
      id: item.id,
      etag: item.etag,
      selfLink: item.selfLink,
      volumeInfo: {
        title: item.volumeInfo.title,
        subtitle: item.volumeInfo.subtitle,
        authors: item.volumeInfo.authors || ['Unknown Author'],
        description: item.volumeInfo.description,
        publishedDate: item.volumeInfo.publishedDate,
        imageLinks: item.volumeInfo.imageLinks,
        categories: item.volumeInfo.categories,
        averageRating: item.volumeInfo.averageRating,
        language: item.volumeInfo.language,
        previewLink: item.volumeInfo.previewLink,
        infoLink: item.volumeInfo.infoLink
      },
      accessInfo: item.accessInfo
    })).filter((book: Book) => {
        // Double check viewability to avoid "empty" links
        return book.accessInfo.viewability !== 'NO_PAGES';
    });
  } catch (error) {
    console.warn("Google Books API failed", error);
    return [];
  }
};

// --- PROVIDER 2: Gutendex (Project Gutenberg) ---
const fetchGutendex = async (query: string): Promise<Book[]> => {
  try {
    let url = `${GUTENDEX_BASE}?search=${encodeURIComponent(query)}`;
    // 'popular' is special handling for Gutendex root
    if (query === 'popular') {
        url = GUTENDEX_BASE;
    }

    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    
    return data.results.map((item: any) => ({
      id: `gutendex-${item.id}`,
      etag: `gutendex-${item.id}`,
      selfLink: `https://gutendex.com/books/${item.id}`,
      volumeInfo: {
        title: item.title,
        authors: item.authors.map((a: any) => a.name),
        publishedDate: 'Public Domain', 
        description: "This book is part of the Project Gutenberg collection. It is available in the public domain for free.",
        imageLinks: {
          thumbnail: item.formats['image/jpeg']
        },
        categories: item.subjects,
        language: item.languages[0],
        previewLink: item.formats['text/html'] || item.formats['text/html; charset=utf-8'] || item.formats['text/plain'],
        infoLink: `https://www.gutenberg.org/ebooks/${item.id}`
      },
      accessInfo: {
        country: 'US',
        viewability: 'ALL_PAGES',
        embeddable: true,
        publicDomain: true,
        epub: {
          isAvailable: !!item.formats['application/epub+zip'],
          downloadLink: item.formats['application/epub+zip']
        },
        pdf: {
            isAvailable: !!item.formats['application/pdf'],
            downloadLink: item.formats['application/pdf']
        },
        webReaderLink: item.formats['text/html'] || item.formats['text/html; charset=utf-8'],
        accessViewStatus: 'FULL_PUBLIC_DOMAIN'
      }
    }));
  } catch (error) {
    console.warn("Gutendex API failed", error);
    return [];
  }
};

// --- MAIN SEARCH FUNCTION ---
export const searchBooks = async (query: string): Promise<Book[]> => {
  const [googleRes, gutendexRes] = await Promise.allSettled([
    fetchGoogleBooks(query),
    fetchGutendex(query)
  ]);

  let books: Book[] = [];

  // Prioritize Google Books for search as they have better covers usually
  if (googleRes.status === 'fulfilled') {
    books = [...books, ...googleRes.value];
  }
  
  if (gutendexRes.status === 'fulfilled') {
    books = [...books, ...gutendexRes.value];
  }

  // Deduplicate by Title (fuzzy)
  const seen = new Set();
  return books.filter(book => {
      const titleKey = book.volumeInfo.title?.toLowerCase().trim();
      if (!titleKey) return false;
      const duplicate = seen.has(titleKey);
      seen.add(titleKey);
      return !duplicate;
  });
};

export const fetchBooks = searchBooks;

export const getTrendingBooks = async (): Promise<Book[]> => {
  const [googleRes, gutendexRes] = await Promise.allSettled([
    fetchGoogleBooks('classic fiction', 0, 20), 
    fetchGutendex('popular')
  ]);

  let books: Book[] = [];
  
  // Prioritize Gutenberg for "Trending" as they are reliable classics
  if (gutendexRes.status === 'fulfilled') {
      books = [...books, ...gutendexRes.value];
  }

  if (googleRes.status === 'fulfilled') {
      books = [...books, ...googleRes.value];
  }

  return books;
};

export const getBooksByTopic = async (topic: string): Promise<Book[]> => {
  return searchBooks(topic);
};

export const getRelatedBooks = async (book: Book): Promise<Book[]> => {
  if (book.volumeInfo.categories && book.volumeInfo.categories.length > 0) {
    return fetchGoogleBooks(`subject:${book.volumeInfo.categories[0]}`, 0, 6);
  }
  if (book.volumeInfo.authors && book.volumeInfo.authors.length > 0) {
     return fetchGoogleBooks(`inauthor:${book.volumeInfo.authors[0]}`, 0, 6);
  }
  return [];
};
