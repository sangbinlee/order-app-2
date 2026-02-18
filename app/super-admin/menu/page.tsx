'use client';

import { useEffect, useState } from 'react';
import api from '@/app/lib/api';

export default function AdminMenuPage() {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const res = await api.get('/api/menus');
    setMenus(res.data);
  };

  const addMenu = async () => {
    try {
      await api.post('/api/menus', newMenu);
      alert('메뉴 추가 완료');
      setNewMenu({ name: '', price: '', category: '' });
      fetchMenus();
    } catch (err) {
      alert('메뉴 추가 실패: ' + err.response?.data?.error || err.message);
    }
  };

  const deleteMenu = async (id) => {
    try {
      await api.delete(`/api/menus/${id}`);
      alert('메뉴 삭제 완료');
      fetchMenus();
    } catch (err) {
      alert('삭제 실패: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">관리자 메뉴 관리</h1>

      {/* 입력 폼 */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="메뉴 이름"
          value={newMenu.name}
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="가격"
          value={newMenu.price}
          onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="카테고리"
          value={newMenu.category}
          onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={addMenu}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          메뉴 추가
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="space-y-4">
        {menus.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">
                {item.name} - {item.price}원
              </p>
              <p className="text-sm text-gray-500">카테고리: {item.category}</p>
            </div>
            <button
              onClick={() => deleteMenu(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
