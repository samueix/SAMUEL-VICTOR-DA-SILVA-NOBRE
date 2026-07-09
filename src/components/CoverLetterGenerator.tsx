import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileText, Send, Building } from 'lucide-react';
import { PersonalInfo } from '../types';

interface CoverLetterGeneratorProps {
  personalInfo: PersonalInfo;
}

export default function CoverLetterGenerator({ personalInfo }: CoverLetterGeneratorProps) {
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('Analista de Suporte de TI');
  const [focusArea, setFocusArea] = useState('suporte_redes');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const company = companyName ? companyName : 'sua renomada empresa';
    const role = roleName ? roleName : 'Analista de TI';
    
    let bodyText = '';

    if (focusArea === 'suporte_redes') {
      bodyText = `Com mais de 4 anos de experiência na área de tecnologia, sendo grande parte desse tempo dedicado ao suporte N1/N2 e à infraestrutura de redes na LINKCE TELECOM, desenvolvi um perfil altamente técnico e resolutivo. Tenho sólida vivência em roteamento TCP/IP, configurações de switches, gerenciamento de chamados sob padrões de service desk, e atendimento qualificado ao usuário final.`;
    } else if (focusArea === 'redes_infra') {
      bodyText = `Ao longo da minha trajetória, especializei-me no diagnóstico físico e lógico de ativos de rede. Minhas certificações como Ubiquiti Enterprise Wireless Admin (UEWA) e capacitações em infraestrutura de Fibra Óptica FTTH me qualificam para projetar, instalar e gerenciar redes Wi-Fi e cabeamento estruturado com alto nível de imunidade a ruídos e máxima performance corporativa.`;
    } else {
      bodyText = `Atualmente cursando Cibersegurança na Uniasselvi, busco sempre alinhar o suporte técnico operacional às melhores práticas de governança de TI (ITIL v4) e diretrizes de conformidade da LGPD. Minha proatividade e foco na resolução de incidentes no primeiro contato (FCR) garantem que a infraestrutura tecnológica trabalhe em plena sintonia com os objetivos de produtividade do negócio.`;
    }

    const template = `Prezada equipe de Recrutamento da ${company},

Gostaria de manifestar meu forte interesse na oportunidade para a vaga de ${role}. Acompanho a atuação de mercado da ${company} e acredito que meu perfil proativo, técnico e focado em soluções ágeis de tecnologia esteja em perfeita harmonia com os valores e demandas de sua equipe.

${bodyText}

Acredito que posso contribuir de forma imediata para otimizar os processos de suporte, garantir a estabilidade da infraestrutura e prover uma experiência de atendimento excepcional para os colaboradores e clientes da ${company}.

Estou à total disposição para agendarmos uma entrevista, onde poderei detalhar minhas qualificações práticas e como posso somar ao seu time de TI. Possuo CNH A e B, motocicleta própria e disponibilidade total para atuação.

Agradeço a atenção e consideração.

Atenciosamente,
${personalInfo.fullName}
${personalInfo.email} | ${personalInfo.phone}`;

    setGeneratedLetter(template);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">
          Gerador de Carta de Apresentação
        </h3>
      </div>
      
      <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-2xl leading-relaxed">
        <strong>Para Recrutadores:</strong> Insira o nome de sua empresa e o cargo desejado. O sistema criará instantaneamente um pitch de candidatura personalizado, estruturando as qualificações de Samuel conforme suas necessidades reais de contratação!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              Nome da Empresa
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ex: Linkce Telecom / Empresa X"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Cargo Pretendido
            </label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Ex: Analista de Redes / Suporte N2"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Foco Técnico do Pitch
            </label>
            <div className="grid grid-cols-1 gap-2">
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 border border-slate-200 cursor-pointer transition-colors text-xs text-slate-600">
                <input
                  type="radio"
                  name="focus"
                  checked={focusArea === 'suporte_redes'}
                  onChange={() => setFocusArea('suporte_redes')}
                  className="mt-0.5 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <div>
                  <strong className="text-slate-900 block font-extrabold mb-0.5 text-[13px]">Foco em Suporte Técnico N1/N2 & Atendimento</strong>
                  Experiência na LINKCE e atendimento ao usuário final.
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 border border-slate-200 cursor-pointer transition-colors text-xs text-slate-600">
                <input
                  type="radio"
                  name="focus"
                  checked={focusArea === 'redes_infra'}
                  onChange={() => setFocusArea('redes_infra')}
                  className="mt-0.5 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <div>
                  <strong className="text-slate-900 block font-extrabold mb-0.5 text-[13px]">Foco em Redes, Telecom & Wi-Fi</strong>
                  Certificações Ubiquiti UEWA e foco em ativos de rede e laboratório.
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 border border-slate-200 cursor-pointer transition-colors text-xs text-slate-600">
                <input
                  type="radio"
                  name="focus"
                  checked={focusArea === 'seg_govern'}
                  onChange={() => setFocusArea('seg_govern')}
                  className="mt-0.5 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <div>
                  <strong className="text-slate-900 block font-extrabold mb-0.5 text-[13px]">Foco em Cibersegurança & ITIL</strong>
                  Formação em Cibersegurança, boas práticas ITIL e LGPD.
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/15 text-xs sm:text-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Gerar Carta Personalizada
          </button>
        </div>

        {/* Letter Output Display */}
        <div className="lg:col-span-7 flex flex-col h-full self-stretch justify-between">
          {generatedLetter ? (
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex-1 flex flex-col justify-between min-h-[300px]">
              <div className="text-xs sm:text-sm text-slate-700 font-medium overflow-y-auto max-h-[350px] leading-relaxed whitespace-pre-wrap pr-1 select-all">
                {generatedLetter}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end gap-3 no-print">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      Copiar Texto
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50/50 border border-dashed border-slate-200 p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-[300px] h-full text-slate-500">
              <FileText className="w-12 h-12 mb-3 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">Preencha os campos ao lado e clique em "Gerar Carta Personalizada"</p>
              <p className="text-xs mt-1 text-slate-500">A carta gerada poderá ser copiada e utilizada diretamente no envio de e-mails ou LinkedIn!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
