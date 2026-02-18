'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 입력값 검증
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (password.length < 2) {
      setError('비밀번호는 최소 2자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    // TODO: 로그인 API 호출
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('res=',data)



      if (data.success) {
        // 로그인 성공 처리
        alert('로그인 성공!');
        console.log('Login attempt:', { email, password });

        // 토큰 저장
        localStorage.setItem('token', data.token);

        // role 값에 따라 분기
        switch (data.user.role) {
          case 'customer':
            router.push('/user/menu'); // 일반 고객 → 메뉴 주문 페이지
            break;
          case 'admin':
            router.push('/admin/menu'); // 관리자 → 메뉴 관리 페이지
            break;
          case 'superadmin':
            router.push('/super-admin/menu'); // 수퍼관리자도 관리자 페이지로 이동 (필요시 별도 페이지 가능)
            break;
          default:
            router.push('/'); // role 값이 없거나 잘못된 경우 홈으로
        }
      } 
      else {
        // setError(data.message || '로그인에 실패했습니다.');
        throw new Error(data.message);
      }

      // 임시로 성공 처리
    } catch (err) {
      console.log('error >>>>>>>>>>>>>>>>>>>>>>>>>>>', err)
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
          <p className="text-gray-600 mt-2">주문 관리 시스템에 접속하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 에러 메시지 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* 이메일 입력 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={loading}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={loading}
            />
          </div>

          {/* 비밀번호 찾기 */}
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
