import React, { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send, MessageSquare, Trash2, CheckCircle2 } from 'lucide-react';
import { PersonalInfo, Message } from '../types';

interface InteractiveContactProps {
  personalInfo: PersonalInfo;
  savedMessages: Message[];
  setSavedMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const getFormattedWhatsappUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('text=')) return url;
  const message = "Olá Samuel, peguei seu contato pelo seu portfólio e gostaria de conversar!";
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}text=${encodeURIComponent(message)}`;
};

export default function InteractiveContact({ personalInfo, savedMessages, setSavedMessages }: InteractiveContactProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: senderName,
      email: senderEmail,
      company: senderCompany || undefined,
      message: senderMessage,
      timestamp: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newMessage, ...savedMessages];
    setSavedMessages(updated);
    localStorage.setItem('samuel_portfolio_messages', JSON.stringify(updated));

    // Direct redirection to Gmail (samuca.victor135@gmail.com) via mailto:
    const mailtoSubject = encodeURIComponent(`[Contato Currículo] Proposta de ${senderName} - ${senderCompany || 'Recrutador'}`);
    const mailtoBody = encodeURIComponent(
      `Olá Samuel,\n\nVocê recebeu uma nova proposta através do seu Currículo Interativo:\n\n` +
      `• Nome: ${senderName}\n` +
      `• E-mail: ${senderEmail}\n` +
      `• Empresa: ${senderCompany || 'Não informada'}\n\n` +
      `• Mensagem:\n"${senderMessage}"\n\n` +
      `---\nEsta mensagem também foi salva no seu painel administrativo local.`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Clear form
    setSenderName('');
    setSenderEmail('');
    setSenderCompany('');
    setSenderMessage('');

    // Trigger success status
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleDeleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedMessages.filter(m => m.id !== id);
    setSavedMessages(updated);
    localStorage.setItem('samuel_portfolio_messages', JSON.stringify(updated));
  };

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

      {/* Quick Message / Proposal Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Enviar Mensagem ou Proposta Direta</h3>
            <p className="text-xs text-slate-400">Preencha os campos abaixo para enviar uma mensagem diretamente ao e-mail profissional de Samuel.</p>
          </div>
        </div>

        {isSuccess && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Mensagem registrada com sucesso! Seu cliente de e-mail foi aberto para envio imediato.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Seu Nome *</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Ex: Carlos Oliveira"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Seu E-mail *</label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="Ex: recrutador@empresa.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Empresa / Organização</label>
              <input
                type="text"
                value={senderCompany}
                onChange={(e) => setSenderCompany(e.target.value)}
                placeholder="Ex: Tech Corp"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Mensagem / Proposta *</label>
            <textarea
              required
              rows={4}
              value={senderMessage}
              onChange={(e) => setSenderMessage(e.target.value)}
              placeholder="Descreva a oportunidade de trabalho, detalhes da vaga ou deixe seu recado..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm flex items-center gap-2 transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Enviar Mensagem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
