import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, Search } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [selectedTag, setSelectedTag] = useState<string>('Todos');

  // Collect all unique skill tags across experiences
  const allTags = ['Todos', ...Array.from(new Set(experiences.flatMap(exp => exp.skills)))];

  // Simplify tags for clean buttons: we can just pick the top important categories or keep some
  const popularTags = [
    'Todos', 
    'Suporte Técnico N1/N2', 
    'Redes de Computadores', 
    'Gestão de Chamados', 
    'Cabeamento Estruturado', 
    'Equipamentos de Telecomunicações'
  ];

  const filteredExperiences = selectedTag === 'Todos'
    ? experiences
    : experiences.filter(exp => exp.skills.includes(selectedTag));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="no-print flex flex-col gap-3.5 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-slate-200 text-sm font-bold">
          <Search className="w-4 h-4 text-blue-400" />
          Filtrar experiência por foco técnico:
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-955 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l-2 border-slate-800 ml-4 pl-6 sm:pl-8 space-y-10 py-2">
        {filteredExperiences.map((exp, index) => (
          <div key={exp.id} className="relative group print-break-inside-avoid">
            {/* Dot Indicator */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#0B0F19] border-4 border-slate-800 flex items-center justify-center group-hover:border-blue-500 transition-colors duration-300 shadow-sm animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors" />
            </div>

            {/* Experience Card */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 sm:p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-700/80 border-l-4 border-l-blue-500">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-blue-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm sm:text-base mt-1">
                    <span>{exp.company}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-slate-400 font-semibold text-xs sm:text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs font-bold sm:self-start">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  {exp.period}
                </div>
              </div>

              {/* Bullet points */}
              <ul className="mt-4 space-y-2 text-slate-300 text-sm sm:text-base">
                {exp.description.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="text-blue-400 font-black mt-1 text-sm select-none">▸</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Experience tags */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {exp.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      selectedTag === skill
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-400 border border-slate-800/80'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}

        {filteredExperiences.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            Nenhuma experiência encontrada com o filtro selecionado.
          </div>
        )}
      </div>
    </div>
  );
}
