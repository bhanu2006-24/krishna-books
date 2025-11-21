
import React from 'react';
import { BookMarked, Search, Library, Layers, Info } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'genres', label: 'Genres', icon: Layers },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto z-50 bg-slate-950/95 backdrop-blur-xl border-t md:border-b md:border-t-0 border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="hidden md:flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setActiveTab('discover')}
          >
            <div className="bg-gradient-to-tr from-gold-600 to-gold-400 p-2 rounded-lg shadow-lg shadow-gold-500/20">
              <BookMarked className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-white tracking-wide block leading-none">Krishna</span>
              <span className="text-xs text-gold-500 font-medium tracking-[0.2em] uppercase">Books</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex w-full md:w-auto justify-between md:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 md:px-5 py-2 rounded-xl transition-all duration-300 relative group overflow-hidden
                  ${activeTab === item.id
                    ? 'text-gold-400'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {activeTab === item.id && (
                  <div className="absolute inset-0 bg-gold-500/10 rounded-xl animate-fade-in" />
                )}
                <item.icon className={`w-6 h-6 md:w-5 md:h-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className={`text-[10px] md:text-sm font-medium ${activeTab === item.id ? 'font-semibold' : ''}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
