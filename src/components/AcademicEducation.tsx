import React, { useState } from 'react';
import { Award, GraduationCap, Calendar, CheckCircle, AlertCircle, Globe2, Wrench } from 'lucide-react';
import { Education, Certification } from '../types';

interface AcademicEducationProps {
  educations: Education[];
  certifications: Certification[];
  languages?: string[];
  tools?: string[];
}

export default function AcademicEducation({ educations, certifications, languages, tools }: AcademicEducationProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'grad' | 'certs'>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluído':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'Em andamento':
        return <Calendar className="w-4 h-4 text-blue-400 animate-pulse" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20';
      case 'Em andamento':
        return 'bg-blue-950/40 text-blue-400 border border-blue-500/20';
      default:
        return 'bg-amber-950/40 text-amber-400 border border-amber-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab controls */}
      <div className="no-print flex gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15 hover:bg-blue-500'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80 shadow-sm'
          }`}
        >
          Ver Todos
        </button>
        <button
          onClick={() => setActiveTab('grad')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'grad'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15 hover:bg-blue-500'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80 shadow-sm'
          }`}
        >
          Formação Acadêmica
        </button>
        <button
          onClick={() => setActiveTab('certs')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'certs'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15 hover:bg-blue-500'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80 shadow-sm'
          }`}
        >
          Certificações & Cursos
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education column */}
        {(activeTab === 'all' || activeTab === 'grad') && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              Formação Acadêmica
            </h3>
            
            <div className="space-y-4">
              {educations.map((edu, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl hover:border-slate-700/80 transition-all duration-300 shadow-sm hover:shadow-md group relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${getStatusClass(edu.status)}`}>
                      {getStatusIcon(edu.status)}
                      {edu.status}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-white group-hover:text-blue-400 transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-bold text-slate-400 mb-3">{edu.institution}</p>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{edu.description}</p>
                  
                  {edu.bullets && edu.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {edu.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-sm text-slate-300 flex gap-2">
                          <span className="text-blue-400">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications column */}
        {(activeTab === 'all' || activeTab === 'certs') && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Certificações & Competências
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl hover:border-slate-700/80 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      Credencial Ativa
                    </span>
                    <span className="text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md">
                      {cert.year}
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-sm font-bold text-slate-400 mb-3">{cert.institution}</p>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{cert.description}</p>

                  {cert.bullets && cert.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {cert.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-sm text-slate-300 flex gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages and Tools at the bottom (shown only when in general 'all' tab) */}
      {activeTab === 'all' && ((languages && languages.length > 0) || (tools && tools.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800/80 mt-10">
          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Globe2 className="w-5 h-5 text-blue-400" />
                Idiomas
              </h3>
              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl space-y-3">
                {languages.map((lang, idx) => {
                  const parts = lang.split(' – ');
                  const name = parts[0];
                  const desc = parts[1] || '';
                  return (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pb-2 border-b border-slate-800/40 last:border-0 last:pb-0">
                      <span className="font-extrabold text-white text-sm">{name}</span>
                      <span className="text-xs text-slate-400 font-medium text-left sm:text-right max-w-xs">{desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tools */}
          {tools && tools.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                Ferramentas de Trabalho
              </h3>
              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl">
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-3.5 py-1.5 bg-slate-950 text-slate-200 text-xs font-bold font-mono rounded-lg border border-slate-800/85 hover:border-slate-700/80 transition-all duration-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
