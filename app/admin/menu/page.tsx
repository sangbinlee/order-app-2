'use client';

import { useEffect, useState } from 'react';
import api from '@/app/lib/api';

export default function AdminMenuPage() {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({ name: '', price: '', category: '' });
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const [isSlideshow, setIsSlideshow] = useState(false);


const [slideshowInterval, setSlideshowInterval] = useState(3000); // 기본 3초



  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    // 키보드 이벤트 등록
    const handleKeyDown = (e) => {
      if (modalImageIndex !== null) {
        if (e.key === 'ArrowLeft') {
          showPrevImage();
        } else if (e.key === 'ArrowRight') {
          showNextImage();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImageIndex]);

  useEffect(() => {
    // 자동 슬라이드 쇼
    let interval;
    if (isSlideshow && modalImageIndex !== null) {
      interval = setInterval(() => {
        showNextImage();
      }, slideshowInterval); // 3초마다 다음 이미지
    }
    return () => clearInterval(interval);
  }, [isSlideshow, modalImageIndex, slideshowInterval]);

  const fetchMenus = async () => {
    const res = await api.get('menus');
    setMenus(res.data);
  };

  const addMenu = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newMenu.name);
      formData.append('price', newMenu.price);
      formData.append('category', newMenu.category);

      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      await api.post('menus', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('메뉴 추가 완료');
      setNewMenu({ name: '', price: '', category: '' });
      setImageFiles([]);
      setPreviewUrls([]);
      fetchMenus();
    } catch (err) {
      alert('메뉴 추가 실패: ' + (err.response?.data?.error || err.message));
    }
  };

  const deleteMenu = async (id) => {
    try {
      await api.delete(`menus/${id}`);
      alert('메뉴 삭제 완료');
      fetchMenus();
    } catch (err) {
      alert('삭제 실패: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const closeModal = () => {
    setModalImageIndex(null);
    setIsSlideshow(false);
  };

  const showPrevImage = () => {
    if (modalImageIndex > 0) {
      setModalImageIndex(modalImageIndex - 1);
    }
  };

  const showNextImage = () => {
    if (modalImageIndex < previewUrls.length - 1) {
      setModalImageIndex(modalImageIndex + 1);
    } else {
      setModalImageIndex(0); // 마지막에서 다시 처음으로
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
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* 이미지 미리보기 */}
        {previewUrls.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">이미지 미리보기:</p>
            <div className="flex flex-wrap gap-2">
              {previewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  className="w-32 h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                  onClick={() => setModalImageIndex(idx)}
                />
              ))}
            </div>
          </div>
        )}

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
              {item.images &&
                item.images.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`${item.name}-${idx}`}
                    className="mt-2 w-32 h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                    onClick={() => setModalImageIndex(idx)}
                  />
                ))}
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

      {/* 모달 */}
     {modalImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative flex items-center"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
            {/* 이전 버튼 */}
            <button
              className="absolute left-0 ml-4 text-white text-3xl hover:text-gray-300"
              onClick={showPrevImage}
            >
              ‹
            </button>

            {/* 이미지 */}
            <img
              src={previewUrls[modalImageIndex]}
              alt="modal"
              className="max-w-full max-h-[90vh] rounded shadow-lg"
            />

            {/* 닫기 버튼 */}
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 shadow hover:bg-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* 다음 버튼 */}
            <button
              className="absolute right-0 mr-4 text-white text-3xl hover:text-gray-300"
              onClick={showNextImage}
            >
              ›
            </button>

            {/* 슬라이드 쇼 간격 선택 */}
            <div className="absolute bottom-2 left-2 bg-white text-black rounded px-3 py-1 shadow">
              <label className="mr-2">간격:</label>
              <select
                value={slideshowInterval}
                onChange={(e) => setSlideshowInterval(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                <option value={2000}>2초</option>
                <option value={3000}>3초</option>
                <option value={5000}>5초</option>
              </select>
            </div>

            {/* 슬라이드 쇼 토글 버튼 */}
            <button
              className="absolute bottom-2 right-2 bg-white text-black rounded px-3 py-1 shadow hover:bg-gray-200"
              onClick={() => setIsSlideshow(!isSlideshow)}
            >
              {isSlideshow ? '슬라이드 쇼 중지' : '슬라이드 쇼 시작'}
            </button>



          </div>








        </div>
      )}
    </div>
  );
}