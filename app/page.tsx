'use client';


import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

import Link from 'next/link';

export default function Home() {


  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = Boolean(localStorage.getItem('token')); // 예시
    console.log('1 로그인  체크 isLoggedIn=', isLoggedIn   );
    console.log('2 token   체크 token=', token   );

    if (isLoggedIn) {
      // router.replace('/menu');
    }
  }, [router]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">주문 관리 시스템</h1>
        <p className="text-xl text-gray-600 mb-8">효율적인 주문 관리를 시작하세요</p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}


 