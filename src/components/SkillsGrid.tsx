import React, { useState } from 'react';
import { Headset, Network, Code, Sparkles, Users } from 'lucide-react';
import { Skill } from '../types';

interface SkillsGridProps {
  skills: Skill[];
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'suporte' | 'redes' | 'desenvolvimento' | 'ia' | 'soft'>('all');

  const categories = [
    { id: 'all', label: 'Todas', icon: null },
    { id: 'suporte', label: 'Suporte & Infraestrutura', icon: Headset, color: 'text-blue-400 bg-blue-950/40 border-blue-900/50' },
    { id: 'redes', label: 'Redes & Telecom', icon: Network, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/50' },
    { id: 'desenvolvimento', label: 'Desenvolvimento & Automação', icon: Code, color: 'text-purple-400 bg-purple-950/40 border-purple-900/50' },
    { id: 'ia', label: 'Inteligência Artificial', icon: Sparkles, color: 'text-cyan-400 bg-cyan-950/40 border-cyan-900/50' },
    { id: 'soft', label: 'Habilidades Pessoais', icon: Users, color: 'text-amber-400 bg-amber-950/40 border-amber-900/50' }
  ];

  const filteredSkills = activeTab === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeTab);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'suporte': return <Headset className="w-4 h-4 text-blue-400" />;
      case 'redes': return <Network className="w-4 h-4 text-emerald-400" />;
      case 'desenvolvimento': return <Code className="w-4 h-4 text-purple-400" />;
      case 'ia': return <Sparkles className="w-4 h-4 text-cyan-400" />;
      default: return <Users className="w-4 h-4 text-amber-400" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'suporte': return 'Suporte & Infraestrutura';
      case 'redes': return 'Redes & Telecom';
      case 'desenvolvimento': return 'Desenvolvimento & Automação';
      case 'ia': return 'Inteligência Artificial';
      default: return 'Habilidades Pessoais';
    }
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'suporte': return { bar: 'bg-blue-500', bg: 'bg-blue-950/40', text: 'text-blue-400 font-bold', border: 'border-slate-800' };
      case 'redes': return { bar: 'bg-emerald-500', bg: 'bg-emerald-950/40', text: 'text-emerald-400 font-bold', border: 'border-slate-800' };
      case 'desenvolvimento': return { bar: 'bg-purple-500', bg: 'bg-purple-950/40', text: 'text-purple-400 font-bold', border: 'border-slate-800' };
      case 'ia': return { bar: 'bg-cyan-500', bg: 'bg-cyan-950/40', text: 'text-cyan-400 font-bold', border: 'border-slate-800' };
      default: return { bar: 'bg-amber-500', bg: 'bg-amber-950/40', text: 'text-amber-400 font-bold', border: 'border-slate-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="no-print flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15 hover:bg-blue-500'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800/80 shadow-sm'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, index) => {
          const theme = getCategoryTheme(skill.category);
          return (
            <div 
              key={index} 
              className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-xl hover:border-slate-700/80 shadow-sm transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-extrabold text-white group-hover:text-blue-400 transition-colors text-sm sm:text-base leading-snug">
                  {skill.name}
                </span>
                <div className="flex items-center gap-1">
                  {getCategoryIcon(skill.category)}
                </div>
              </div>

              {/* Progress and Level */}
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between text-xs">
                  <span className={`font-bold ${theme.text} uppercase tracking-wider text-[10px]`}>
                    {getCategoryLabel(skill.category)}
                  </span>
                  <span className="font-mono text-slate-400 font-bold">{skill.level}%</span>
                </div>
                
                {/* Visual Bar */}
                <div className={`h-2 w-full ${theme.bg} rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full ${theme.bar} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
