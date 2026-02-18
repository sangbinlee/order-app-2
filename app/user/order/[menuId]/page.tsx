'use client';

// pages/order.js
import { useParams  } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/app/lib/api';










export default function OrderPage() {
  const { menuId } = useParams(); // ✅ Correct for App Router
  const [menu, setMenu] = useState<any>(null);

    console.log('menuId================',menuId)
  useEffect(() => {
    if (menuId) {
      const fetchMenu = async () => {
        const res = await api.get(`menus/${menuId}`);
        setMenu(res.data);
      };
      fetchMenu();
    }
  }, [menuId]);

  if (!menu) return <p className="p-6">불러오는 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">주문 페이지</h1>
      <p className="text-lg mb-2">{menu.name} - {menu.price}원</p>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => alert(`${menu.name} 주문 완료!`)}
      >
        주문 확정
      </button>
    </div>
  );
}
