'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32">
        <div className="z-10 font-sans text-5xl pl-10 pr-10">Welcome to G-Warmup</div>

        <div className="text-white-700 text-l text-center pt-8 pb-8 pl-10 pr-10">
          G-Warmup is a platform that allows you to take quizzes and improve your knowledge in different areas.
        </div>

        <div className="pl-10 pr-10 pt-8 pb-8 flex items-center justify-center">
          <Link href={'/authentication/sign-in'}>Get Access</Link>
        </div>
      </div>
    </>
  );
}
