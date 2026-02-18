// app/menu/page.tsx
import Link from "next/link";

export default function MenuPage() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

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
