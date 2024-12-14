"use client"
import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark } from 'lucide-react';

const Header = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    es: { name: 'Español', flag: '🇪🇸' },
    ar: { name: 'العربية', flag: '🇸🇦' }
  };

  const handleLocaleChange = (newLocale) => {
    const content = document.querySelector('main');
    if (content) {
      content.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    }
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm" style={{ direction: 'ltr', height: '80px' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-slate-800">
              Scoorly
            </a>
          </div>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <a
                  href="/"
                  className={cn(
                    "text-lg px-5 py-2 rounded-md transition-colors",
                    "hover:bg-slate-100 hover:text-slate-900",
                    isActive('/') ? "bg-slate-200 text-slate-900 font-medium" : "text-slate-600"
                  )}
                >
                  Exams
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="/bookmarks"
                  className={cn(
                    "text-lg px-5 py-2 rounded-md transition-colors",
                    "hover:bg-slate-100 hover:text-slate-900",
                    isActive('/bookmarks') ? "bg-slate-200 text-slate-900 font-medium" : "text-slate-600"
                  )}
                >
                  Bookmarks
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="/pricing"
                  className={cn(
                    "text-lg px-5 py-2 rounded-md transition-colors",
                    "hover:bg-slate-100 hover:text-slate-900",
                    isActive('/pricing') ? "bg-slate-200 text-slate-900 font-medium" : "text-slate-600"
                  )}
                >
                  Pricing
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            {/* <select
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <option key={code} value={code}>
                  {flag} {name}
                </option>
              ))}
            </select> */}

            {/* Auth Buttons */}
            <Button
              variant="ghost"
              size="sm"
              className="text-lg font-medium px-5 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              asChild
            >
              <a href="/login">Log in</a>
            </Button>
            <Button
              size="sm"
              className="text-lg font-medium px-5 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800"
              asChild
            >
              <a href="/signup">Get started</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
