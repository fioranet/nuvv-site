import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  Wifi,
  MessageSquare,
  ShieldCheck,
  Bot,
  Zap,
  Target,
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Server,
  Network,
  Activity,
  Phone,
  Radio,
  Lock,
  Layers,
  Search,
  Sliders,
  CheckCircle,
  Clock,
  MapPin,
  Headphones,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../data/siteConfig';
import { PartnerCarousel } from '../components/common/PartnerCarousel';

interface SobreProps {
  currentCity?: string;
  onOpenLeadModal?: (serviceOrPlan?: string) => void;
}

export const Sobre: React.FC<SobreProps> = ({ currentCity, onOpenLeadModal }) => {
  const handleOpenSpecialist = () => {
    const citySuffix = currentCity ? ` (${currentCity})` : '';
    if (onOpenLeadModal) {
      onOpenLeadModal(`Consultoria Institucional - Sobre a Nuvv${citySuffix}`);
    } else {
      const cityPart = currentCity ? ` para nossa operação em ${currentCity}` : '';
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
          `Olá! Conheci a Nuvv através da página Sobre e gostaria de falar com um especialista sobre a infraestrutura da minha empresa${cityPart}.`
        )}`,
        '_blank'
      );
    }
  };

  // Elemento 1: Bloco Visual dos Três Pilares com conexões de soluções
  const threePillars = [
    {
      title: 'Conectividade',
      subtitle: 'Infraestrutura para manter empresas e operações conectadas.',
      icon: Wifi,
      gradient: 'from-blue-600 via-indigo-600 to-indigo-700',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      description:
        'Soluções de conectividade de alto desempenho para manter negócios em operação ininterrupta, garantindo velocidade, simetria e estabilidade de nível corporativo.',
      types: [
        { label: 'Internet Empresarial Fibra', desc: 'Estabilidade e alta velocidade para o dia a dia da equipe' },
        { label: 'Links Dedicados (100% de garantia)', desc: 'Banda exclusiva com simetria e IP Fixo válido' },
        { label: 'Redes Privadas & Lan to Lan', desc: 'Interligação direta entre matriz, filiais e centros de dados' },
        { label: 'Redundância & Baixa Latência', desc: 'Rotas alternativas com monitoramento ativo 24/7' },
      ],
    },
    {
      title: 'Comunicação',
      subtitle: 'Tecnologia para transformar a maneira como empresas se comunicam.',
      icon: MessageSquare,
      gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description:
        'Sistemas modernos que integram voz, mensagens e inteligência artificial para unificar a equipe e estreitar o relacionamento com clientes.',
      types: [
        { label: 'PABX em Nuvem & Ramais Virtuais', desc: 'Mobilidade no computador ou celular com gravação e URA' },
        { label: 'Telefonia IP & Tronco SIP', desc: 'Portabilidade numérica, 0800 e tarifas competitivas' },
        { label: 'Mensageria Corporativa SMS & RCS', desc: 'Comunicação oficial com selo verificado e alta taxa de abertura' },
        { label: 'Agentes de IA de Voz 24/7', desc: 'Atendimento telefônico humanizado sem filas de espera' },
      ],
    },
    {
      title: 'Soluções Digitais',
      subtitle: 'Tecnologias que ampliam o potencial da infraestrutura.',
      icon: Sparkles,
      gradient: 'from-purple-600 via-violet-600 to-indigo-700',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      description:
        'Ferramentas que elevam a segurança, geram inteligência de negócio e simplificam processos críticos da rotina corporativa.',
      types: [
        { label: 'Hotspot Wi-Fi Social com LGPD', desc: 'Captação qualificada de leads e conformidade legal total' },
        { label: 'Segurança Digital & Endpoints', desc: 'Proteção contra ransomware, phishing e vazamento de dados' },
        { label: 'Plataforma de Multiatendimento', desc: 'Múltiplos atendentes em um único canal com CRM Kanban' },
        { label: 'Projetos e Engenharia Sob Medida', desc: 'Integração de infraestrutura, cloud e soluções customizadas' },
      ],
    },
  ];

  // Elemento 2: "Como Trabalhamos" (Entender -> Analisar -> Propor -> Implementar -> Evoluir)
  const methodologySteps = [
    {
      step: '01',
      title: 'Entender',
      icon: Search,
      tag: 'Diagnóstico Inicial',
      desc: 'Ouvimos sua equipe para compreender a rotina, o número de unidades, os gargalos e o volume de operação.',
      question: 'Qual é a dor real e o desafio do negócio?',
    },
    {
      step: '02',
      title: 'Analisar',
      icon: Sliders,
      tag: 'Engenharia & Dados',
      desc: 'Mapeamos os requisitos técnicos de disponibilidade, latência, volume de comunicação e segurança da informação.',
      question: 'Qual o nível de criticidade e tolerância a falhas?',
    },
    {
      step: '03',
      title: 'Propor',
      icon: Layers,
      tag: 'Desenho Sob Medida',
      desc: 'Construímos uma arquitetura integrada combinando conectividade, comunicação e soluções digitais específicas.',
      question: 'Como entregar a melhor relação custo-benefício técnica?',
    },
    {
      step: '04',
      title: 'Implementar',
      icon: CheckCircle,
      tag: 'Execução Sem Atrito',
      desc: 'Ativação técnica com engenharia experiente, homologação rigorosa e transição sem impacto na sua operação.',
      question: 'Como ativar rápido e com segurança máxima?',
    },
    {
      step: '05',
      title: 'Evoluir',
      icon: TrendingUp,
      tag: 'Parceria de Longo Prazo',
      desc: 'Acompanhamento contínuo pelo NOC com suporte próximo e escalabilidade conforme a empresa se expande.',
      question: 'Como a infraestrutura apoia o crescimento futuro?',
    },
  ];

  // Elemento 3: Prova Institucional Real
  const institutionalProofs = [
    {
      icon: Activity,
      label: 'Disponibilidade e SLA',
      value: '99,8%+',
      highlight: 'SLA garantido em contrato',
      desc: 'Acordo de Nível de Serviço rígido com atendimento prioritário e tempo de resposta garantido para operações corporativas.',
    },
    {
      icon: Headphones,
      label: 'Centro de Operações de Rede',
      value: 'NOC 24/7/365',
      highlight: 'Monitoramento proativo',
      desc: 'Equipe técnica monitorando links, latência e tráfego em tempo real, resolvendo oscilações antes que impactem sua empresa.',
    },
    {
      icon: MapPin,
      label: 'Cidades Atendidas',
      value: '9+ Cidades',
      highlight: 'Grande SP e Alto Tietê',
      desc: 'Presença sólida com rede própria em Suzano, Mogi das Cruzes, Poá, Ferraz de Vasconcelos, Itaquaquecetuba, São Paulo e região.',
    },
    {
      icon: Network,
      label: 'Infraestrutura de Rede',
      value: '100% Fibra Óptica',
      highlight: 'Rede própria e ASN registrado',
      desc: 'Topologia em anel com rotas redundantes, interconexões diretas aos principais pontos de troca de tráfego (PTT/IX.br).',
    },
    {
      icon: Users,
      label: 'Atendimento Humanizado',
      value: 'Sem Menus Longos',
      highlight: 'Proximidade regional',
      desc: 'Contato direto com especialistas e consultores que entendem o seu negócio, sem terceirizações ou atendimentos impessoais.',
    },
    {
      icon: ShieldCheck,
      label: 'Segurança & Telecom',
      value: 'Homologação Oficial',
      highlight: 'Licenças e normas Anatel',
      desc: 'Operação regular em conformidade com as melhores práticas de telecomunicações, LGPD e segurança cibernética.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Sobre a Nuvv | Empresa de Tecnologia e Telecomunicações"
        description="Conheça a Nuvv: conectividade, comunicação e soluções digitais com infraestrutura própria, atendimento consultivo e proximidade técnica."
        keywords={[
          'sobre a nuvv',
          'empresa de tecnologia telecomunicações',
          'quem é a nuvv',
          'como a nuvv trabalha',
          'conectividade comunicação soluções digitais',
          'infraestrutura fibra optica b2b',
        ]}
        canonicalUrl="https://nuvv.com.br/sobre"
      />

      {/* 1. HERO INSTITUCIONAL */}
      <section className="relative bg-gradient-to-b from-slate-950 via-nuvv-dark to-slate-900 text-white pt-16 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-nuvv-purple/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar para o início</span>
          </Link>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Institucional • Quem é a Nuvv</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Tecnologia para conectar <span className="text-emerald-400">negócios</span>, pessoas e possibilidades.
            </h1>

            <p className="text-lg sm:text-2xl font-medium text-slate-200 leading-relaxed">
              A Nuvv é uma empresa de tecnologia e telecomunicações que desenvolve e integra soluções para conectar empresas, pessoas e operações.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Atuamos em três frentes que fazem parte da realidade de qualquer negócio conectado:{' '}
              <strong className="text-white font-semibold">Conectividade, Comunicação e Soluções Digitais</strong>.
              Mais do que fornecer serviços, buscamos entender o que cada operação precisa para funcionar melhor, crescer e se comunicar com mais eficiência.
            </p>
          </div>
        </div>
      </section>

      {/* 2. COMO PENSAMOS: "Conectividade é apenas o começo" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-nuvv-purple">
                <Target className="w-4 h-4" />
                <span>Como Pensamos</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark leading-snug">
                Conectividade é apenas o começo.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Uma empresa precisa de muito mais do que simplesmente acesso à internet. Precisa de conexão estável, desempenho, disponibilidade, comunicação eficiente, redes que acompanhem sua operação e tecnologia capaz de evoluir junto com o negócio.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                É nesse cenário que a Nuvv atua: oferecemos soluções de conectividade empresarial, redes, links dedicados, comunicação corporativa e tecnologias digitais que podem ser combinadas de acordo com cada necessidade.
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm font-semibold text-nuvv-dark">
                Da conexão à experiência completa de comunicação corporativa.
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-nuvv-dark text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-inner border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Por que nossa abordagem é diferente?
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Entender antes de oferecer:</strong> Não acreditamos em soluções padronizadas para operações distintas.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Tecnologia com proximidade:</strong> Grandes capacidades técnicas sem burocracias ou relações distantes.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Feita para evoluir:</strong> Infraestrutura que cresce junto com a demanda sem complexidade desnecessária.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BLOCO VISUAL DOS TRÊS PILARES (Conectividade -> Comunicação -> Soluções Digitais) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Nossa Arquitetura de Entrega
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark">
            Três Pilares. Uma Visão Integrada.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Como organizamos nossas frentes tecnológicas para que cada solução converse com a outra, criando uma operação contínua e sem silos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {threePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
              >
                {/* Decorative Accent Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${pillar.badgeBg}`}>
                      Pilar 0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-nuvv-dark">{pillar.title}</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{pillar.subtitle}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {pillar.description}
                  </p>

                  {/* Connected Solution Types */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                      Tipos de Soluções Conectadas:
                    </span>
                    <div className="space-y-2.5">
                      {pillar.types.map((type, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-slate-200 transition-colors"
                        >
                          <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{type.label}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 pl-3">
                            {type.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    to="/empresarial"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple hover:text-nuvv-purple-dark transition-colors"
                  >
                    <span>Ver aplicação comercial no B2B</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "COMO TRABALHAMOS" (ENTENDER → ANALISAR → PROPOR → IMPLEMENTAR → EVOLUIR) */}
      <section className="bg-white border-y border-gray-100 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Posicionamento Consultivo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark">
              Como Trabalhamos
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Não empurramos pacotes fechados. Nossa metodologia garante que cada tecnologia implementada responda a uma necessidade real do seu negócio.
            </p>
          </div>

          {/* Stepper Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
            {methodologySteps.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.step}
                  className="bg-slate-50 rounded-2xl p-6 border border-gray-200/80 hover:border-emerald-500/40 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-600 transition-colors">
                        {m.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-slate-700 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-colors shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                        {m.tag}
                      </span>
                      <h3 className="text-lg font-bold text-nuvv-dark mt-0.5">{m.title}</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-200/60 text-[11px] italic text-slate-500">
                    "{m.question}"
                  </div>
                </div>
              );
            })}
          </div>

          {/* Manifesto Callout */}
          <div className="mt-12 bg-gradient-to-r from-slate-900 to-nuvv-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-bold">Tecnologia com Proximidade e Relações de Longo Prazo</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Nosso papel é acompanhar sua empresa na contratação e durante todas as fases de expansão da sua infraestrutura.
              </p>
            </div>
            <button
              onClick={handleOpenSpecialist}
              type="button"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              Falar com um Consultor
            </button>
          </div>
        </div>
      </section>

      {/* 5. PROVA INSTITUCIONAL (DADOS REAIS DE CAPACIDADE E OPERAÇÃO) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Capacidade Técnica e Operacional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark">
            Prova Institucional: A Estrutura por Trás da Promessa
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Garantir disponibilidade corporativa exige engenharia sólida, equipe técnica no local e infraestrutura com redundância.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutionalProofs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-nuvv-purple flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {item.highlight}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-nuvv-dark tracking-tight">
                  {item.value}
                </div>

                <h3 className="text-sm font-bold text-slate-800">{item.label}</h3>

                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. PARCEIROS TECNOLÓGICOS E EMPRESAS QUE CONFIAM */}
      <PartnerCarousel />

      {/* 7. CTA FINAL INSTITUCIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-nuvv-dark via-slate-900 to-nuvv-navy text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Vamos conversar sobre o seu negócio?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Conte-nos o que sua empresa precisa. A Nuvv ajuda a encontrar a solução mais adequada para sua operação funcionar com mais eficiência, estabilidade e capacidade de crescimento.
            </p>

            <div className="pt-2 text-xs sm:text-sm text-emerald-400 font-semibold tracking-wide">
              Conectividade • Comunicação • Soluções Digitais
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleOpenSpecialist}
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-400/20 hover:shadow-emerald-400/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Falar com um especialista</span>
            </button>

            <Link
              to="/empresarial"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all text-center"
            >
              Como a Nuvv resolve o problema da minha empresa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
