// // import createMiddleware from 'next-intl/middleware';
// // import { updateSession } from "@/libs/supabase/middleware";

// // const locales = ['en', 'es', 'fr'];
// // const publicPages = ['/', '/blog'];

// // export async function middleware(request) {
// //   const pathname = request.nextUrl.pathname;
  
// //   // Handle internationalization
// //   const handleI18nRouting = createMiddleware({
// //     locales,
// //     defaultLocale: 'en'
// //   });
  
// //   // Handle Supabase auth
// //   const handleSupabaseSession = await updateSession(request);
  
// //   // For public pages, prioritize i18n
// //   if (publicPages.includes(pathname)) {
// //     return handleI18nRouting(request);
// //   }
  
// //   // For other pages, prioritize auth
// //   return handleSupabaseSession;
// // }

// // export const config = {
// //   matcher: [
// //     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
// //   ],
// // };

// import createMiddleware from 'next-intl/middleware';
// import { NextResponse } from 'next/server';
// import { updateSession } from '@/libs/supabase/middleware';

// const locales = ['en', 'es', 'fr'];

// export async function middleware(request) {
//   const pathname = request.nextUrl.pathname;
  
//   if (!pathname.includes('/_next') && !pathname.includes('/api')) {
//     if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
//       return NextResponse.next();
//     }
//     return await updateSession(request);
//   }
  
//   return createMiddleware({
//     locales,
//     defaultLocale: 'en',
//   })(request);
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
// };
// middleware.js
import createMiddleware from 'next-intl/middleware';
 
// Specify the locales you want to support
export default createMiddleware({
  locales: ['en', 'es', 'fr', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};