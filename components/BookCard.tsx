
import React from 'react';
import { Book } from '../types';
import { getBookCover } from '../services/api';
import { BookOpen, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const coverUrl = getBookCover(book);
  const { title, authors, averageRating } = book.volumeInfo;
  
  const authorName = authors && authors.length > 0 ? authors.join(', ') : 'Unknown Author';

  return (
    <div 
      onClick={() => onClick(book)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-slate-700 hover:border-gold-500/50 flex flex-col h-full"
    >
      <div className="aspect-[2/3] w-full relative overflow-hidden bg-slate-900">
        <img 
          src={coverUrl} 
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             <BookOpen className="w-8 h-8 text-gold-400 mx-auto mb-2" />
             <p className="text-white font-semibold text-sm">View Details</p>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-serif font-bold text-base leading-tight line-clamp-2 mb-1 group-hover:text-gold-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-xs mb-2 line-clamp-1">
          {authorName}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-700/50">
            {averageRating ? (
                <div className="flex items-center gap-1 text-gold-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">{averageRating}</span>
                </div>
            ) : (
                <span className="text-xs text-slate-600">No ratings</span>
            )}
            <div className="px-2 py-0.5 bg-slate-700/50 rounded text-[10px] text-slate-300 uppercase tracking-wider">
                Free
            </div>
        </div>
      </div>
    </div>
  );
};
