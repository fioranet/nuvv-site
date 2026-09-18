import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CitySelectorModal } from './components/layout/CitySelectorModal';
import { LeadModal } from './components/common/LeadModal';
import { SpeedTestModal } from './components/suporte/SpeedTestModal';
import { Home } from './pages/Home';
import { Residencial } from './pages/Residencial';
import { Empresarial } from './pages/Empresarial';
import { Pabx } from './pages/Pabx';
import { Telefonia } from './pages/Telefonia';
import { Vision } from './pages/Vision';
import { Guard } from './pages/Guard';
import { PosteInteligente } from './pages/PosteInteligente';
import { VisionOriginal } from './pages/VisionOriginal';
import { SocialWifi } from './pages/SocialWifi';
import { Multiatendimento } from './pages/Multiatendimento';
import { SegurancaDigital } from './pages/SegurancaDigital';
import { ComunicacaoInteligente } from './pages/ComunicacaoInteligente';
import { MonteSeuComboEmpresarial } from './pages/MonteSeuComboEmpresarial';
import { MonteSeuComboResidencial } from './pages/MonteSeuComboResidencial';
import { Viabilidade } from './pages/Viabilidade';
import { CityLandingPage } from './pages/CityLandingPage';
import { Shop } from './pages/Shop';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { Suporte } from './pages/Suporte';
import { SegundaVia } from './pages/SegundaVia';
import { TotemSegundaVia } from './pages/TotemSegundaVia';
import { Termos } from './pages/Termos';
import { Privacidade } from './pages/Privacidade';
import { AdminDashboard } from './pages/AdminDashboard';
import { PortalColaborador } from './pages/PortalColaborador';
import { TestePlanos } from './pages/TestePlanos';
import { usePageViewTracker } from './hooks/usePageViewTracker';
import { DEFAULT_CITY } from './data/cities';
import { ComboLeadSummary } from './services/comboSummary';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [currentCity, setCurrentCity] = useState<string>(() => {
    return localStorage.getItem('nuvv_city') || DEFAULT_CITY;
  });

  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalPlanName, setLeadModalPlanName] = useState<string>('Plano Fibra Óptica');
  const [leadModalSummaryData, setLeadModalSummaryData] = useState<ComboLeadSummary | null>(null);
  const [isSpeedTestModalOpen, setIsSpeedTestModalOpen] = useState(false);

  // Tentativa inicial automática de geolocalização se não houver cidade salva
  useEffect(() => {
    if (!localStorage.getItem('nuvv_city')) {
      import('./services/geolocation').then(({ GeolocationService }) => {
        GeolocationService.detectFromBrowser().then((result) => {
          if (result.isSupported && result.cityName) {
            setCurrentCity(result.cityName);
            localStorage.setItem('nuvv_city', result.cityName);
          }
        });
      });
    }
  }, []);

  const handleSelectCity = (city: string) => {
    setCurrentCity(city);
    localStorage.setItem('nuvv_city', city);
  };

  const handleOpenLeadModal = (planName?: string, summaryData?: ComboLeadSummary | null) => {
    if (planName) setLeadModalPlanName(planName);
    setLeadModalSummaryData(summaryData || null);
    setIsLeadModalOpen(true);
  };

  const location = useLocation();
  usePageViewTracker(currentCity);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isTotemRoute =
    location.pathname.startsWith('/totem') ||
    location.pathname.startsWith('/kiosk') ||
    location.pathname.startsWith('/autoatendimento-totem');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    );
  }

  if (isTotemRoute) {
    return (
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        <ScrollToTop />
        <Routes>
          <Route path="/totem" element={<TotemSegundaVia />} />
          <Route path="/totem/2via" element={<TotemSegundaVia />} />
          <Route path="/kiosk" element={<TotemSegundaVia />} />
          <Route path="/autoatendimento-totem" element={<TotemSegundaVia />} />
        </Routes>
      </div>
    );
  }

  const isPortalRoute =
    location.pathname.startsWith('/portal') ||
    location.pathname.startsWith('/colaborador');

  if (isPortalRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <ScrollToTop />
        <Routes>
          <Route path="/portal" element={<PortalColaborador />} />
          <Route path="/colaborador" element={<PortalColaborador />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-nuvv-purple selection:text-white">
      <ScrollToTop />

      {/* Global Navigation Header */}
      <Header
        currentCity={currentCity}
        onOpenCitySelector={() => setIsCityModalOpen(true)}
        onOpenLeadModal={() => handleOpenLeadModal('Contratação Rápida')}
      />

      {/* Main Page Routing */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currentCity={currentCity}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenLeadModal={handleOpenLeadModal}
              />
            }
          />
          <Route
            path="/residencial"
            element={
              <Residencial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/residencial/monte-seu-combo"
            element={
              <MonteSeuComboResidencial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/monte-seu-combo"
            element={
              <MonteSeuComboResidencial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/monte-seu-plano"
            element={
              <MonteSeuComboResidencial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/teste-planos"
            element={
              <TestePlanos
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/teste"
            element={
              <TestePlanos
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/empresarial"
            element={
              <Empresarial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/empresas"
            element={
              <Empresarial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/empresas/monte-seu-combo"
            element={
              <MonteSeuComboEmpresarial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/empresarial/monte-seu-combo"
            element={
              <MonteSeuComboEmpresarial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/monte-seu-combo-empresarial"
            element={
              <MonteSeuComboEmpresarial
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/pabx"
            element={
              <Pabx
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/telefonia"
            element={
              <Telefonia
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/guard"
            element={
              <Guard
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/postes"
            element={
              <PosteInteligente
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/poste-inteligente"
            element={
              <PosteInteligente
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/guard/postes"
            element={
              <PosteInteligente
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/vision"
            element={
              <Guard
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/vision-original"
            element={
              <VisionOriginal
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/social-wifi"
            element={
              <SocialWifi
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/multiatendimento"
            element={
              <Multiatendimento
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/seguranca-digital"
            element={
              <SegurancaDigital
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/comunicacao-inteligente"
            element={
              <ComunicacaoInteligente
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/nuvv-digital"
            element={
              <ComunicacaoInteligente
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/viabilidade"
            element={
              <Viabilidade
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/cobertura"
            element={
              <Viabilidade
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/cidade/:citySlug"
            element={
              <CityLandingPage
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
                onSelectCity={handleSelectCity}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/blog"
            element={
              <Blog
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/blog/:id"
            element={
              <BlogPostPage
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
          <Route
            path="/suporte"
            element={
              <Suporte
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
                isSpeedTestOpen={isSpeedTestModalOpen}
                onCloseSpeedTest={() => setIsSpeedTestModalOpen(false)}
              />
            }
          />
          <Route path="/2via" element={<SegundaVia />} />
          <Route path="/segunda-via" element={<SegundaVia />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route
            path="*"
            element={
              <Home
                currentCity={currentCity}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenSpeedTest={() => setIsSpeedTestModalOpen(true)}
                onOpenCitySelector={() => setIsCityModalOpen(true)}
              />
            }
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onOpenLeadModal={() => handleOpenLeadModal('Contratação pelo Rodapé')} />

      {/* Global Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
      />

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setLeadModalSummaryData(null);
        }}
        planName={leadModalPlanName}
        cityName={currentCity}
        summaryData={leadModalSummaryData}
      />

      <SpeedTestModal
        isOpen={isSpeedTestModalOpen}
        onClose={() => setIsSpeedTestModalOpen(false)}
      />
    </div>
  );
}
export default App;
