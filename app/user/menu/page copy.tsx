// app/menu/page.tsx
import Link from "next/link";





// TODO ROLE 기반 메뉴 렌더링 (예: customer, admin, superadmin)


// ALTER TABLE users MODIFY role ENUM('customer','admin','superadmin') DEFAULT 'customer';



export default function MenuPage() {
  const role = 'customer'; // TODO 예시로 고정된 역할, 실제로는 로그인한 사용자의 역할을 가져와야 함

  let menuItems  = [];



  if (role==='customer') {
      menuItems = [
        { name: "home", path: "/" },
        { name: "cake", path: "/cake" },
        { name: "음료", path: "/음료" },
      ];

  } else if (role==='admin') {
    
      menuItems = [
        { name: "cake", path: "/cake" },
        { name: "음료", path: "/음료" },
      ];
  } else if (role==='superadmin') {
    
      menuItems = [
        { name: "cake", path: "/cake" },
        { name: "음료", path: "/음료" },
      ];
  } 

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
