import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, MapPin, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

export const Privacidade: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50/60 min-h-screen">
      <SEO
        title="Política de Privacidade & LGPD | Nuvv Internet e Tecnologia"
        description="Política de privacidade e proteção de dados pessoais em conformidade com a LGPD (Lei 13.709/18) da Nuvv Tecnologia LTDA."
        keywords={['politica de privacidade', 'lgpd nuvv', 'seguranca de dados']}
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
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Conformidade LGPD (Lei 13.709/18) & Marco Civil da Internet</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-nuvv-dark">Política de Privacidade</h1>
            <p className="text-xs text-gray-400 mt-2">
              Nuvv Tecnologia LTDA • CNPJ: 47.698.135/0001-36
            </p>
          </div>

          {/* Intro */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-gray-700 space-y-2">
            <p>
              O presente documento foi elaborado em conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (Lei 13.709/18)</strong>, o <strong>Marco Civil da Internet (Lei 12.965/14)</strong> e o Regulamento da UE n. 2016/679 (GDPR). Ainda, o documento poderá ser atualizado em decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar periodicamente esta seção.
            </p>
            <p>
              Para efeitos de acompanhamento e protocolo estabelecido, o <strong>prazo médio de retorno às solicitações aos usuários é de até 7 dias úteis</strong>, sendo gerado um número (protocolo) para que ele solicite a qualquer momento um retorno a respeito de sua solicitação. Adicionalmente, uma vez que a demanda não possa ser atendida, o usuário/cliente será notificado com a justificativa a respeito da sua demanda não ser atendida.
            </p>
          </div>

          {/* 1. Como os dados são recolhidos */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">1</span>
              <span>Como os Dados Pessoais são Recolhidos</span>
            </h2>
            <p>
              Os dados pessoais do usuário e visitante são recolhidos pela plataforma da seguinte forma:
            </p>
            <div className="pl-4 border-l-2 border-nuvv-purple/30 space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Quando um usuário e visitante acessa as páginas do site www.nuvv.com.br:</strong> as informações sobre interação e acesso são coletadas pela empresa para garantir uma melhor experiência ao usuário e visitante. Estes dados podem tratar sobre as palavras-chaves utilizadas em uma busca, o compartilhamento de um documento específico, comentários, visualizações de páginas, perfis, a URL de onde o usuário e visitante provêm, o navegador que utilizam e seus IPs de acesso, dentre outras que poderão ser armazenadas e retidas.
              </p>
            </div>
          </section>

          {/* 2. Quais dados são recolhidos */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">2</span>
              <span>Dados Pessoais Recolhidos</span>
            </h2>
            <p>
              Os dados pessoais do usuário e visitante recolhidos são os seguintes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Dados para otimização da navegação:</strong> acesso às páginas, palavras-chave utilizadas na busca, recomendações, comentários, interação com outros perfis e usuários, perfis seguidos, endereço de IP.
              </li>
              <li>
                <strong>Newsletter:</strong> o e-mail cadastrado pelo visitante que optar por se inscrever na Newsletter será coletado e armazenado até que o usuário solicite o descadastro.
              </li>
              <li>
                <strong>Dados relacionados a contratos:</strong> diante da formalização do contrato de compra e venda ou de prestação de serviços entre a plataforma e o usuário e visitante. Poderão ser coletados e armazenados dados relativos à execução contratual, inclusive as comunicações realizadas entre a empresa e o usuário.
              </li>
              <li>
                <strong>Outras finalidades legítimas:</strong> dados estritamente necessários para suporte e atendimento ao cliente.
              </li>
            </ul>
          </section>

          {/* 3. Finalidades do Tratamento */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">3</span>
              <span>Finalidades do Tratamento dos Dados Pessoais</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <h3 className="font-bold text-nuvv-dark">Bem-estar do usuário e visitante</h3>
                <p className="text-gray-600">Aprimorar o produto e serviço oferecido, facilitar e agilizar os compromissos estabelecidos e melhorar a experiência de navegação.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <h3 className="font-bold text-nuvv-dark">Melhorias da plataforma</h3>
                <p className="text-gray-600">Compreender como o usuário utiliza os serviços para ajudar no desenvolvimento técnico e de negócios.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <h3 className="font-bold text-nuvv-dark">Comercial & Anúncios</h3>
                <p className="text-gray-600">Personalizar o conteúdo oferecido, avaliar a qualidade dos serviços e apresentar comunicações relevantes.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <h3 className="font-bold text-nuvv-dark">Cadastro e Contratos</h3>
                <p className="text-gray-600">Garantir segurança jurídica, permitir acesso a conteúdos exclusivos e viabilizar a conclusão do negócio.</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic mt-2">
              * O tratamento de dados pessoais para finalidades não previstas nesta Política de Privacidade somente ocorrerá mediante comunicação prévia ao usuário, permanecendo aplicáveis os direitos e obrigações aqui dispostos.
            </p>
          </section>

          {/* 4. Armazenamento e Retenção */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">4</span>
              <span>Prazo de Conservação dos Dados Pessoais</span>
            </h2>
            <p>
              Os dados pessoais do usuário e visitante são armazenados pela plataforma durante o período necessário para a prestação do serviço ou o cumprimento das finalidades previstas no presente documento, conforme o disposto no inciso I do artigo 15 da Lei 13.709/18.
            </p>
            <p>
              Os dados podem ser removidos ou anonimizados a pedido do usuário, excetuando os casos em que a lei oferecer outro tratamento. Ainda, os dados pessoais dos usuários apenas podem ser conservados após o término de seu tratamento nas seguintes hipóteses previstas no artigo 16 da referida lei:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>I –</strong> cumprimento de obrigação legal ou regulatória pelo controlador;</li>
              <li><strong>II –</strong> estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;</li>
              <li><strong>III –</strong> transferência a terceiro, desde que respeitados os requisitos de tratamento de dados dispostos nesta Lei;</li>
              <li><strong>IV –</strong> uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que anonimizados os dados.</li>
            </ol>
          </section>

          {/* 5. Segurança da Informação */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">5</span>
              <span>Segurança e Confidencialidade dos Dados</span>
            </h2>
            <p>
              A plataforma se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.
            </p>
            <p>
              A plataforma se exime de responsabilidade por culpa exclusiva de terceiros, como em caso de ataque de hackers ou crackers, ou culpa exclusiva do usuário, como no caso em que ele mesmo transfere seus dados a terceiros. O site se compromete a comunicar o usuário em caso de alguma violação de segurança dos seus dados pessoais.
            </p>
            <p>
              Os dados pessoais armazenados são tratados com confidencialidade, dentro dos limites legais. No entanto, podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.
            </p>
          </section>

          {/* 6. Links de Terceiros */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">6</span>
              <span>Links para Sites e Aplicativos de Terceiros</span>
            </h2>
            <p>
              Ao ser redirecionado para um aplicativo ou site de terceiros, você não será mais regido por essa Política de Privacidade ou pelos Termos de Serviço da nossa plataforma. Não somos responsáveis pelas práticas de privacidade de outros sites e lhe incentivamos a ler as declarações de privacidade deles.
            </p>
          </section>

          {/* 7. Consentimento e Direitos do Titular */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">7</span>
              <span>Consentimento e Exercício de Direitos</span>
            </h2>
            <p>
              Ao utilizar os serviços e fornecer as informações pessoais na plataforma, o usuário está consentindo com a presente Política de Privacidade. O usuário, ao cadastrar-se, manifesta conhecer e pode exercitar seus direitos de cancelar seu cadastro, acessar e atualizar seus dados pessoais e garante a veracidade das informações por ele disponibilizadas.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-2 text-xs">
              <h3 className="font-bold text-nuvv-dark">Como retirar seu consentimento ou contatar o Encarregado:</h3>
              <p>
                O usuário tem direito de retirar o seu consentimento a qualquer tempo, entrando em contato através do e-mail:
              </p>
              <p className="font-bold text-nuvv-purple flex items-center space-x-1.5">
                <Mail className="w-4 h-4" />
                <span>contato@nuvv.com.br</span>
              </p>
              <p className="text-gray-600 flex items-start space-x-1.5 mt-1">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500" />
                <span>Ou por correspondência: Av. Paulista, 1106 – Sala 01 Andar 16 – Bela Vista, São Paulo – SP, 01310-914.</span>
              </p>
            </div>
          </section>

          {/* 8. Modificações */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center text-xs font-black">8</span>
              <span>Modificações e Legislação Aplicável</span>
            </h2>
            <p>
              Reservamos o direito de modificar essa Política de Privacidade a qualquer momento, recomendando-se que o usuário a revise com frequência. As alterações surtem efeito imediatamente após sua publicação na plataforma. Diante da fusão ou venda da plataforma, os dados podem ser transferidos para assegurar a continuidade dos serviços.
            </p>
            <p>
              Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro, sendo competentes os foros da comarca da sede da empresa.
            </p>
          </section>

          {/* Legal Footer Info */}
          <div className="pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-1">
            <p className="font-bold text-gray-800">
              Nuvv Tecnologia LTDA • CNPJ/MF nº 47.698.135/0001-36
            </p>
            <p>
              Sede: Rua Portugal Freixo, 242 – Sala 151 – Centro, Suzano – SP, CEP: 08674-170.
            </p>
            <p>
              Contato com o Encarregado de Dados (DPO): <a href="mailto:contato@nuvv.com.br" className="text-nuvv-purple font-bold hover:underline">contato@nuvv.com.br</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
