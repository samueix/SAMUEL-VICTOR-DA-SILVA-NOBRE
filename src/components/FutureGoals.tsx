import React, { useState } from 'react';
import { 
  Globe, 
  Cloud, 
  ShieldCheck, 
  Code2, 
  GraduationCap, 
  Rocket, 
  Sparkles, 
  Clock, 
  Compass,
  TrendingUp
} from 'lucide-react';

interface GoalItem {
  id: string;
  category: 'skills' | 'tech' | 'career';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  horizon: string;
  statusLabel: string;
  statusColor: {
    badge: string;
    border: string;
    iconColor: string;
    iconBg: string;
    accentGlow: string;
  };
  paragraphs: string[];
  pillars: string[];
  metricLabel?: string;
}

export default function FutureGoals() {
  const [filter, setFilter] = useState<'all' | 'tech' | 'career'>('all');

  const goals: GoalItem[] = [
    {
      id: 'ingles',
      category: 'skills',
      icon: Globe,
      title: 'Inglês — Nível Intermediário/Avançado',
      horizon: 'Meta em Andamento',
      statusLabel: 'Rotina Ativa de Estudos',
      statusColor: {
        badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        border: 'border-slate-800 hover:border-sky-500/40',
        iconColor: 'text-sky-400',
        iconBg: 'bg-sky-950/60 border-sky-800/60',
        accentGlow: 'from-sky-500/10 to-transparent'
      },
      paragraphs: [
        'Iniciar e manter uma rotina consistente de estudos de inglês com o objetivo de alcançar o nível intermediário, principalmente para conseguir consumir documentações técnicas sem barreiras, acompanhar cursos e conteúdos internacionais e me comunicar com naturalidade dentro do ecossistema de tecnologia.'
      ],
      pillars: [
        'Consumo de documentações técnicas oficiais',
        'Treinamentos e conteúdos internacionais',
        'Comunicação técnica e ampliação de vocabulário'
      ],
      metricLabel: 'Prática diária de leitura técnica'
    },
    {
      id: 'cloud',
      category: 'tech',
      icon: Cloud,
      title: 'Cloud Computing',
      horizon: 'Próximo Horizonte',
      statusLabel: 'Prática & Certificações',
      statusColor: {
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        border: 'border-slate-800 hover:border-blue-500/40',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-950/60 border-blue-800/60',
        accentGlow: 'from-blue-500/10 to-transparent'
      },
      paragraphs: [
        'Aprofundar meus conhecimentos em computação em nuvem e adquirir experiência prática com serviços, ferramentas e arquiteturas cloud, buscando futuramente certificações na área.'
      ],
      pillars: [
        'Arquiteturas modernas de nuvem',
        'Serviços e ferramentas cloud computing',
        'Preparação para certificações da área'
      ],
      metricLabel: 'Laboratórios práticos & Arquitetura'
    },
    {
      id: 'seguranca',
      category: 'tech',
      icon: ShieldCheck,
      title: 'Segurança da Informação',
      horizon: 'Foco Contínuo',
      statusLabel: 'Especialização em Defesa',
      statusColor: {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        border: 'border-slate-800 hover:border-emerald-500/40',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-950/60 border-emerald-800/60',
        accentGlow: 'from-emerald-500/10 to-transparent'
      },
      paragraphs: [
        'Continuar evoluindo na área de Segurança da Informação, aprofundando conhecimentos em defesa cibernética, segurança de ambientes, análise de vulnerabilidades, monitoramento e boas práticas de proteção.'
      ],
      pillars: [
        'Defesa cibernética e mitigação de ameaças',
        'Hardening e proteção de ambientes de rede',
        'Análise de vulnerabilidades e monitoramento ativo'
      ],
      metricLabel: 'Alinhado à graduação em Cibersegurança'
    },
    {
      id: 'programacao-ia',
      category: 'tech',
      icon: Code2,
      title: 'Programação, IA & Automação',
      horizon: 'Desenvolvimento Ativo',
      statusLabel: 'Vibe Coding & Soluções Reais',
      statusColor: {
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        border: 'border-slate-800 hover:border-purple-500/40',
        iconColor: 'text-purple-400',
        iconBg: 'bg-purple-950/60 border-purple-800/60',
        accentGlow: 'from-purple-500/10 to-transparent'
      },
      paragraphs: [
        'Aprofundar meus conhecimentos em programação e desenvolvimento de software, explorando diferentes linguagens, tecnologias e arquiteturas.',
        'Utilizar Inteligência Artificial como ferramenta de apoio ao desenvolvimento e combinar programação, IA e automação para criar aplicações, ferramentas e soluções cada vez mais completas para problemas reais.',
        'O objetivo não é apenas aprender uma linguagem específica, mas desenvolver uma base cada vez mais sólida em programação e tecnologia.'
      ],
      pillars: [
        'IA como acelerador de produtividade (Vibe Coding)',
        'Automações e integrações de ferramentas reais',
        'Fundamentos sólidos de algoritmos e software'
      ],
      metricLabel: 'Criação de projetos práticos e utilitários'
    },
    {
      id: 'graduacao-pos',
      category: 'career',
      icon: GraduationCap,
      title: 'Concluir a Graduação + Pós-graduação',
      horizon: 'Ciclo Acadêmico',
      statusLabel: 'Formação & Especialização',
      statusColor: {
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        border: 'border-slate-800 hover:border-amber-500/40',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-950/60 border-amber-800/60',
        accentGlow: 'from-amber-500/10 to-transparent'
      },
      paragraphs: [
        'Concluir minha graduação em Cibersegurança e, posteriormente, iniciar uma pós-graduação para aprofundar ainda mais meus conhecimentos e construir uma especialização mais sólida dentro da área de tecnologia.'
      ],
      pillars: [
        'Conclusão da graduação em Cibersegurança',
        'Ingresso em programa de pós-graduação',
        'Construção de especialização de alto valor'
      ],
      metricLabel: 'Consolidação acadêmica e prática'
    },
    {
      id: 'evolucao-carreira',
      category: 'career',
      icon: Rocket,
      title: 'Evolução de Carreira',
      horizon: 'Visão de Longo Prazo',
      statusLabel: 'Desafios & Liderança Técnica',
      statusColor: {
        badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        border: 'border-slate-800 hover:border-indigo-500/40',
        iconColor: 'text-indigo-400',
        iconBg: 'bg-indigo-950/60 border-indigo-800/60',
        accentGlow: 'from-indigo-500/10 to-transparent'
      },
      paragraphs: [
        'Continuar evoluindo profissionalmente, assumindo desafios cada vez maiores e buscando oportunidades que me permitam aplicar meus conhecimentos em tecnologia, infraestrutura, segurança, cloud, programação, automação e inteligência artificial.',
        'Buscar constantemente novas experiências, responsabilidades e oportunidades de crescimento.'
      ],
      pillars: [
        'Desafios com impacto direto na operação',
        'Aplicação integrada de infra, segurança e automação',
        'Assunção de novas responsabilidades e expansão'
      ],
      metricLabel: 'Compromisso com impacto e consistência'
    }
  ];

  const filteredGoals = filter === 'all' 
    ? goals 
    : goals.filter(g => (filter === 'tech' ? g.category === 'tech' : g.category === 'career' || g.category === 'skills'));

  return (
    <div className="space-y-8">
      {/* Notice / Philosophy Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Roadmap Pessoal de Evolução
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed max-w-3xl">
                Este espaço reflete minha visão de futuro e os conhecimentos que estou construindo ativamente ao longo da minha jornada profissional. Não se trata de uma lista de qualificações já dominadas, mas sim dos passos deliberados que guiam minha evolução contínua em tecnologia.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              6 Metas Estratégicas
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="no-print flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-500'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80 shadow-sm'
          }`}
        >
          Todos os Objetivos (6)
        </button>
        <button
          onClick={() => setFilter('tech')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            filter === 'tech'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-500'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80 shadow-sm'
          }`}
        >
          Trilha Técnica (Cloud, Segurança, Programação & IA)
        </button>
        <button
          onClick={() => setFilter('career')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            filter === 'career'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-500'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80 shadow-sm'
          }`}
        >
          Formação, Idioma & Carreira
        </button>
      </div>

      {/* Roadmap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map((goal, index) => {
          const IconComponent = goal.icon;

          return (
            <div
              key={goal.id}
              className={`bg-slate-900/90 border ${goal.statusColor.border} rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden`}
            >
              {/* Subtle top corner gradient */}
              <div 
                className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${goal.statusColor.accentGlow} blur-2xl pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-500`}
              />

              <div>
                {/* Header of Card: Icon + Status Pill */}
                <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${goal.statusColor.iconBg} border flex items-center justify-center ${goal.statusColor.iconColor} shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${goal.statusColor.badge} whitespace-nowrap shadow-xs`}>
                      {goal.statusLabel}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                      {goal.horizon}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                  {goal.title}
                </h3>

                {/* Paragraphs */}
                <div className="space-y-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {goal.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-300/90">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Section: Key Pillars / Focus Points */}
              <div className="border-t border-slate-800/80 pt-4 mt-2 relative z-10 space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Pilares de Foco & Ação:
                </span>
                
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {goal.pillars.map((pillar, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{pillar}</span>
                    </li>
                  ))}
                </ul>

                {goal.metricLabel && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-950/70 border border-slate-800/90 px-2.5 py-1 rounded-md w-full">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{goal.metricLabel}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Concluding Philosophy Quote Box */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-blue-500/30 rounded-2xl p-8 sm:p-10 shadow-xl text-center">
        {/* Glow accents */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>

          <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 tracking-tight leading-snug">
            “O objetivo não é saber tudo. É continuar evoluindo.”
          </blockquote>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            A tecnologia se transforma todos os dias. Ter clareza dos próximos passos, curiosidade técnica e dedicação diária é a forma mais sólida de construir resultados duradouros e relevância profissional.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-8 h-[1px] bg-slate-800" />
            <span>Samuel Victor • Visão de Futuro</span>
            <span className="w-8 h-[1px] bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
