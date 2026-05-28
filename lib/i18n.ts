/**
 * Simple i18n system with JSON-based locale files
 */

export type Locale = 'en' | 'ng';

const LOCALE_KEY = 'stellarswipe:locale';
const DEFAULT_LOCALE: Locale = 'en';
const SUPPORTED_LOCALES: Locale[] = ['en', 'ng'];

let currentLocale: Locale = DEFAULT_LOCALE;
let translations: Record<string, any> = {};
let fallbackTranslations: Record<string, any> = {};

/**
 * Get nested value from object using dot notation
 * e.g., "signals.buy_signal" -> translations.signals.buy_signal
 */
function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current?.[key] === undefined) return undefined;
    current = current[key];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Load locale JSON file
 */
async function loadLocale(locale: Locale): Promise<Record<string, any>> {
  try {
    const response = await fetch(`/locales/${locale}.json`);
    if (!response.ok) throw new Error(`Failed to load ${locale} locale`);
    return await response.json();
  } catch (err) {
    console.error(`Error loading locale ${locale}:`, err);
    return {};
  }
}

/**
 * Initialize i18n system
 */
export async function initI18n() {
  if (typeof window === 'undefined') return;

  // Load stored locale or use default
  const stored = localStorage.getItem(LOCALE_KEY);
  currentLocale = (stored && SUPPORTED_LOCALES.includes(stored as Locale)
    ? stored as Locale
    : DEFAULT_LOCALE);

  // Load fallback (English) first
  fallbackTranslations = await loadLocale(DEFAULT_LOCALE);

  // Load current locale if not English
  if (currentLocale !== DEFAULT_LOCALE) {
    translations = await loadLocale(currentLocale);
  } else {
    translations = fallbackTranslations;
  }
}

/**
 * Set current locale
 */
export async function setLocale(locale: Locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Unsupported locale: ${locale}`);
    return;
  }

  currentLocale = locale;
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_KEY, locale);
  }

  // Load translations
  if (locale === DEFAULT_LOCALE) {
    translations = fallbackTranslations;
  } else {
    translations = await loadLocale(locale);
  }
}

/**
 * Translate a key with fallback to English
 */
export function t(key: string): string {
  // Try current locale first
  let value = getNestedValue(translations, key);
  if (value) return value;

  // Fall back to English
  value = getNestedValue(fallbackTranslations, key);
  if (value) return value;

  // Return key itself if not found
  console.warn(`Missing translation key: ${key}`);
  return key;
}

/**
 * Get current locale
 */
export function getCurrentLocale(): Locale {
  return currentLocale;
}

/**
 * Get all supported locales
 */
export function getSupportedLocales(): Locale[] {
  return SUPPORTED_LOCALES;
}
