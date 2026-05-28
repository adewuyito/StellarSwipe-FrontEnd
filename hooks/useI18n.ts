import { useState, useEffect } from 'react';
import {
  t,
  getCurrentLocale,
  getSupportedLocales,
  setLocale,
  type Locale,
  initI18n,
} from '@/lib/i18n';

/**
 * Hook for using i18n in components
 * Provides translation function and locale management
 */
export function useI18n() {
  const [locale, setLocalLocale] = useState<Locale>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initI18n().then(() => {
      setLocalLocale(getCurrentLocale());
      setIsInitialized(true);
    });
  }, []);

  const changeLocale = async (newLocale: Locale) => {
    await setLocale(newLocale);
    setLocalLocale(newLocale);
  };

  return {
    t,
    locale,
    setLocale: changeLocale,
    supportedLocales: getSupportedLocales(),
    isInitialized,
  };
}
