import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Code,
  ArrowUp,
  MessageSquare,
  FileText,
  FolderGit2
} from 'lucide-react';

import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsGrid from './components/SkillsGrid';
import AcademicEducation from './components/AcademicEducation';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import InteractiveContact from './components/InteractiveContact';
import PrintResume from './components/PrintResume';
import AdminPanel from './components/AdminPanel';
import ProjectsSection from './components/ProjectsSection';

import { 
  personalInfo as defaultPersonalInfo,
  experiences as defaultExperiences,
  skills as defaultSkills,
  certifications as defaultCertifications,
  educations as defaultEducations,
  projects as defaultProjects
} from './data';

const getFormattedWhatsappUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('text=')) return url;
  const message = "Olá Samuel, peguei seu contato pelo seu portfólio e gostaria de conversar!";
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}text=${encodeURIComponent(message)}`;
};

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Core dynamic states initialized from localStorage with static fallbacks
  const [personalInfo, setPersonalInfo] = useState(() => {
    const stored = localStorage.getItem('personalInfo');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // If they have the old bio or missing languages/tools, or old linkedin, update it so they see the fresh content!
        const hasOldLinkedin = parsed.linkedinUrl && parsed.linkedinUrl.includes('samuel-nobre-40a220186');
        if (!parsed.languages || !parsed.tools || parsed.bio.includes('dedicado e motivado') || hasOldLinkedin) {
          const migrated = { 
            ...defaultPersonalInfo, 
            ...parsed, 
            bio: defaultPersonalInfo.bio, 
            languages: defaultPersonalInfo.languages, 
            tools: defaultPersonalInfo.tools, 
            english: defaultPersonalInfo.english,
            linkedinUrl: defaultPersonalInfo.linkedinUrl
          };
          localStorage.setItem('personalInfo', JSON.stringify(migrated));
          return migrated;
        }
        return { ...defaultPersonalInfo, ...parsed };
      } catch (e) {
        console.error('Error parsing personalInfo from localStorage:', e);
      }
    }
    return defaultPersonalInfo;
  });

  const [experiences, setExperiences] = useState(() => {
    const stored = localStorage.getItem('experiences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing experiences from localStorage:', e);
      }
    }
    return defaultExperiences;
  });

  const [skills, setSkills] = useState(() => {
    const stored = localStorage.getItem('skills');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const hasOldCategory = parsed.some((s: any) => s.category === 'sistemas');
        const hasIACategory = parsed.some((s: any) => s.category === 'ia');
        // Reset/migrate if old category exists or IA category is missing
        if (hasOldCategory || !hasIACategory) {
          localStorage.setItem('skills', JSON.stringify(defaultSkills));
          return defaultSkills;
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing skills from localStorage:', e);
      }
    }
    return defaultSkills;
  });

  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem('projects');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing projects from localStorage:', e);
      }
    }
    return defaultProjects;
  });

  const [educations, setEducations] = useState(() => {
    const stored = localStorage.getItem('educations');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing educations from localStorage:', e);
      }
    }
    return defaultEducations;
  });

  const [certifications, setCertifications] = useState(() => {
    const stored = localStorage.getItem('certifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const hasOldYear = parsed.some((c: any) => 
          (c.name.includes('FTTH') && c.year !== '2025') || 
          (c.name.includes('ITIL') && c.year !== '2025')
        );
        if (hasOldYear) {
          localStorage.setItem('certifications', JSON.stringify(defaultCertifications));
          return defaultCertifications;
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing certifications from localStorage:', e);
      }
    }
    return defaultCertifications;
  });

  const [savedMessages, setSavedMessages] = useState(() => {
    const stored = localStorage.getItem('samuel_portfolio_messages');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing saved messages:', e);
      }
    }
    return [];
  });

  // Monitor window scroll to show/hide "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Simple active section highlights based on scroll position
      const sections = ['inicio', 'sobre', 'experiencia', 'habilidades', 'projetos', 'certificacoes', 'formacao', 'contato'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDownloadPdf = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  if (isAdminMode) {
    return (
      <AdminPanel 
        personalInfo={personalInfo}
        setPersonalInfo={setPersonalInfo}
        experiences={experiences}
        setExperiences={setExperiences}
        skills={skills}
        setSkills={setSkills}
        educations={educations}
        setEducations={setEducations}
        certifications={certifications}
        setCertifications={setCertifications}
        savedMessages={savedMessages}
        setSavedMessages={setSavedMessages}
        onClose={() => setIsAdminMode(false)}
      />
    );
  }

  if (isPrintMode) {
    return (
      <PrintResume 
        onBackClick={() => setIsPrintMode(false)} 
        personalInfo={personalInfo}
        experiences={experiences}
        skills={skills}
        certifications={certifications}
        educations={educations}
        projects={projects}
      />
    );
  }

  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen font-sans selection:bg-blue-600/30 selection:text-white">
      
      {/* Background Decorative Subtle Polished Elements */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Header and Nav */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isPrintMode={isPrintMode}
        setIsPrintMode={setIsPrintMode}
        onAdminClick={() => setIsAdminMode(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        
        {/* Hero & Profile Section */}
        <section id="inicio" className="pt-24 pb-12 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ProfileCard personalInfo={personalInfo} onDownloadClick={handleDownloadPdf} />
        </section>

        {/* Executive Summary */}
        <section id="sobre" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Resumo Executivo
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base text-justify">
              Profissional de TI dedicado e motivado com mais de {personalInfo.experienceYears} anos de sólida bagagem em suporte técnico e infraestrutura de redes no setor de telecomunicações, incluindo sólida experiência corporativa N1/N2 na LINKCE TELECOM. Com especialização em configuração e manutenção de equipamentos de rede, diagnóstico de ativos críticos e cabeamento estruturado Cat5e/Cat6. Cursando atualmente Bacharelado/Tecnólogo em Cibersegurança, tem como foco a mitigação proativa de incidentes, segurança da informação e a excelência operacional em ambientes corporativos de alta demanda.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experiencia" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-blue-400" />
              Experiência Profissional
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Uma trajetória sólida focada na excelência em atendimento, infraestrutura de redes e suporte de alto nível.
            </p>
          </div>
          
          <ExperienceTimeline experiences={experiences} />
        </section>

        {/* Skills Section */}
        <section id="habilidades" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Code className="w-6 h-6 text-blue-400" />
              Habilidades & Competências
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Capacidades técnicas e comportamentais desenvolvidas sob altos padrões operacionais e de governança.
            </p>
          </div>

          <SkillsGrid skills={skills} />
        </section>

        {/* Projects Section */}
        <section id="projetos" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <FolderGit2 className="w-6 h-6 text-blue-400" />
              Projetos em Destaque
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Soluções reais desenvolvidas para otimizar fluxos operacionais, monitorar redes e automatizar rotinas de TI.
            </p>
          </div>

          <ProjectsSection projects={projects} />
        </section>

        {/* Education & Certifications */}
        <section id="certificacoes" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Award className="w-6 h-6 text-blue-400" />
              Educação & Qualificações
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Compromisso contínuo com o aprendizado, especialização em cibersegurança e redes sem fio de nível enterprise.
            </p>
          </div>

          <div id="formacao">
            <AcademicEducation 
              educations={educations} 
              certifications={certifications} 
              languages={personalInfo.languages}
              tools={personalInfo.tools}
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Phone className="w-6 h-6 text-blue-400" />
              Canais de Contato
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Estou à disposição para entrevistas presenciais em Fortaleza e região metropolitana, ou conversas remotas.
            </p>
          </div>

          <InteractiveContact 
            personalInfo={personalInfo} 
            savedMessages={savedMessages} 
            setSavedMessages={setSavedMessages} 
          />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-slate-400 relative z-10 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {personalInfo.fullName} • IT Consultant Fortaleza</p>
          <div className="flex items-center gap-3.5">
            <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-400 transition-colors">E-mail</a>
            <span>•</span>
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <span>•</span>
            <a href={getFormattedWhatsappUrl(personalInfo.whatsappUrl)} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">WhatsApp</a>
            <span>•</span>
            <button 
              onClick={() => setIsAdminMode(true)}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
            >
              Acesso Restrito
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-40 no-print">
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Quick-Connect */}
        <a
          href={getFormattedWhatsappUrl(personalInfo.whatsappUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 animate-bounce"
          title="Falar pelo WhatsApp"
        >
          <Phone className="w-6 h-6 fill-white" />
        </a>
      </div>

    </div>
  );
}
