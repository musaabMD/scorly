// // libs/i18n/config.js
// export const i18nConfig = {
//     locales: ['en', 'es', 'fr'],
//     defaultLocale: 'en',
//     localeDetection: true,
//     pages: {
//       '*': ['common'],
//       '/': ['home'],
//       '/dashboard': ['dashboard']
//     }
//   };
  
//   // libs/i18n/settings.js
//   import { createSharedPathnamesNavigation } from 'next-intl/navigation';
  
//   export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation({ 
//     locales: i18nConfig.locales 
//   });

export const defaultLocale = 'en'
export const locales = ['en', 'es', 'fr', 'ar']