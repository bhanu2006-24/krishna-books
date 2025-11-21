
import React, { useState, useEffect } from 'react';
import { Book } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';
import { Library } from './pages/Library';
import { Genres } from './pages/Genres';
import { Reader } from './pages/Reader';
import { About } from './pages/About';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('lumina_saved_books_v3');
    if (saved) {
      try {
        setSavedBooks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved books", e);
      }
    }
  }, []);

  const handleSaveBook = (book: Book) => {
    const exists = savedBooks.some(b => b.id === book.id);
    let newSaved;
    if (exists) {
      newSaved = savedBooks.filter(b => b.id !== book.id);
    } else {
      newSaved = [...savedBooks, book];
    }
    setSavedBooks(newSaved);
    localStorage.setItem('lumina_saved_books_v3', JSON.stringify(newSaved));
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0,0);
  };

  const handleReadBook = (book: Book) => {
      setReadingBook(book);
  };

  // When a tab is clicked, clear the selected book to show the main page content
  const handleTabChange = (tab: string) => {
      setActiveTab(tab);
      setSelectedBook(null);
      window.scrollTo(0,0);
  };

  const renderContent = () => {
    if (readingBook) {
        return <Reader book={readingBook} onClose={() => setReadingBook(null)} />;
    }

    if (selectedBook) {
      return (
        <BookDetails 
          book={selectedBook} 
          onBack={() => setSelectedBook(null)}
          onSave={handleSaveBook}
          onRead={handleReadBook}
          onBookClick={handleBookClick}
          isSaved={savedBooks.some(b => b.id === selectedBook.id)}
        />
      );
    }

    switch (activeTab) {
      case 'discover':
        return <Home onBookClick={handleBookClick} setActiveTab={handleTabChange} />;
      case 'library':
        return <Library savedBooks={savedBooks} onBookClick={handleBookClick} setActiveTab={handleTabChange} />;
      case 'genres':
        return <Genres onBookClick={handleBookClick} />;
      case 'about':
        return <About />;
      default:
        return <Home onBookClick={handleBookClick} setActiveTab={handleTabChange} />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-gold-500/30 selection:text-gold-200 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Footer & Nav - Visible unless reading mode is active */}
      {!readingBook && (
        <>
            <Footer setActiveTab={handleTabChange} />
            <Navbar activeTab={selectedBook ? '' : activeTab} setActiveTab={handleTabChange} />
        </>
      )}
    </div>
  );
};

export default App;
