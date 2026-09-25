import React from 'react';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { PersonalInfo, Message } from '../types';

interface InteractiveContactProps {
  personalInfo: PersonalInfo;
  savedMessages?: Message[];
  setSavedMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

const getFormattedWhatsappUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('text=')) return url;
  const message = "Olá Samuel, peguei seu contato pelo seu portfólio e gostaria de conversar!";
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}text=${encodeURIComponent(message)}`;
};

export default function InteractiveContact({ personalInfo }: InteractiveContactProps) {
  const contactCards = [
    {
      title: 'WhatsApp',
      value: personalInfo.phone,
      link: getFormattedWhatsappUrl(personalInfo.whatsappUrl),
      icon: <Phone className="w-5 h-5 text-emerald-400" />,
      color: 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-emerald-950/30 hover:border-emerald-500/50 hover:scale-[1.02]',
      sub: 'Conversar agora'
    },
    {
      title: 'E-mail',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      icon: <Mail className="w-5 h-5 text-blue-400" />,
      color: 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-blue-950/30 hover:border-blue-500/50 hover:scale-[1.02]',
      sub: 'Enviar e-mail direto'
    },
    {
      title: 'LinkedIn',
      value: personalInfo.linkedinUrl ? personalInfo.linkedinUrl.replace(/(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '') : 'linkedin.com',
      link: personalInfo.linkedinUrl,
      icon: <Linkedin className="w-5 h-5 text-indigo-400" />,
      color: 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-indigo-950/30 hover:border-indigo-500/50 hover:scale-[1.02]',
      sub: 'Conectar no LinkedIn'
    },
    {
      title: 'Localização',
      value: personalInfo.location,
      link: '#',
      icon: <MapPin className="w-5 h-5 text-purple-400" />,
      color: 'bg-slate-950 border border-slate-800/60 text-slate-400 pointer-events-none',
      sub: 'Fortaleza, CE'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactCards.map((card, idx) => (
          <a
            key={idx}
            href={card.link}
            target={card.link !== '#' ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md group ${card.color}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-white/95 transition-colors duration-300">{card.title}</span>
              <div className="w-9 h-9 rounded-full bg-slate-950 border border-slate-800 group-hover:bg-white/20 flex items-center justify-center text-slate-300 group-hover:text-white transition-all duration-300">
                {card.icon}
              </div>
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base leading-tight break-all text-white transition-colors duration-300">{card.value}</p>
              <span className="text-[11px] text-slate-400 group-hover:text-white/90 mt-1 block font-semibold transition-colors duration-300">{card.sub}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
