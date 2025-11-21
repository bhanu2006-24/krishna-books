
import React from 'react';
import { BookMarked, Globe, ShieldCheck, Zap, Code, Database, Layout, Cpu, Github, Linkedin, Instagram } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 pb-24 pt-20 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-20 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <div className="inline-block p-4 bg-slate-800 rounded-2xl mb-6 shadow-lg border border-slate-700 ring-1 ring-gold-500/20">
                <BookMarked className="w-12 h-12 text-gold-500" />
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">Preserving Human Knowledge</h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  Lumina Bibliotheca is a digital initiative dedicated to making classic literature accessible, beautiful, and free for everyone, everywhere.
              </p>
          </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-gold-500/30 transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Universal Access</h3>
                  <p className="text-slate-400">
                      We leverage modern APIs to provide free access to thousands of public domain works. Knowledge has no borders, and neither do we.
                  </p>
              </div>
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-gold-500/30 transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 bg-gold-900/30 rounded-lg flex items-center justify-center mb-6 text-gold-400 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Modern Experience</h3>
                  <p className="text-slate-400">
                      Say goodbye to clunky archives. Experience classic books with a fluid, responsive interface designed for the modern reader.
                  </p>
              </div>
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-gold-500/30 transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Always Free</h3>
                  <p className="text-slate-400">
                      No subscriptions, no hidden fees, and no registration walls. We believe that education and literature should be free rights.
                  </p>
              </div>
          </div>
      </div>

      {/* Founder Section - Enhanced */}
      <div className="bg-slate-900 py-20 border-y border-slate-800 relative">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl">
                
                {/* Image Column */}
                <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gold-500 blur-[40px] opacity-20 rounded-full"></div>
                    <img 
                        src="https://github.com/bhanu2006-24.png" 
                        alt="Bhanu Pratap Saini" 
                        className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-4 border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                    />
                </div>

                {/* Content Column */}
                <div className="text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-white">Bhanu Pratap Saini</h2>
                            <p className="text-gold-500 font-medium tracking-wider uppercase text-sm mt-1">Founder & Lead Developer</p>
                        </div>
                        
                        <div className="flex gap-3">
                             <a href="https://github.com/bhanu2006-24" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800">
                                <Github className="w-5 h-5" />
                             </a>
                             <a href="https://www.linkedin.com/in/bhanu-saini-3bb251391/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800">
                                <Linkedin className="w-5 h-5" />
                             </a>
                             <a href="https://instagram.com/krishna_websites" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800">
                                <Instagram className="w-5 h-5" />
                             </a>
                        </div>
                    </div>

                    <p className="text-slate-400 leading-relaxed mb-6">
                        "I built Lumina Bibliotheca with a simple yet powerful vision: to bridge the gap between the timeless wisdom of the past and the technology of the future. As a passionate Full Stack Developer, I believe that great UI/UX isn't just about looking good—it's about making information accessible, enjoyable, and inspiring."
                    </p>
                    
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/50">
                        <p className="text-sm text-slate-300 italic">
                            "Coding is the closest thing we have to magic. We can create worlds, solve problems, and connect people with just a few lines of text."
                        </p>
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-2xl font-bold text-white text-center mb-12 flex items-center justify-center gap-2">
              <Cpu className="w-6 h-6 text-gold-500" />
              Built With Modern Tech
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-center hover:border-gold-500/50 transition-colors">
                  <Code className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white">React 19</h4>
                  <p className="text-xs text-slate-500 mt-1">Component Architecture</p>
              </div>
              <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-center hover:border-gold-500/50 transition-colors">
                  <Layout className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white">Tailwind CSS</h4>
                  <p className="text-xs text-slate-500 mt-1">Responsive Design</p>
              </div>
              <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-center hover:border-gold-500/50 transition-colors">
                  <Database className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white">Google Books</h4>
                  <p className="text-xs text-slate-500 mt-1">Data Provider</p>
              </div>
              <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-center hover:border-gold-500/50 transition-colors">
                  <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white">TypeScript</h4>
                  <p className="text-xs text-slate-500 mt-1">Type Safety</p>
              </div>
          </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-4 text-center pb-20">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Our Mission</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
              "A room without books is like a body without a soul." — Cicero.
              <br/><br/>
              In an age of fleeting digital content, we aim to anchor the timeless wisdom of the past. By utilizing modern technology, we bridge the gap between ancient manuscripts and modern screens, ensuring that the stories, philosophies, and discoveries of our ancestors continue to inspire future generations.
          </p>
      </div>
    </div>
  );
};
