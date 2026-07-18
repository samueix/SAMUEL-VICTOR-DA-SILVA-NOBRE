import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Save, 
  Plus, 
  Trash2, 
  Edit2, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Award, 
  User, 
  MessageSquare, 
  ArrowLeft,
  Settings,
  Eye,
  Info,
  Sparkles,
  FileText
} from 'lucide-react';
import { PersonalInfo, Experience, Skill, Certification, Education, Message } from '../types';
import CoverLetterGenerator from './CoverLetterGenerator';

interface AdminPanelProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
  certifications: Certification[];
  setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
  savedMessages: Message[];
  setSavedMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onClose: () => void;
}

export default function AdminPanel({
  personalInfo,
  setPersonalInfo,
  experiences,
  setExperiences,
  skills,
  setSkills,
  educations,
  setEducations,
  certifications,
  setCertifications,
  savedMessages,
  setSavedMessages,
  onClose
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'dados' | 'experiencias' | 'habilidades' | 'educacao' | 'certificacoes' | 'cartas'>('dados');
  
  // States for sub-form editors
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);

  // New item placeholders
  const [newDescBullet, setNewDescBullet] = useState('');
  const [newSkillTag, setNewSkillTag] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '075561@Sam') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleSavePersonalInfo = (field: keyof PersonalInfo, value: any) => {
    const updated = { ...personalInfo, [field]: value };
    setPersonalInfo(updated);
    localStorage.setItem('personalInfo', JSON.stringify(updated));
  };

  // EXPERIENCE OPERATIONS
  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    let updatedList;
    if (experiences.some(exp => exp.id === editingExp.id)) {
      updatedList = experiences.map(exp => exp.id === editingExp.id ? editingExp : exp);
    } else {
      updatedList = [...experiences, editingExp];
    }
    setExperiences(updatedList);
    localStorage.setItem('experiences', JSON.stringify(updatedList));
    setEditingExp(null);
  };

  const handleDeleteExperience = (id: string) => {
    if (window.confirm('Deseja realmente excluir esta experiência?')) {
      const updatedList = experiences.filter(exp => exp.id !== id);
      setExperiences(updatedList);
      localStorage.setItem('experiences', JSON.stringify(updatedList));
    }
  };

  const startNewExperience = () => {
    setEditingExp({
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      period: '',
      location: '',
      description: [],
      skills: []
    });
  };

  // SKILL OPERATIONS
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    let updatedList = [...skills];
    if (editingSkillIndex !== null) {
      updatedList[editingSkillIndex] = editingSkill;
    } else {
      updatedList.push(editingSkill);
    }
    setSkills(updatedList);
    localStorage.setItem('skills', JSON.stringify(updatedList));
    setEditingSkill(null);
    setEditingSkillIndex(null);
  };

  const handleDeleteSkill = (index: number) => {
    if (window.confirm('Deseja realmente excluir esta habilidade?')) {
      const updatedList = skills.filter((_, idx) => idx !== index);
      setSkills(updatedList);
      localStorage.setItem('skills', JSON.stringify(updatedList));
    }
  };

  const startNewSkill = () => {
    setEditingSkill({
      name: '',
      level: 80,
      category: 'suporte'
    });
    setEditingSkillIndex(null);
  };

  // EDUCATION OPERATIONS
  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;

    let updatedList = [...educations];
    if (editingEduIndex !== null) {
      updatedList[editingEduIndex] = editingEdu;
    } else {
      updatedList.push(editingEdu);
    }
    setEducations(updatedList);
    localStorage.setItem('educations', JSON.stringify(updatedList));
    setEditingEdu(null);
    setEditingEduIndex(null);
  };

  const handleDeleteEducation = (index: number) => {
    if (window.confirm('Deseja realmente excluir esta formação?')) {
      const updatedList = educations.filter((_, idx) => idx !== index);
      setEducations(updatedList);
      localStorage.setItem('educations', JSON.stringify(updatedList));
    }
  };

  const startNewEducation = () => {
    setEditingEdu({
      degree: '',
      institution: '',
      period: '',
      status: 'Em andamento',
      description: '',
      bullets: []
    });
    setEditingEduIndex(null);
  };

  // CERTIFICATION OPERATIONS
  const handleSaveCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    let updatedList = [...certifications];
    if (editingCertIndex !== null) {
      updatedList[editingCertIndex] = editingCert;
    } else {
      updatedList.push(editingCert);
    }
    setCertifications(updatedList);
    localStorage.setItem('certifications', JSON.stringify(updatedList));
    setEditingCert(null);
    setEditingCertIndex(null);
  };

  const handleDeleteCertification = (index: number) => {
    if (window.confirm('Deseja realmente excluir esta certificação?')) {
      const updatedList = certifications.filter((_, idx) => idx !== index);
      setCertifications(updatedList);
      localStorage.setItem('certifications', JSON.stringify(updatedList));
    }
  };

  const startNewCertification = () => {
    setEditingCert({
      name: '',
      institution: '',
      year: '',
      description: '',
      bullets: []
    });
    setEditingCertIndex(null);
  };

  // MESSAGE OPERATIONS
  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Deseja realmente excluir esta mensagem permanentemente?')) {
      const updatedList = savedMessages.filter(msg => msg.id !== id);
      setSavedMessages(updatedList);
      localStorage.setItem('samuel_portfolio_messages', JSON.stringify(updatedList));
    }
  };

  // Screen 1: Unauthenticated Password Check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 admin-dark-theme">
        <style>{`
          .admin-dark-theme {
            background-color: #0B0F19 !important;
            color: #cbd5e1 !important;
          }
          .admin-dark-theme .bg-slate-50,
          .admin-dark-theme .bg-white {
            background-color: #0f172a !important; /* bg-slate-900 */
            border-color: #1e293b !important; /* border-slate-800 */
            color: #cbd5e1 !important;
          }
          .admin-dark-theme .text-slate-900,
          .admin-dark-theme .text-slate-800,
          .admin-dark-theme .text-slate-700 {
            color: #f8fafc !important; /* text-slate-50 */
          }
          .admin-dark-theme .text-slate-650 {
            color: #94a3b8 !important;
          }
          .admin-dark-theme .text-slate-500,
          .admin-dark-theme .text-slate-400 {
            color: #94a3b8 !important; /* text-slate-400 */
          }
          .admin-dark-theme input,
          .admin-dark-theme textarea,
          .admin-dark-theme select {
            background-color: #020617 !important; /* bg-slate-950 */
            border-color: #1e293b !important;
            color: #ffffff !important;
          }
          .admin-dark-theme input:focus,
          .admin-dark-theme textarea:focus,
          .admin-dark-theme select:focus {
            border-color: #3b82f6 !important;
          }
          .admin-dark-theme .hover\:bg-slate-100:hover,
          .admin-dark-theme .hover\:bg-slate-50:hover {
            background-color: #1e293b !important;
          }
          .admin-dark-theme .border-slate-100,
          .admin-dark-theme .border-slate-200 {
            border-color: #1e293b !important;
          }
        `}</style>
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/15 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">Acesso Restrito</h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Insira a chave de acesso do painel de administração para poder editar as informações do currículo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Senha de Administrador</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 font-bold">
                ⚠️ Senha inválida.
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-600/15 transition-colors cursor-pointer"
              >
                Acessar Painel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Screen 2: Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans pb-24 admin-dark-theme">
      <style>{`
        .admin-dark-theme {
          background-color: #0B0F19 !important;
          color: #cbd5e1 !important;
        }
        .admin-dark-theme .bg-slate-50,
        .admin-dark-theme .bg-white {
          background-color: #0f172a !important; /* bg-slate-900 */
          border-color: #1e293b !important; /* border-slate-800 */
          color: #cbd5e1 !important;
        }
        .admin-dark-theme .text-slate-900,
        .admin-dark-theme .text-slate-800,
        .admin-dark-theme .text-slate-700 {
          color: #f8fafc !important; /* text-slate-50 */
        }
        .admin-dark-theme .text-slate-650 {
          color: #94a3b8 !important;
        }
        .admin-dark-theme .text-slate-500,
        .admin-dark-theme .text-slate-400 {
          color: #94a3b8 !important; /* text-slate-400 */
        }
        .admin-dark-theme input,
        .admin-dark-theme textarea,
        .admin-dark-theme select {
          background-color: #020617 !important; /* bg-slate-950 */
          border-color: #1e293b !important;
          color: #ffffff !important;
        }
        .admin-dark-theme input:focus,
        .admin-dark-theme textarea:focus,
        .admin-dark-theme select:focus {
          border-color: #3b82f6 !important;
        }
        .admin-dark-theme .hover\:bg-slate-100:hover,
        .admin-dark-theme .hover\:bg-slate-50:hover {
          background-color: #1e293b !important;
        }
        .admin-dark-theme .border-slate-100,
        .admin-dark-theme .border-slate-200 {
          border-color: #1e293b !important;
        }
      `}</style>
      {/* Admin Subheader Top-bar */}
      <div className="bg-slate-900 text-white py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white animate-spin" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Modo Administrador Ativo</span>
              <span className="text-sm font-black text-white block">Painel de Controle do Portfólio</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <Eye className="w-3.5 h-3.5" />
            Visualizar Currículo Final
          </button>
        </div>
      </div>

      {/* Main Admin Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Statistics & Overview Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">Experiências</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center gap-1.5">
              <Briefcase className="w-5 h-5 text-blue-500" />
              {experiences.length}
            </span>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">Habilidades</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center gap-1.5">
              <Code className="w-5 h-5 text-purple-500" />
              {skills.length}
            </span>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">Certificações</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center gap-1.5">
              <Award className="w-5 h-5 text-amber-500" />
              {certifications.length}
            </span>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">Anos de Experiência</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-blue-400" />
              {personalInfo.experienceYears} Anos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Tab Sidebar */}
          <div className="lg:col-span-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 block border-b border-slate-100 mb-2">Módulos de Edição</span>
            
            <button
              onClick={() => { setActiveTab('dados'); setEditingExp(null); setEditingSkill(null); setEditingEdu(null); setEditingCert(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'dados' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/10' 
                  : 'text-slate-650 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" />
              Dados Gerais (Perfil)
            </button>

            <button
              onClick={() => { setActiveTab('experiencias'); setEditingExp(null); setEditingSkill(null); setEditingEdu(null); setEditingCert(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'experiencias' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/10' 
                  : 'text-slate-650 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Experiências ({experiences.length})
            </button>

            <button
              onClick={() => { setActiveTab('habilidades'); setEditingExp(null); setEditingSkill(null); setEditingEdu(null); setEditingCert(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'habilidades' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/10' 
                  : 'text-slate-650 hover:bg-slate-100'
              }`}
            >
              <Code className="w-4 h-4" />
              Habilidades ({skills.length})
            </button>

            <button
              onClick={() => { setActiveTab('educacao'); setEditingExp(null); setEditingSkill(null); setEditingEdu(null); setEditingCert(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'educacao' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/10' 
                  : 'text-slate-650 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Formação Acadêmica ({educations.length})
            </button>

            <button
              onClick={() => { setActiveTab('certificacoes'); setEditingExp(null); setEditingSkill(null); setEditingEdu(null); setEditingCert(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'certificacoes' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/10' 
                  : 'text-slate-650 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              Certificações ({certifications.length})
            </button>

            <button
              onClick={() => { setActiveTab('cartas'); setEditingExp(null); setEditingSkill(null); setEditingEdu(null); setEditingCert(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'cartas' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/10' 
                  : 'text-slate-650 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Gerador de Cartas
            </button>
          </div>

          {/* Editor Area */}
          <div className="lg:col-span-9 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm">
            
            {/* TAB 1: DADOS GERAIS */}
            {activeTab === 'dados' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Dados Gerais do Perfil
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Edite as informações pessoais e de cabeçalho que aparecem no currículo e no gerador de cartas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Nome Completo</label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) => handleSavePersonalInfo('fullName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Nome Curto (Exibição)</label>
                    <input
                      type="text"
                      value={personalInfo.shortName}
                      onChange={(e) => handleSavePersonalInfo('shortName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Cargo / Título Profissional</label>
                    <input
                      type="text"
                      value={personalInfo.title}
                      onChange={(e) => handleSavePersonalInfo('title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Especialidades (Legenda)</label>
                    <input
                      type="text"
                      value={personalInfo.subtitle}
                      onChange={(e) => handleSavePersonalInfo('subtitle', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">E-mail</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handleSavePersonalInfo('email', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Telefone</label>
                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(e) => handleSavePersonalInfo('phone', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">URL do WhatsApp</label>
                    <input
                      type="text"
                      value={personalInfo.whatsappUrl}
                      onChange={(e) => handleSavePersonalInfo('whatsappUrl', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">LinkedIn URL</label>
                    <input
                      type="text"
                      value={personalInfo.linkedinUrl}
                      onChange={(e) => handleSavePersonalInfo('linkedinUrl', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">GitHub URL</label>
                    <input
                      type="text"
                      value={personalInfo.githubUrl}
                      onChange={(e) => handleSavePersonalInfo('githubUrl', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Localização (Cidade/Estado)</label>
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) => handleSavePersonalInfo('location', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">CNH & Veículo</label>
                    <input
                      type="text"
                      value={personalInfo.cnh}
                      onChange={(e) => handleSavePersonalInfo('cnh', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Inglês</label>
                    <input
                      type="text"
                      value={personalInfo.english}
                      onChange={(e) => handleSavePersonalInfo('english', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Anos de Experiência (Número)</label>
                    <input
                      type="number"
                      value={personalInfo.experienceYears}
                      onChange={(e) => handleSavePersonalInfo('experienceYears', parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    URL da Foto de Perfil (Opcional)
                  </label>
                  <input
                    type="text"
                    value={personalInfo.imageUrl || ''}
                    onChange={(e) => handleSavePersonalInfo('imageUrl', e.target.value)}
                    placeholder="Deixe vazio para usar a foto padrão /IMG/SAMUEL.png ou o fallback interativo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-450 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1 leading-relaxed">
                    💡 Você pode colar um link de imagem do LinkedIn, Imgur ou qualquer servidor web. Se vazio, o currículo tentará carregar <code className="bg-slate-100 px-1 py-0.5 rounded">/IMG/SAMUEL.png</code>.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Disponibilidade de Trabalho</label>
                  <input
                    type="text"
                    value={personalInfo.availability}
                    onChange={(e) => handleSavePersonalInfo('availability', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Biografia Resumida</label>
                  <textarea
                    rows={4}
                    value={personalInfo.bio}
                    onChange={(e) => handleSavePersonalInfo('bio', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-150 p-4 rounded-xl flex items-start gap-3 text-xs text-blue-800 leading-relaxed">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Persistência no Navegador:</strong> Qualquer alteração feita acima é instantaneamente salva no <code className="bg-blue-100 px-1 rounded font-mono text-[11px] font-bold">localStorage</code> do seu navegador. Isso garante que ao enviar o link deste currículo, suas edições personalizadas estarão totalmente ativas e renderizadas!
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EXPERIÊNCIAS */}
            {activeTab === 'experiencias' && (
              <div className="space-y-6">
                {!editingExp ? (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-150">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                          Experiências Profissionais
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Gerencie a linha do tempo de sua carreira técnica.
                        </p>
                      </div>
                      <button
                        onClick={startNewExperience}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Nova Experiência
                      </button>
                    </div>

                    <div className="space-y-3">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-slate-350 transition-colors">
                          <div>
                            <span className="font-extrabold text-slate-900 text-sm block">{exp.role}</span>
                            <span className="text-xs text-slate-550 block font-medium uppercase mt-0.5">{exp.company} • {exp.period}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingExp(exp)}
                              className="p-2 text-slate-550 hover:text-blue-650 rounded-lg hover:bg-slate-100 transition-colors"
                              title="Editar experiência"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="p-2 text-slate-400 hover:text-red-650 rounded-lg hover:bg-slate-100 transition-colors"
                              title="Deletar experiência"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSaveExperience} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <h4 className="text-sm font-black text-slate-900 uppercase">
                        {experiences.some(e => e.id === editingExp.id) ? 'Editar Experiência' : 'Nova Experiência'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingExp(null)}
                        className="text-xs text-slate-500 font-bold hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Cargo *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.role}
                          onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Empresa *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.company}
                          onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Período (Ex: Jan 2022 - Presente) *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.period}
                          onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Cidade / Estado (Ex: Fortaleza, CE) *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.location}
                          onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Descrições (Bullets) */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">Atividades Realizadas (Bullet Points)</label>
                      <div className="space-y-2">
                        {editingExp.description.map((bullet, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <span className="text-xs text-slate-600 flex-1">{bullet}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newDesc = editingExp.description.filter((_, i) => i !== idx);
                                setEditingExp({ ...editingExp, description: newDesc });
                              }}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Adicionar nova atividade..."
                          value={newDescBullet}
                          onChange={(e) => setNewDescBullet(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newDescBullet.trim()) return;
                            setEditingExp({
                              ...editingExp,
                              description: [...editingExp.description, newDescBullet.trim()]
                            });
                            setNewDescBullet('');
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex-shrink-0"
                        >
                          Inserir
                        </button>
                      </div>
                    </div>

                    {/* Tags de Tecnologia / Habilidades */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">Tags de Competências Associadas</label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {editingExp.skills.map((tag, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => {
                                const newTags = editingExp.skills.filter((_, i) => i !== idx);
                                setEditingExp({ ...editingExp, skills: newTags });
                              }}
                              className="hover:text-blue-900 font-extrabold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ex: Suporte N1, Wi-Fi Corporativo, Zabbix..."
                          value={newSkillTag}
                          onChange={(e) => setNewSkillTag(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newSkillTag.trim()) return;
                            if (editingExp.skills.includes(newSkillTag.trim())) return;
                            setEditingExp({
                              ...editingExp,
                              skills: [...editingExp.skills, newSkillTag.trim()]
                            });
                            setNewSkillTag('');
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex-shrink-0"
                        >
                          Adicionar Tag
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setEditingExp(null)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                      >
                        Descartar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: HABILIDADES */}
            {activeTab === 'habilidades' && (
              <div className="space-y-6">
                {!editingSkill ? (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-150">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                          <Code className="w-5 h-5 text-blue-600" />
                          Habilidades & Competências
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Configure suas habilidades por níveis e categorias para a visualização dinâmica do site.
                        </p>
                      </div>
                      <button
                        onClick={startNewSkill}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Nova Habilidade
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {skills.map((skill, idx) => (
                        <div key={idx} className="border border-slate-200 p-3.5 rounded-xl flex items-center justify-between hover:border-slate-350 transition-colors bg-slate-50/20">
                          <div>
                            <span className="font-extrabold text-slate-900 text-xs block">{skill.name}</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase mt-0.5 block">
                              Nível {skill.level}% • {skill.category === 'suporte' ? 'Suporte & Infra.' : skill.category === 'redes' ? 'Redes & Tel.' : skill.category === 'desenvolvimento' ? 'Desenv. & Aut.' : skill.category === 'ia' ? 'Inteligência Art.' : 'Habilidade Pess.'}
                            </span>
                          </div>
                          
                          <div className="flex gap-1">
                            <button
                              onClick={() => { setEditingSkill(skill); setEditingSkillIndex(idx); }}
                              className="p-1.5 text-slate-500 hover:text-blue-650 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSkill(idx)}
                              className="p-1.5 text-slate-400 hover:text-red-650 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSaveSkill} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <h4 className="text-xs font-black text-slate-900 uppercase">
                        {editingSkillIndex !== null ? 'Editar Habilidade' : 'Nova Habilidade'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setEditingSkill(null); setEditingSkillIndex(null); }}
                        className="text-xs text-slate-550 hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Nome da Habilidade *</label>
                      <input
                        type="text"
                        required
                        value={editingSkill.name}
                        onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                        placeholder="Ex: Monitoramento Zabbix / Fusão de Fibra Óptica"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Categoria *</label>
                        <select
                          value={editingSkill.category}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        >
                          <option value="suporte">Suporte & Infraestrutura</option>
                          <option value="redes">Redes & Telecom</option>
                          <option value="desenvolvimento">Desenvolvimento & Automação</option>
                          <option value="ia">Inteligência Artificial</option>
                          <option value="soft">Habilidade Pessoal</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-700">Nível de Domínio: {editingSkill.level}%</label>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={editingSkill.level}
                          onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => { setEditingSkill(null); setEditingSkillIndex(null); }}
                        className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Salvar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 4: FORMAÇÃO ACADÊMICA */}
            {activeTab === 'educacao' && (
              <div className="space-y-6">
                {!editingEdu ? (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-150">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                          Formação Acadêmica
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Gerencie seus diplomas, cursos técnicos ou superiores.
                        </p>
                      </div>
                      <button
                        onClick={startNewEducation}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Nova Formação
                      </button>
                    </div>

                    <div className="space-y-3">
                      {educations.map((edu, idx) => (
                        <div key={idx} className="border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-slate-350 transition-colors">
                          <div>
                            <span className="font-extrabold text-slate-900 text-sm block">{edu.degree}</span>
                            <span className="text-xs text-slate-550 block font-medium uppercase mt-0.5">{edu.institution} • {edu.period} ({edu.status})</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingEdu(edu); setEditingEduIndex(idx); }}
                              className="p-2 text-slate-550 hover:text-blue-650 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEducation(idx)}
                              className="p-2 text-slate-400 hover:text-red-650 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSaveEducation} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <h4 className="text-xs font-black text-slate-900 uppercase">
                        {editingEduIndex !== null ? 'Editar Formação' : 'Nova Formação'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setEditingEdu(null); setEditingEduIndex(null); }}
                        className="text-xs text-slate-550 hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Título / Curso *</label>
                        <input
                          type="text"
                          required
                          value={editingEdu.degree}
                          onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Instituição *</label>
                        <input
                          type="text"
                          required
                          value={editingEdu.institution}
                          onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Período *</label>
                        <input
                          type="text"
                          required
                          value={editingEdu.period}
                          onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Status *</label>
                        <select
                          value={editingEdu.status}
                          onChange={(e) => setEditingEdu({ ...editingEdu, status: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        >
                          <option value="Concluído">Concluído</option>
                          <option value="Em andamento">Em andamento</option>
                          <option value="Incompleto">Incompleto / Trancado</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Descrição do Curso</label>
                      <input
                        type="text"
                        value={editingEdu.description}
                        onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => { setEditingEdu(null); setEditingEduIndex(null); }}
                        className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Salvar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 5: CERTIFICAÇÕES */}
            {activeTab === 'certificacoes' && (
              <div className="space-y-6">
                {!editingCert ? (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-150">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                          <Award className="w-5 h-5 text-blue-600" />
                          Certificações & Cursos Livres
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Adicione suas credenciais técnicas do mercado (ITIL, Ubiquiti, etc.).
                        </p>
                      </div>
                      <button
                        onClick={startNewCertification}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Nova Certificação
                      </button>
                    </div>

                    <div className="space-y-3">
                      {certifications.map((cert, idx) => (
                        <div key={idx} className="border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-slate-350 transition-colors">
                          <div>
                            <span className="font-extrabold text-slate-900 text-sm block">{cert.name}</span>
                            <span className="text-xs text-slate-550 block font-medium uppercase mt-0.5">{cert.institution} • {cert.year}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingCert(cert); setEditingCertIndex(idx); }}
                              className="p-2 text-slate-550 hover:text-blue-650 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCertification(idx)}
                              className="p-2 text-slate-400 hover:text-red-650 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSaveCertification} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <h4 className="text-xs font-black text-slate-900 uppercase">
                        {editingCertIndex !== null ? 'Editar Certificação' : 'Nova Certificação'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setEditingCert(null); setEditingCertIndex(null); }}
                        className="text-xs text-slate-550 hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Nome da Certificação *</label>
                        <input
                          type="text"
                          required
                          value={editingCert.name}
                          onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Emissor / Instituição *</label>
                        <input
                          type="text"
                          required
                          value={editingCert.institution}
                          onChange={(e) => setEditingCert({ ...editingCert, institution: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Ano de Emissão *</label>
                        <input
                          type="text"
                          required
                          value={editingCert.year}
                          onChange={(e) => setEditingCert({ ...editingCert, year: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 block">Descrição Resumida</label>
                        <input
                          type="text"
                          value={editingCert.description}
                          onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => { setEditingCert(null); setEditingCertIndex(null); }}
                        className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Salvar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 7: GERADOR DE CARTAS */}
            {activeTab === 'cartas' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                    Gerador de Cartas de Apresentação
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Gere cartas de apresentação personalizadas de forma rápida para cada vaga que você se candidatar, usando seus dados profissionais cadastrados.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <CoverLetterGenerator personalInfo={personalInfo} />
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
