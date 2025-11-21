
import React from 'react';
import { BookMarked, Heart, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand Section - Spans 5 columns */}
          <div className="col-span-1 md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <BookMarked className="w-8 h-8 text-gold-500" />
              <span className="font-serif text-2xl font-bold text-white">Krishna Books</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
              A premium digital library offering free access to thousands of public domain books. Read, download, and explore classic literature in a modern interface.
            </p>

            {/* Social Links - Minimalist Icons */}
            <div className="flex gap-4">
              <a href="https://github.com/bhanu2006-24" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-gold-600 transition-all duration-300 hover:-translate-y-1">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/bhanu-saini-3bb251391/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-[#0077B5] transition-all duration-300 hover:-translate-y-1">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/krishna_websites" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-[#E4405F] transition-all duration-300 hover:-translate-y-1">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Links Sections */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-bold mb-6 border-b border-gold-500/30 inline-block pb-1">Discover</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button onClick={() => setActiveTab('trending')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>Trending Books</button></li>
              <li><button onClick={() => setActiveTab('genres')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>Collections</button></li>
              <li><button onClick={() => setActiveTab('library')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>My Library</button></li>
              <li><button onClick={() => setActiveTab('discover')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>Advanced Search</button></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-bold mb-6 border-b border-gold-500/30 inline-block pb-1">Genres</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button onClick={() => setActiveTab('genres')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>Fiction & Literature</button></li>
              <li><button onClick={() => setActiveTab('genres')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>Mystery & Thriller</button></li>
              <li><button onClick={() => setActiveTab('genres')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>Science & Nature</button></li>
              <li><button onClick={() => setActiveTab('genres')} className="hover:text-gold-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-gold-500 rounded-full group-hover:w-2 transition-all"></span>History & Philosophy</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Krishna Books. Aggregated from Public Domain Sources.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by Bhanu Pratap Saini.
          </p>
        </div>
      </div>
    </footer>
  );
};
