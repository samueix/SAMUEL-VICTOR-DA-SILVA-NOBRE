import React from 'react';
import { Printer, Mail, Phone, MapPin, Linkedin, Calendar, Award, GraduationCap, ArrowLeft } from 'lucide-react';
import { PersonalInfo, Experience, Skill, Certification, Education, Project } from '../types';

interface PrintResumeProps {
  onBackClick: () => void;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: Skill[];
  certifications: Certification[];
  educations: Education[];
  projects: Project[];
}

export default function PrintResume({ 
  onBackClick, 
  personalInfo, 
  experiences, 
  skills, 
  certifications, 
  educations,
  projects
}: PrintResumeProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white text-slate-900 p-4 sm:p-8 min-h-screen print:min-h-0 print:h-auto print:p-0">
      {/* Dynamic Printing CSS style overrides to remove browser headers/footers and ensure exact colors/margins */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm 15mm 15mm 15mm !important; /* Native page margin, hides default headers/footers */
          }
          body {
            background-color: white !important;
            color: #0f172a !important; /* slate-900 */
            padding: 0 !important;
            margin: 0 !important;
            min-height: 0 !important;
            height: auto !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          /* Prevent elements from breaking awkwardly across pages */
          .print-break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}} />
      
      {/* Header tools for web view */}
      <div className="no-print max-w-4xl mx-auto mb-6 bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
        <button
          onClick={onBackClick}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg text-sm font-semibold flex items-center gap-1.5 border border-slate-200 shadow-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          Voltar para o Site
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-md shadow-blue-600/15 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Salvar PDF
        </button>
      </div>

      {/* Alert notice if running inside an iframe */}
      {typeof window !== 'undefined' && window.self !== window.top && (
        <div className="no-print max-w-4xl mx-auto mb-6 bg-amber-50 border border-amber-200 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex gap-3.5">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div>
              <h4 className="text-sm font-bold text-amber-950">Por que a janela de PDF não abriu?</h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                Você está visualizando o site dentro do painel do AI Studio (iframe). Por segurança, os navegadores bloqueiam impressões dentro de sub-janelas integradas.
                Para baixar ou imprimir o seu currículo em PDF, clique no botão <strong>"Abrir em Nova Aba"</strong> ao lado ou use o botão no topo direito do AI Studio.
              </p>
            </div>
          </div>
          <a
            href={window.location.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto text-center shrink-0 px-4.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/10 active:scale-95 cursor-pointer"
          >
            Abrir em Nova Aba
          </a>
        </div>
      )}

      {/* Printable Sheet */}
      <div className="max-w-4xl mx-auto border border-slate-200 shadow-lg p-8 sm:p-12 rounded-lg bg-white relative print:border-0 print:shadow-none print:p-0">
        
        {/* Top Header */}
        <div className="border-b-2 border-slate-800 pb-5 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight uppercase text-slate-900">
            {personalInfo.fullName}
          </h1>
          <p className="text-lg font-bold text-blue-600 mt-1">
            {personalInfo.title}
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            {personalInfo.subtitle}
          </p>
          
          {/* Quick Contacts */}
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 mt-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              {personalInfo.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              {personalInfo.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              {personalInfo.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              {personalInfo.linkedinUrl ? personalInfo.linkedinUrl.replace(/(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '') : 'linkedin.com'}
            </span>
          </div>
        </div>

        {/* Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6 print:block print:after:content-[''] print:after:table print:after:clear-both print:space-y-0">
          
          {/* Left Main Column: Objective & Experience */}
          <div className="md:col-span-8 space-y-6 print:w-[63%] print:float-left print:mr-[4%] print:space-y-5">
            
            {/* Objective */}
            <div className="print-break-inside-avoid">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5">
                Objetivo Profissional
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {personalInfo.bio}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
                Experiência Profissional
              </h2>
              
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="print-break-inside-avoid">
                    <div className="flex justify-between items-baseline gap-2.5">
                      <h3 className="text-xs font-bold text-slate-900 uppercase">
                        {exp.role}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-blue-600">
                      {exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span>
                    </div>
                    
                    <ul className="mt-1.5 space-y-1">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-[10px] text-slate-700 leading-normal flex gap-1.5">
                          <span className="text-blue-600">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Education */}
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
                Formação Acadêmica
              </h2>

              <div className="space-y-3.5">
                {educations.map((edu, idx) => (
                  <div key={idx} className="print-break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">
                        {edu.degree}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-600 mt-0.5">
                      {edu.institution} <span className="text-[10px] text-slate-400">({edu.status})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="print-break-inside-avoid">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
                Projetos em Destaque
              </h2>
              <div className="space-y-3.5">
                {projects.slice(0, 3).map((proj, idx) => (
                  <div key={idx} className="print-break-inside-avoid">
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                      {proj.description}
                    </p>
                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="text-[9px] font-mono text-slate-400 font-bold mt-0.5">
                        Tecnologias: {proj.techStack.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Skills, Certifications, Additional Info */}
          <div className="md:col-span-4 space-y-6 md:border-l md:border-slate-200 md:pl-6 print:w-[33%] print:float-right print:border-l print:border-slate-200 print:pl-6 print:space-y-5 print:border-t-0 print:pt-0 print:mt-0">
            
            {/* Certifications */}
            <div className="print-break-inside-avoid">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                Certificações
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="text-[11px]">
                    <strong className="text-slate-900 block font-bold leading-tight">{cert.name}</strong>
                    <span className="text-[10px] text-slate-500 block font-medium mt-0.5">{cert.institution} ({cert.year})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Technical Skills */}
            <div className="print-break-inside-avoid">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                Habilidades Chave
              </h2>
              
              <div className="space-y-1 text-[11px] text-slate-800">
                <div className="font-bold text-slate-900 text-[9.5px] uppercase tracking-wide">Suporte & Infraestrutura</div>
                <div className="mb-2 text-[9.5px] text-slate-600 leading-tight">
                  Suporte N1/N2, Service Desk, Active Directory, Windows, Atendimento, Gestão de Chamados, ITIL, Diagnóstico.
                </div>

                <div className="font-bold text-slate-900 text-[9.5px] uppercase tracking-wide mt-1.5">Redes & Telecom</div>
                <div className="mb-2 text-[9.5px] text-slate-600 leading-tight">
                  TCP/IP, DNS, DHCP, PPPoE, GPON, FTTH, OLT, ONU, Switches, Roteadores, Wi-Fi Corporativo, Ubiquiti UniFi, Cabeamento, Racks.
                </div>

                <div className="font-bold text-slate-900 text-[9.5px] uppercase tracking-wide mt-1.5">Desenvolvimento & Automação</div>
                <div className="mb-2 text-[9.5px] text-slate-600 leading-tight">
                  Python, HTML, CSS, JavaScript, APIs REST, JSON, Git, GitHub, Automação de Processos.
                </div>

                <div className="font-bold text-slate-900 text-[9.5px] uppercase tracking-wide mt-1.5">Inteligência Artificial</div>
                <div className="text-[9.5px] text-slate-600 leading-tight">
                  Desenvolvimento Assistido por IA, Engenharia de Prompt, Automação com IA, Prototipação, Revisão/Depuração de Código.
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="print-break-inside-avoid">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                Habilidades Pessoais
              </h2>
              <ul className="grid grid-cols-2 gap-1 text-[9.5px] font-medium text-slate-700">
                {skills.filter(s => s.category === 'soft').slice(0, 8).map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-1">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="print-break-inside-avoid">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                Dados Adicionais
              </h2>
              <div className="space-y-1.5 text-[9.5px] text-slate-600">
                <p>
                  <strong className="text-slate-900">CNH:</strong> {personalInfo.cnh}
                </p>
                <p>
                  <strong className="text-slate-900">Disponibilidade:</strong> Total / Imediata
                </p>
                {personalInfo.languages && personalInfo.languages.length > 0 && (
                  <p>
                    <strong className="text-slate-900">Idiomas:</strong> {personalInfo.languages.map(l => l.split(' – ')[0]).join(', ')}
                  </p>
                )}
                {personalInfo.tools && personalInfo.tools.length > 0 && (
                  <p>
                    <strong className="text-slate-900">Ferramentas:</strong> {personalInfo.tools.join(', ')}
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
