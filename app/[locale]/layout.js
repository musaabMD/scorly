import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { NextIntlClientProvider } from 'next-intl';
import "../globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../messages/en.json`)).default;
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${font.className} ${dir === 'rtl' ? 'rtl' : ''}`}
    >
      <body className="min-h-screen bg-white"> {/* Updated this line */}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="UTC"
          textDirection={dir}
        >
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}