"use client";

import { useRouter } from "next/navigation";

export default function MainLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/"); // Redirect to the login page or home page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">My Application</h1>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </header>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
