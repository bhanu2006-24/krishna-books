
import React from 'react';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import { Library as LibraryIcon, Sparkles } from 'lucide-react';

interface LibraryProps {
  savedBooks: Book[];
  onBookClick: (book: Book) => void;
  setActiveTab: (tab: string) => void;
}

export const Library: React.FC<LibraryProps> = ({ savedBooks, onBookClick, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-slate-950 pb-24 md:pt-20 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
          <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-lg">
             <LibraryIcon className="w-8 h-8 text-gold-500" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-white">My Personal Library</h1>
            <p className="text-slate-400 flex items-center gap-2">
                <span className="text-gold-500 font-bold">{savedBooks.length}</span> Books Saved
            </p>
          </div>
        </div>

        {savedBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 relative group">
                <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl group-hover:bg-gold-500/30 transition-all" />
                <LibraryIcon className="w-10 h-10 text-slate-600 relative z-10" />
            </div>
            <h2 className="text-2xl text-white font-serif font-bold mb-3">Your library is currently empty</h2>
            <p className="text-slate-500 max-w-md mb-8">
                Start building your collection by exploring our vast catalog of free public domain literature.
            </p>
            <button 
                onClick={() => setActiveTab('discover')}
                className="flex items-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg"
            >
                <Sparkles className="w-4 h-4" />
                Discover Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 animate-slide-up">
            {savedBooks.map((book) => (
              <BookCard key={book.id} book={book} onClick={onBookClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
