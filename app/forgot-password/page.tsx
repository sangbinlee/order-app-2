'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 입력값 검증
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    if (!validateEmail(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setLoading(true);

    // TODO: 비밀번호 찾기 API 호출
    try {
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await response.json();
      // if (data.success) {
      //   setEmailSent(true);
      // }

      console.log('Password reset requested for:', email);
      setEmailSent(true);
    } catch (err) {
      setError('요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">이메일 발송 완료</h1>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-center">
              <span className="font-semibold text-blue-600">{email}</span>로 비밀번호 재설정 링크를 발송했습니다.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-600 text-sm">
              📧 이메일을 확인하여 비밀번호 재설정 링크를 클릭하세요.
            </p>
            <p className="text-gray-600 text-sm">
              ⏱️ 링크는 24시간 동안 유효합니다.
            </p>
            <p className="text-gray-600 text-sm">
              📬 이메일이 보이지 않으면 스팜 폴더를 확인해주세요.
            </p>
          </div>

          <button
            onClick={() => setEmailSent(false)}
            className="w-full mb-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            다른 이메일로 시도
          </button>

          <Link
            href="/login"
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">비밀번호 찾기</h1>
          <p className="text-gray-600 mt-2">등록된 이메일을 입력하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 에러 메시지 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
            비밀번호 재설정 링크를 발송해드립니다.
          </div>

          {/* 이메일 입력 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일 주소
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

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? '발송 중...' : '재설정 링크 발송'}
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="mt-6 space-y-3 text-center">
          <div>
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              로그인으로 돌아가기
            </Link>
          </div>
          <div>
            <span className="text-gray-600 text-sm">계정이 없으신가요? </span>
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
