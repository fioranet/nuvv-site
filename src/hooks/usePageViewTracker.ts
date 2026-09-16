import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../services/apiService';

export function usePageViewTracker(currentCity?: string) {
  const location = useLocation();

  useEffect(() => {
    // Delay slightly to ensure document.title is updated by SEO component
    const timer = setTimeout(() => {
      apiService.trackPageView(
        location.pathname + location.search,
        document.title,
        currentCity || 'Suzano'
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search, currentCity]);
}
