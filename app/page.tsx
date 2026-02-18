'use client';
// import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'

import Link from 'next/link';

export default function Home() {

  // const session = await getServerSession();
  // const { data: session } = useSession();
  // const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
    // setIsLoggedIn(Boolean(token)); // 로그인 여부 상태 업데이트

  useEffect(() => {
    const token = localStorage.getItem("token");
      console.log('2 token   체크 token=', token   );
    if (token) {
      fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);


   


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">주문 관리 시스템</h1>
        <p className="text-xl text-gray-600 mb-8">효율적인 주문 관리를 시작하세요</p>
        
        {/* 로그인 상태가 아닐 때만 버튼 표시 */}
        {!user  && (
          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  );



}


 