
import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { getBooksByTopic } from '../services/api';
import { BookCard } from '../components/BookCard';
import { Loader2, Layers } from 'lucide-react';

interface GenresProps {
  onBookClick: (book: Book) => void;
}

const TOPICS = [
  { name: 'Fiction', query: 'fiction', color: 'from-blue-600 to-blue-800' },
  { name: 'Mystery', query: 'mystery', color: 'from-purple-600 to-purple-800' },
  { name: 'Romance', query: 'romance', color: 'from-pink-600 to-pink-800' },
  { name: 'Science Fiction', query: 'science+fiction', color: 'from-emerald-600 to-emerald-800' },
  { name: 'Fantasy', query: 'fantasy', color: 'from-indigo-600 to-indigo-800' },
  { name: 'History', query: 'history', color: 'from-amber-700 to-amber-900' },
  { name: 'Thriller', query: 'thriller', color: 'from-red-700 to-red-900' },
  { name: 'Philosophy', query: 'philosophy', color: 'from-slate-600 to-slate-800' },
  { name: 'Poetry', query: 'poetry', color: 'from-rose-600 to-rose-800' },
  { name: 'Classic', query: 'classic', color: 'from-teal-600 to-teal-800' }
];

export const Genres: React.FC<GenresProps> = ({ onBookClick }) => {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTopic(selectedTopic.query);
  }, [selectedTopic]);

  const loadTopic = async (query: string) => {
    setLoading(true);
    const data = await getBooksByTopic(query);
    setBooks(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 animate-fade-in">
       <div className="max-w-7xl mx-auto px-4 py-12 md:pt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-slate-800 rounded-xl text-gold-500 border border-slate-700">
                <Layers className="w-6 h-6" />
            </div>
            <div>
                <h1 className="text-3xl font-serif font-bold text-white">Browse Collections</h1>
                <p className="text-slate-400 text-sm">Discover books by your favorite genres</p>
            </div>
          </div>

          {/* Categories Rail */}
          <div className="flex gap-4 overflow-x-auto pb-6 mb-8 scrollbar-hide">
             {TOPICS.map((topic) => (
                 <button
                    key={topic.name}
                    onClick={() => setSelectedTopic(topic)}
                    className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group border ${
                        selectedTopic.name === topic.name 
                        ? 'text-white shadow-lg scale-105 border-transparent' 
                        : 'text-slate-400 bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                 >
                    {selectedTopic.name === topic.name && (
                         <div className={`absolute inset-0 bg-gradient-to-r ${topic.color} opacity-100`} />
                    )}
                    <span className="relative z-10">{topic.name}</span>
                 </button>
             ))}
          </div>

          {/* Results */}
          <div className="min-h-[400px]">
              <h2 className="text-xl text-slate-300 mb-6 flex items-center gap-2">
                  Top picks in <span className="text-gold-500 font-serif font-bold">{selectedTopic.name}</span>
                  {loading && <Loader2 className="w-5 h-5 animate-spin ml-2" />}
              </h2>
              
              {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                      {[...Array(10)].map((_, i) => (
                          <div key={i} className="aspect-[2/3] bg-slate-800/50 rounded-xl animate-pulse border border-slate-800" />
                      ))}
                  </div>
              ) : books.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 animate-slide-up">
                      {books.map(book => (
                          <BookCard key={book.id} book={book} onClick={onBookClick} />
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-20 text-slate-500">
                      No books found for this genre.
                  </div>
              )}
          </div>
       </div>
    </div>
  );
};
