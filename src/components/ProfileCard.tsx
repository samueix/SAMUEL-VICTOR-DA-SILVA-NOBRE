import React, { useState } from 'react';
import { Mail, Phone, MapPin, Briefcase, Calendar, ShieldCheck, Download, Award, Bike } from 'lucide-react';
import { PersonalInfo } from '../types';

interface ProfileCardProps {
  personalInfo: PersonalInfo;
  onDownloadClick?: () => void;
}

const getFormattedWhatsappUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('text=')) return url;
  const message = "Olá Samuel, peguei seu contato pelo seu portfólio e gostaria de conversar!";
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}text=${encodeURIComponent(message)}`;
};

export default function ProfileCard({ personalInfo, onDownloadClick }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback beautiful SVG profile if image fails or is absent
  const renderFallbackAvatar = () => (
    <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center relative group overflow-hidden">
      {/* Glow effect matching user photo */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-cyan-500/5 to-transparent animate-pulse" />
      <div className="w-24 h-24 rounded-full bg-slate-700/80 border-2 border-emerald-500/50 flex items-center justify-center text-white text-3xl font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform duration-300 relative z-10">
        SV
      </div>
      <div className="mt-4 text-xs font-mono text-emerald-400 font-semibold tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 relative z-10 uppercase flex items-center gap-1 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        Especialista de TI
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
      {/* Accent gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-500" />

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start relative z-10">
        
        {/* Profile Image / Fallback Container */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl flex-shrink-0 relative bg-slate-950">
          {!imageError ? (
            <img 
              src={personalInfo.imageUrl || "/IMG/SAMUEL.png"} 
              alt={personalInfo.fullName}
              className="w-full h-full object-cover object-center bg-slate-950 mix-blend-normal"
              onError={() => setImageError(true)}
            />
          ) : (
            renderFallbackAvatar()
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 animate-pulse">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Disponível para Contratação
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {personalInfo.fullName}
          </h1>
          
          <p className="text-lg sm:text-xl font-bold text-blue-400 mt-2">
            {personalInfo.title}
          </p>
          
          <p className="text-sm text-slate-400 mt-1 font-semibold uppercase tracking-wide">
            {personalInfo.subtitle}
          </p>

          <p className="text-slate-300 mt-4 leading-relaxed max-w-2xl text-sm sm:text-base">
            {personalInfo.bio}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 text-left">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <span className="block text-xs text-slate-500">Localização</span>
                <span className="font-semibold text-slate-200">{personalInfo.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                <Bike className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="block text-xs text-slate-500">Mobilidade & CNH</span>
                <span className="font-semibold text-slate-200">{personalInfo.cnh}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                <Briefcase className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="block text-xs text-slate-500">Experiência</span>
                <span className="font-semibold text-slate-200">{personalInfo.experienceYears}+ Anos na Área</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <span className="block text-xs text-slate-500">Disponibilidade</span>
                <span className="font-semibold text-slate-200 text-xs sm:text-sm">Imediata (Total)</span>
              </div>
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 mt-8 no-print">
            <a 
              href={getFormattedWhatsappUrl(personalInfo.whatsappUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-500/20 active:scale-95 text-sm cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              Chamar no WhatsApp
            </a>

            <button 
              onClick={onDownloadClick}
              className="px-6 py-3 bg-blue-650 hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-650/15 active:scale-95 text-sm cursor-pointer border border-transparent"
            >
              <Download className="w-4 h-4" />
              Baixar Currículo PDF
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
