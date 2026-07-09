import React from 'react';
import { FolderGit2, LineChart, MessageSquare, Cpu, Radio, Code2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Map specific icons based on project keywords for a beautiful customized look
  const getProjectIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('cto') || lowerTitle.includes('monitoramento')) {
      return <Radio className="w-5 h-5 text-blue-400" />;
    }
    if (lowerTitle.includes('financeira') || lowerTitle.includes('gestão')) {
      return <LineChart className="w-5 h-5 text-emerald-400" />;
    }
    if (lowerTitle.includes('bot') || lowerTitle.includes('telegram')) {
      return <MessageSquare className="w-5 h-5 text-cyan-400" />;
    }
    if (lowerTitle.includes('automação') || lowerTitle.includes('ferramentas')) {
      return <Cpu className="w-5 h-5 text-purple-400" />;
    }
    if (lowerTitle.includes('api') || lowerTitle.includes('integração')) {
      return <Code2 className="w-5 h-5 text-amber-400" />;
    }
    return <FolderGit2 className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, idx) => (
        <div 
          key={idx}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                {getProjectIcon(project.title)}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono bg-slate-950 px-2.5 py-1 rounded-full border border-slate-900">
                PROJETO
              </span>
            </div>
            
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60 mt-auto">
              {project.techStack.map((tech, tIdx) => (
                <span 
                  key={tIdx} 
                  className="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-950 text-slate-400 border border-slate-800/80 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
