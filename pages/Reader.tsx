
import React from 'react';
import { Book } from '../types';
import { X, ExternalLink, BookOpen } from 'lucide-react';

interface ReaderProps {
  book: Book;
  onClose: () => void;
}

export const Reader: React.FC<ReaderProps> = ({ book, onClose }) => {
  const webReaderLink = book.accessInfo.webReaderLink;
  const previewLink = book.volumeInfo.previewLink;
  
  // Prefer webReaderLink, fallback to previewLink
  const targetUrl = webReaderLink || previewLink;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in p-4">
       <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 max-w-md w-full shadow-2xl text-center relative">
           <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
               <X className="w-6 h-6" />
           </button>

           <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <BookOpen className="w-8 h-8 text-gold-500" />
           </div>

           <h2 className="text-2xl font-serif font-bold text-white mb-2">Reading "{book.volumeInfo.title}"</h2>
           <p className="text-slate-400 mb-8">
               To ensure the best reading experience and security, this book will open in Google's optimized web reader.
           </p>

           {targetUrl ? (
               <a 
                 href={targetUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block w-full py-4 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
               >
                   Launch Reader <ExternalLink className="w-5 h-5" />
               </a>
           ) : (
               <div className="p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                   Sorry, no reading link is available for this title.
               </div>
           )}
           
           <button onClick={onClose} className="mt-4 text-sm text-slate-500 hover:text-slate-300 underline">
               Return to Details
           </button>
       </div>
    </div>
  );
};
