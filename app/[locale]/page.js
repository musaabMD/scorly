// import { useTranslations } from 'next-intl';
// import ButtonSignin from "@/components/ButtonSignin";
// import Link from 'next/link';
// import LanguageSwitcher from "@/components/LanguageSwitcher"; // Add this import
// import Header from '@/components/Header';


// export default function Page() {
//   const t = useTranslations('Index');
  
//   return (
//     <>

//  <Header/>
//       <main>
//         <section className="flex flex-col items-center justify-center text-center gap-12 px-8 py-24">
//           <h1 className="text-3xl font-extrabold">{t('title')}</h1>
//           <p className="text-lg opacity-80">{t('subtitle')}</p>
//           <a
//             className="btn btn-primary"
//             href="https://shipfa.st/docs"
//             target="_blank"
//           >
//             {t('documentation')}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </a>
//           <Link href="/blog" className="link link-hover text-sm">
//             {t('blog')}
//           </Link>
//         </section>
//       </main>
//     </>
//   );
// }
// app/[locale]/page.js
'use client';

import ExamCategories from '@/components/ExamCategories';
import Header from '@/components/Header';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('ExamCategories');
  
  return (
    <>
    <main className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold text-center mb-12">
        {t('title')}
      </h1>
      <ExamCategories />
    </main>
    </>
  );
}