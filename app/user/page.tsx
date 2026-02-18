'use client';

import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">사용자 페이지</h1>

      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <p className="text-lg">이름: 홍길동</p>
        <p className="text-lg">이메일: hong@example.com</p>
      </div>

      {/* 홈 버튼 */}
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
        onClick={() => router.push('/')}
      >
        홈으로
      </button>

      {/* 메뉴 페이지 이동 버튼 */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.push('/user/menu')}
      >
        메뉴 보기
      </button>
    </div>
  );
}
