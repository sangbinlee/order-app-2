'use client';

// pages/menu.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api, { apiFetch } from '@/app/lib/api';

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMenus = async () => {
      console.log(1111)
      // const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/menus`); // Next.js API route or backend endpoint
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/menus`); // Next.js API route or backend endpoint
      setMenus(res.data);

      // const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menus`); 
      // const res2 = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menus`); 
      // const menus2 = await res2.json();
      // console.log('Fetched menus from fetch:', menus2);
    };
    fetchMenus();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">메뉴 목록</h1>

      {/* 홈 버튼 */}
      <button
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={() => router.push('/user')}
      >
        홈으로
      </button>

      <ul className="space-y-4">
        {menus.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium">
              {item.name} - {item.price}원
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => router.push(`/user/order/${item.id}`)}
            >
              주문하기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
