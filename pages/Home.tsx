
import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import { searchBooks, getTrendingBooks } from '../services/api';
import { Search, Loader2, Sparkles, BookOpen, ArrowRight, Dice5, Quote } from 'lucide-react';

interface HomeProps {
  onBookClick: (book: Book) => void;
  setActiveTab: (tab: string) => void;
}

const RANDOM_TOPICS = [
    "Cyberpunk", "Victorian", "Space Opera", "Noir", "Renaissance", "Mythology", "Steampunk", "Dystopian", "Gothic Horror", "Samurai"
];

const QUOTES = [
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "A room without books is like a body without a soul.", author: "Cicero" },
    { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
    { text: "That is part of the beauty of all literature. You discover that your longings are universal longings, that you're not lonely and isolated from anyone. You belong.", author: "F. Scott Fitzgerald" }
];

export const Home: React.FC<HomeProps> = ({ onBookClick, setActiveTab }) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'trending' | 'search'>('trending');
  const [dailyQuote, setDailyQuote] = useState(QUOTES[0]);

  useEffect(() => {
    loadTrending();
    // Random quote
    setDailyQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const loadTrending = async () => {
    setLoading(true);
    setMode('trending');
    const data = await getTrendingBooks();
    setBooks(data);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setMode('search');
    const data = await searchBooks(query);
    setBooks(data);
    setLoading(false);
  };

  const handleSurpriseMe = () => {
      const randomTopic = RANDOM_TOPICS[Math.floor(Math.random() * RANDOM_TOPICS.length)];
      setQuery(randomTopic);
      setMode('search');
      setLoading(true);
      searchBooks(randomTopic).then(data => {
          setBooks(data);
          setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 animate-fade-in">
      {/* Hero / Search Section */}
      <div className="relative py-16 px-4 md:py-24 overflow-hidden border-b border-slate-900">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
           <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-gold-500 text-xs font-medium mb-6 backdrop-blur-md animate-slide-up">
             <Sparkles className="w-3 h-3" />
             <span>Over 10,000+ Free Public Domain Books</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 mb-6 drop-shadow-xl animate-slide-up" style={{animationDelay: '0.1s'}}>
            Explore the World of<br/>Classic Literature
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            A curated digital library providing instant access to history's greatest works. Read online or download PDF/EPUB formats completely free.
          </p>
          
          {/* Quote Section */}
          <div className="mb-10 max-w-xl mx-auto bg-slate-900/40 backdrop-blur-sm p-4 rounded-xl border border-slate-800/50 animate-slide-up hidden md:block" style={{animationDelay: '0.25s'}}>
             <div className="flex gap-2 text-slate-500 italic text-sm justify-center">
                 <Quote className="w-4 h-4 text-gold-500 rotate-180" />
                 <span>{dailyQuote.text}</span>
                 <Quote className="w-4 h-4 text-gold-500" />
             </div>
             <p className="text-right text-xs text-gold-500 mt-2 mr-4">— {dailyQuote.author}</p>
          </div>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group animate-slide-up flex gap-2" style={{animationDelay: '0.3s'}}>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-500 group-focus-within:text-gold-500 transition-colors" />
                </div>
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for titles, authors, or ISBN..."
                className="w-full pl-12 pr-4 py-5 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 shadow-2xl transition-all text-lg"
                />
            </div>
            
            <button 
                type="button"
                onClick={handleSurpriseMe}
                className="px-5 bg-slate-800 hover:bg-slate-700 text-gold-500 border border-slate-700 rounded-2xl transition-colors shadow-lg flex flex-col items-center justify-center gap-1 min-w-[80px]"
                title="Surprise Me"
            >
                <Dice5 className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
                <span className="text-[10px] font-medium">Surprise</span>
            </button>

            <button 
                type="submit"
                className="px-8 bg-gold-600 hover:bg-gold-500 text-white font-medium rounded-2xl transition-colors shadow-lg flex items-center justify-center"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
              {['Shakespeare', 'Jane Austen', 'Sci-Fi', 'Philosophy', 'History'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => { setQuery(tag); setMode('search'); setLoading(true); searchBooks(tag).then(d => { setBooks(d); setLoading(false); }); }}
                    className="px-3 py-1 text-xs md:text-sm text-slate-400 hover:text-gold-400 border border-transparent hover:border-gold-500/30 bg-slate-800/30 rounded-full transition-all"
                  >
                    {tag}
                  </button>
              ))}
          </div>
        </div>
      </div>

      {/* Featured Categories Banner */}
      {mode === 'trending' && (
          <div className="bg-slate-900/50 border-b border-slate-800 py-8">
             <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-slate-800 rounded-xl text-gold-500">
                         <BookOpen className="w-6 h-6" />
                     </div>
                     <div>
                         <h3 className="text-white font-bold">New to Classics?</h3>
                         <p className="text-slate-400 text-sm">Start with our curated genre collections.</p>
                     </div>
                 </div>
                 <button 
                    onClick={() => setActiveTab('genres')}
                    className="flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
                 >
                     Browse Genres <ArrowRight className="w-4 h-4" />
                 </button>
             </div>
          </div>
      )}

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-3">
            {mode === 'trending' ? (
                <>
                  <span className="w-1 h-8 bg-gold-500 rounded-full" />
                  Featured Collection
                </>
            ) : (
                <>
                  <Search className="w-6 h-6 text-gold-500" />
                  Results for "{query}"
                </>
            )}
          </h2>
          {mode === 'search' && (
              <button onClick={loadTrending} className="text-sm text-gold-500 hover:text-gold-400 hover:underline flex items-center gap-1">
                  &larr; Back to Trending
              </button>
          )}
        </div>

        {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                 {[...Array(10)].map((_, i) => (
                      <div key={i} className="aspect-[2/3] bg-slate-800/50 rounded-xl animate-pulse border border-slate-800" />
                 ))}
            </div>
        ) : books.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 animate-slide-up">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onClick={onBookClick} />
              ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
                <div className="inline-block p-4 bg-slate-800 rounded-full mb-4">
                     <Search className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-xl text-white font-semibold mb-2">No books found</h3>
                <p className="text-slate-500">Try adjusting your search terms or look for a different author.</p>
            </div>
        )}
      </div>
    </div>
  );
};
