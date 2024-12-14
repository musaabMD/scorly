// export const defaultLocale = 'en';
// export const locales = ['en', 'es', 'fr'];

// export function getLocaleDisplayName(locale) {
//   return {
//     en: 'English',
//     es: 'Español',
//     fr: 'Français'
//   }[locale] || locale;
// };

import { locales } from './config';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, useRouter, usePathname } = createSharedPathnamesNavigation({ 
  locales 
});