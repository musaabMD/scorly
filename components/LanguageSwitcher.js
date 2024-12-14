// components/LanguageSwitcher.js
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const languages = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ar: 'العربية'
  };

  const handleLocaleChange = (newLocale) => {
    // Set HTML dir attribute for RTL/LTR
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select
      value={locale}
      onChange={(e) => handleLocaleChange(e.target.value)}
      className="select select-sm select-bordered"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {Object.keys(languages).map((loc) => (
        <option key={loc} value={loc}>
          {languages[loc]}
        </option>
      ))}
    </select>
  );
}