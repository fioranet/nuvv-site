import React from 'react';
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

export const Termos: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50/60 min-h-screen">
      <SEO
        title="Termos de Uso | Nuvv Internet e Tecnologia"
        description="Termos de uso e condições gerais da plataforma e serviços de telecomunicações Nuvv Tecnologia LTDA."
        keywords={['termos de uso', 'contrato nuvv', 'regulamento nuvv']}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple hover:underline mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para o início</span>
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm space-y-8 text-sm text-gray-700 leading-relaxed">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-nuvv-purple text-xs font-bold mb-3 border border-indigo-200">
              <FileText className="w-3.5 h-3.5" />
              <span>Documento Legal Oficial</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-nuvv-dark">Termos de Uso</h1>
            <p className="text-xs text-gray-400 mt-2">
              Nuvv Tecnologia LTDA • CNPJ: 47.698.135/0001-36
            </p>
          </div>

          {/* 1. Definições */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">1</span>
              <span>Definições</span>
            </h2>
            <div className="space-y-2 text-xs sm:text-sm pl-4 border-l-2 border-nuvv-purple/30">
              <p>
                <strong>Nuvv Tecnologia LTDA:</strong> Sociedade empresarial de responsabilidade limitada, inscrita no CNPJ/MF sob o número 47.698.135/0001-36, com sede na Rua Portugal Freixo, 242 – Sala 151 – Centro, Suzano – SP, CEP: 08674-170.
              </p>
              <p>
                <strong>PLATAFORMA:</strong> Sistema Web de propriedade e oferecido pela Nuvv, para utilização e gerenciamento dos serviços por meio de usuário e senha.
              </p>
              <p>
                <strong>CLIENTE:</strong> Pessoa física ou jurídica cadastrada na PLATAFORMA, que acesse e/ou utilize os serviços oferecidos pela Nuvv com seu usuário e senha pessoal.
              </p>
              <p>
                <strong>DESTINATÁRIO FINAL:</strong> Pessoa física ou jurídica informada pelo CLIENTE como final na cadeia de recebimento dos serviços.
              </p>
              <p>
                <strong>PARTES:</strong> Cliente e Nuvv.
              </p>
            </div>
          </section>

          {/* 2. Aceitação */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">2</span>
              <span>Aceitação</span>
            </h2>
            <p>
              Bem-vindo a <a href="https://www.nuvv.com.br/" className="text-nuvv-purple font-bold hover:underline">https://www.nuvv.com.br/</a>. Este website é controlado e operado pela Nuvv, empresa localizada na Rua Portugal Freixo, 242 – Sala 151 – Centro, Suzano – SP, 08674-170. No presente documento (“Termos de Uso”) você encontrará detalhes sobre as normas relativas ao uso do website e de nossas aplicações.
            </p>
            <p>
              Por favor, leia atentamente as condições descritas neste documento. O acesso, navegação ou utilização de nosso website é a sua declaração de aceitação aos termos e condições aqui propostos. Você poderá verificar as disposições destes Termos e da Política de Privacidade a qualquer momento por meio da plataforma e através do nosso link oficial.
            </p>
            <p className="text-xs text-gray-500 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              Estes Termos se aplicam a todos os visitantes, usuários e outros que acessam ou usam o Serviço. Antes de utilizar a plataforma da Nuvv, você deverá ler atentamente todo o conteúdo deste documento e, caso esteja de acordo, poderá prosseguir com seu uso; eventualmente, para certas atividades de tratamento de dados pessoais relativas às funcionalidades e à disponibilização de aplicações, produtos e serviços, poderá ser solicitado seu consentimento livre, informado e inequívoco. Caso tenha qualquer dúvida em relação a este documento entre em contato conosco e, se você não estiver de acordo com estes Termos de Uso deverá descontinuar o seu acesso.
            </p>
          </section>

          {/* 3. O que fazemos */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">3</span>
              <span>O que Fazemos?</span>
            </h2>
            <p>
              Com foco no mercado corporativo e residencial, entregamos serviços digitais inovadores e conveniências que impulsionam a produtividade e conectividade de empresas e oferecem uma experiência superior para famílias.
            </p>
          </section>

          {/* 4. Objeto */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">4</span>
              <span>Objeto</span>
            </h2>
            <p>
              A Nuvv por meio deste website, proporciona informações gerais sobre a empresa, suas ações e seus produtos.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <p className="font-bold flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Ressalva de Informações:</span>
              </p>
              <p>
                Apesar dos esforços envidados para manter a precisão e atualização das informações disponibilizadas, a Nuvv não pode garantir ou assumir qualquer responsabilidade quanto a sua confiabilidade, exatidão, validade, atualidade, utilidade, integridade, pertinência, oportunidade ou abrangência, não sendo, portanto, responsável por prejuízos, perdas ou danos ocorridas pela visita ao site. Você é responsável por verificar a confiabilidade das informações antes de tomar alguma decisão ou praticar algum ato.
              </p>
            </div>
          </section>

          {/* 5. Elegibilidade */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">5</span>
              <span>Elegibilidade: Declaração de Maioridade</span>
            </h2>
            <p>
              Como condição para acesso e uso das funcionalidades exclusivas deste website e todos os serviços a ele relacionados, você declara ser <strong>maior de 18 (dezoito) anos</strong> e, que fez a leitura completa e atenta das regras deste documento, expressando livremente a sua concordância com os termos aqui estipulados.
            </p>
          </section>

          {/* 6. Utilização da Plataforma */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">6</span>
              <span>Utilização da Plataforma</span>
            </h2>
            <p>
              As plataformas da Nuvv estão disponíveis na Internet, por onde você pode acessar seus conteúdos e ver todas as espécies de serviços e produtos ofertados pela empresa. Para tanto, a Nuvv sempre solicitará a você algumas permissões para o ideal funcionamento das plataformas durante sua sessão de uso. Em alguns casos, será necessário que você se cadastre.
            </p>
            <p>
              Desta forma, ao aceitar estes Termos, você reconhece ser o único responsável pelo fornecimento de informações e dados pessoais corretos para o cadastro, eximindo a Nuvv de toda e qualquer responsabilidade relativa a eventuais informações falsas e/ou inexatas, bem como por eventuais danos e prejuízos decorrentes de tais informações causadas a você, a terceiros ou a própria Nuvv.
            </p>
            <p>
              Neste mesmo sentido, você reconhece que, excepcionalmente, caso a Nuvv verifique qualquer erro ou inconsistência nas informações fornecidas, o acesso e utilização das plataformas pode ficar prejudicada, até que a irregularidade seja corrigida por você, nos casos possíveis.
            </p>
            <p>
              Por fim, ao aceitar os presentes Termos, você se declara de que é o único e exclusivo responsável pelas informações fornecidas quando de seu acesso à plataforma, responsabilizando-se perante terceiros, por danos ou prejuízos decorrentes de informações incorretas, incompletas ou inverídicas inseridas.
            </p>
          </section>

          {/* 7. Propriedade Intelectual */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">7</span>
              <span>Propriedade Intelectual</span>
            </h2>
            <p>
              A Nuvv, salvo disposição em sentido contrário, é a detentora dos direitos autorais de toda a informação disponibilizada no website, bem como de todos os direitos de propriedade intelectual e direitos conexos. Fica vedada a utilização do nome, marca ou logotipo pertencente à Nuvv, exceto e somente quando houver a prévia, expressa e escrita autorização.
            </p>
            <p>
              Você poderá fazer download, imprimir, ou armazenar informações e materiais disponibilizados neste website para o seu uso particular, exclusivamente, e desde que mantenha intactas todas as notificações de direitos autorais e outras notificações de propriedade. Você não tem permissão para fazer uso das informações, no todo ou em parte, para ganhos comerciais.
            </p>
          </section>

          {/* 8. Links de Terceiros */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">8</span>
              <span>Links para Sites e Aplicativos de Terceiros</span>
            </h2>
            <p>
              A plataforma pode conter links para sites e aplicações de terceiros. Note que, dentro destes sites e aplicações, você estará sujeito a outros Termos de Uso e a outras Políticas de Privacidade. Nossos Termos não são válidos nos sites e aplicações de terceiros. A existência de links não implica em relação de endosso ou de patrocínio da Nuvv junto a estes terceiros, e a Nuvv não tem responsabilidade com relação a estes.
            </p>
          </section>

          {/* 9. Limitação de Responsabilidade */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">9</span>
              <span>Limitação de Responsabilidade</span>
            </h2>
            <p>
              Para o correto funcionamento deste website se torna indispensável o acesso e tráfego de dados entre terminais de seu computador ou dispositivo móvel e os servidores que hospedam este website. Portanto, a Nuvv não garante e nem se responsabiliza pela disponibilidade integral e ininterrupta dos serviços aqui disponibilizados, não possuindo, pois, nenhuma ingerência e não sendo responsável por eventuais no acesso a este website.
            </p>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-2">
              <p>
                <strong>Sob nenhuma circunstância</strong> a Nuvv será considerada responsável ou responsabilizada de qualquer forma, por quaisquer reclamações, danos, perdas, despesas, custos ou responsabilidades de qualquer natureza resultante ou decorrente direta ou indiretamente do uso ou da incapacidade de uso deste website.
              </p>
              <p>
                Este website também pode conter links para outros sites da Internet. Como não temos controle sobre sites de terceiros, você reconhece e concorda que a Nuvv não é responsável por qualquer conteúdo ou material nesses sites. Você ainda reconhece e concorda que a Nuvv não será responsável ou responsabilizada, direta ou indiretamente, por quaisquer danos ou perdas causados ou sofridos, em razão do uso ou confiança em informações ou materiais obtidos de sites de terceiros.
              </p>
            </div>
          </section>

          {/* 10. Privacidade */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">10</span>
              <span>Privacidade</span>
            </h2>
            <p>
              A utilização de alguns serviços oferecidos no website implica a necessidade do fornecimento de dados de caráter pessoal, os quais serão processados nos termos da nossa <Link to="/privacidade" className="text-nuvv-purple font-bold hover:underline">Política de Privacidade</Link>.
            </p>
            <p>
              A Nuvv adota todas as medidas de segurança técnicas e administrativas para a proteção de dados pessoais, nos termos da legislação aplicável e vigente, no que tange à privacidade e proteção de dados pessoais.
            </p>
          </section>

          {/* 11. Duração e Finalização de Serviços */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">11</span>
              <span>Duração e Finalização de Serviços</span>
            </h2>
            <p>
              Os conteúdos disponibilizados neste website têm uma duração indefinida. No entanto, a Nuvv está facultada a terminar, interromper, ou suspender unilateralmente, a qualquer momento e sem necessidade de aviso prévio, o fornecimento do conteúdo ou do próprio website, sem prejuízo do disposto no presente documento.
            </p>
          </section>

          {/* 12. Legislação e Foro */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">12</span>
              <span>Legislação e Foro</span>
            </h2>
            <p>
              Estes Termos de Uso serão regidos e interpretados de acordo com a legislação brasileira, independentemente dos conflitos dessas leis com leis de outros estados ou países, sendo competente o <strong>Foro da Comarca de São Paulo – SP</strong>, com exclusão de qualquer outro, para dirimir qualquer dúvida decorrente destes Termos de Uso. O usuário consente, expressamente, com a competência desse juízo com exclusão de qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          {/* 13. Disposições Finais */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">13</span>
              <span>Disposições Finais</span>
            </h2>
            <p>
              Os presentes Termos de Uso podem ser atualizados sem prévio aviso ao usuário, sendo mantida neste website sempre a versão mais atualizada e em vigor dos Termos de Uso. Por isto, recomendamos que você consulte a presente página e a Política de Privacidade periodicamente para verificar eventuais alterações.
            </p>
          </section>

          {/* Legal Footer */}
          <div className="pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-1">
            <p className="font-bold text-gray-800">
              Nuvv Tecnologia LTDA • CNPJ/MF nº 47.698.135/0001-36
            </p>
            <p>
              Sede: Rua Portugal Freixo, 242 – Sala 151 – Centro, Suzano – SP, CEP: 08674-170.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
