// 'use client';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

    // TODO  JWT, 세션, 또는 NextAuth 같은 라이브러리의 세션을 확인

    // const token = localStorage.getItem('token');
    const token = req.cookies.get('token'); // 로그인 상태를 쿠키/세션으로 확인

    console.log(' xxx token 체크 token=', token   );
    if (req.nextUrl.pathname === '/') {
        if (token) {

            // 로그인 상태이면 /menu로 리다이렉트
            // return NextResponse.redirect(new URL('/menu', req.url));
        }
    }
    else {
        
        if (!token) {
            // 로그인 상태가 아니면 /login로 리다이렉트
            // return NextResponse.redirect(new URL('/', req.url));
        }
    }

  return NextResponse.next();
}
