import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Code, Settings } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isPrintMode: boolean;
  setIsPrintMode: (mode: boolean) => void;
  onAdminClick?: () => void;
}

export default function Header({ activeSection, setActiveSection, isPrintMode, setIsPrintMode, onAdminClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'experiencia', label: 'Experiência' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'certificacoes', label: 'Formação' },
    { id: 'contato', label: 'Contato' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    
    if (isPrintMode) {
      setIsPrintMode(false);
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 no-print ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-slate-950/35' 
          : 'bg-[#0B0F19]/60 backdrop-blur-sm border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          {onAdminClick ? (
            <button 
              onClick={onAdminClick}
              title="Acesso Restrito"
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md hover:border-blue-500/50 hover:bg-slate-950 transition-all cursor-pointer group focus:outline-none"
            >
              <span className="text-white font-extrabold text-xs group-hover:text-blue-400 transition-colors">SV</span>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-xs">SV</span>
            </div>
          )}
          <button 
            onClick={() => handleNavClick('inicio')}
            className="text-left leading-none hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
          >
            <span className="block text-sm font-black text-white">Samuel Victor</span>
            <span className="block text-[10px] font-bold text-blue-400 tracking-wider uppercase mt-0.5">IT Consultant</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeSection === item.id && !isPrintMode
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => setIsPrintMode(!isPrintMode)}
            className={`ml-4 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              isPrintMode
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 hover:bg-amber-500'
                : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800 shadow-sm'
            }`}
          >
            <FileText className="w-4 h-4" />
            {isPrintMode ? 'Visualizar Site' : 'Modo Impressão'}
          </button>
        </nav>

        {/* Mobile menu toggle & print mode button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsPrintMode(!isPrintMode)}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isPrintMode ? 'bg-amber-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-300 shadow-sm'
            }`}
            title={isPrintMode ? "Visualizar Site" : "Modo Impressão"}
          >
            <FileText className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 py-4 px-4 shadow-xl flex flex-col gap-1.5 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeSection === item.id && !isPrintMode
                  ? 'bg-blue-500/10 text-blue-400 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
