
import React, { useEffect, useState } from 'react';
import { Book, VolumeInfo } from '../types';
import { getBookCover, getRelatedBooks } from '../services/api';
import { BookCard } from '../components/BookCard';
import { ArrowLeft, BookOpen, User, Download, Share2, Bookmark, Smartphone, FileText, Calendar, Languages, FileCode } from 'lucide-react';

interface BookDetailsProps {
  book: Book;
  onBack: () => void;
  onSave: (book: Book) => void;
  onRead: (book: Book) => void;
  onBookClick: (book: Book) => void;
  isSaved: boolean;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ book, onBack, onSave, onRead, onBookClick, isSaved }) => {
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const coverUrl = getBookCover(book);
  const info: VolumeInfo = book.volumeInfo;
  const access = book.accessInfo;

  // Format description (remove HTML tags basically)
  const cleanDescription = info.description?.replace(/<[^>]*>/g, '') || 'No description available for this title.';
  
  useEffect(() => {
    const fetchRelated = async () => {
        const related = await getRelatedBooks(book);
        setRelatedBooks(related.filter(b => b.id !== book.id));
    };
    fetchRelated();
    window.scrollTo(0, 0);
  }, [book]);

  return (
    <div className="min-h-screen bg-slate-950 animate-fade-in pb-10">
      {/* Desktop Back Button (Sticky) */}
      <div className="hidden md:block sticky top-20 left-0 z-40 px-8 pt-4 pointer-events-none">
          <div className="max-w-7xl mx-auto">
              <button 
                onClick={onBack} 
                className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:border-gold-500/50 transition-all group shadow-lg"
              >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Browse
              </button>
          </div>
      </div>

      {/* Hero Background */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden md:-mt-16">
        <div 
            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 scale-110"
            style={{ backgroundImage: `url(${coverUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/80 to-slate-950" />
        
        {/* Mobile Back Button */}
        <div className="absolute top-4 left-4 z-20 md:hidden">
          <button onClick={onBack} className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-64 md:-mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Cover Image Card */}
          <div className="flex-shrink-0 mx-auto md:mx-0 w-48 md:w-72 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border-4 border-slate-800 bg-slate-900">
            <img 
              src={coverUrl} 
              alt={info.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left pt-4 md:pt-10">
            <div className="mb-8">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    {info.categories?.slice(0,3).map(cat => (
                        <span key={cat} className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-medium border border-gold-500/20">
                            {cat}
                        </span>
                    ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {info.title}
                </h1>
                {info.subtitle && <p className="text-xl text-slate-400 mb-4 font-light">{info.subtitle}</p>}
                
                <div className="flex flex-col md:flex-row items-center gap-6 text-slate-300 text-sm md:text-base">
                    <p className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gold-500" />
                        <span className="font-medium text-white">{info.authors?.join(', ') || 'Unknown Author'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold-500" />
                        <span>{info.publishedDate || 'Unknown Date'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-gold-500" />
                        <span className="uppercase">{info.language || 'EN'}</span>
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
              <button 
                onClick={() => onRead(book)}
                className="px-8 py-4 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center gap-3 transition-all hover:scale-105 active:scale-95 ring-1 ring-white/20"
              >
                <BookOpen className="w-6 h-6" />
                Read Online
              </button>
              
              <button 
                onClick={() => onSave(book)}
                className={`px-6 py-4 rounded-xl font-medium flex items-center gap-2 transition-all border ${
                  isSaved 
                    ? 'bg-slate-800 text-gold-500 border-gold-500/50' 
                    : 'bg-slate-800/60 text-white hover:bg-slate-700 border-slate-700 hover:border-slate-600'
                } backdrop-blur-sm`}
              >
                {isSaved ? <Bookmark className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
                {isSaved ? 'Saved' : 'Library'}
              </button>
            </div>
            
            {/* Downloads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Download className="w-5 h-5 text-gold-500" /> 
                        Download Options
                    </h3>
                    <div className="space-y-3">
                        {access.pdf?.isAvailable && access.pdf.downloadLink ? (
                             <a href={access.pdf.downloadLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-red-400" />
                                    <div>
                                        <p className="text-sm font-medium text-white">PDF Format</p>
                                        <p className="text-xs text-slate-500">Original Layout</p>
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-slate-500 group-hover:text-white" />
                             </a>
                        ) : (
                            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg opacity-50 cursor-not-allowed">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">PDF Unavailable</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {access.epub?.isAvailable && access.epub.downloadLink ? (
                             <a href={access.epub.downloadLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium text-white">EPUB Format</p>
                                        <p className="text-xs text-slate-500">Flowing Text</p>
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-slate-500 group-hover:text-white" />
                             </a>
                        ) : (
                             <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg opacity-50 cursor-not-allowed">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">EPUB Unavailable</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description Box */}
                <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-gold-500" /> 
                        Synopsis
                    </h3>
                    <div className="prose prose-invert prose-sm max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">{cleanDescription}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
            <div className="mt-16 pt-16 border-t border-slate-800">
                <h3 className="text-2xl font-serif font-bold text-white mb-8">You might also like</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {relatedBooks.map(b => (
                        <BookCard key={b.id} book={b} onClick={onBookClick} />
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
