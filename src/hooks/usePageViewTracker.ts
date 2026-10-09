import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../services/apiService';

export function usePageViewTracker(currentCity?: string) {
  const location = useLocation();

  useEffect(() => {
    // Ignorar rotas de administração ou colaboradores e logins de admin
    if (
      location.pathname.startsWith('/admin') ||
      location.pathname.startsWith('/portal') ||
      sessionStorage.getItem('nuvv_admin_auth') === 'true'
    ) {
      return;
    }

    // Delay slightly to ensure document.title is updated by SEO component
    const timer = setTimeout(() => {
      apiService.trackPageView(
        location.pathname + location.search,
        document.title,
        currentCity
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search, currentCity]);
}
