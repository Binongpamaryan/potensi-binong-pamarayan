"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Store, Menu, X, Home, Settings, LogOut, Mail } from "lucide-react";
import { Button } from "../ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Kelola Potensi", href: "/admin/kelola", icon: Store },
  { name: "Pesan Kontak", href: "/admin/kontak", icon: Mail },
  { name: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
];

export default function SidebarAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 z-50">
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div
            className={`fixed inset-y-0 left-0 flex w-64 max-w-full flex-col bg-white shadow-lg transform transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const isActive =
                  (item.href === "/admin/kelola" &&
                    (pathname === "/admin/kelola" ||
                      pathname === "/admin/ajukan")) ||
                  pathname === item.href;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      router.push(item.href);
                      setSidebarOpen(false);
                    }}
                    className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-blue-100 text-blue-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    style={{ fontSize: "15px" }}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                style={{ fontSize: "15px" }}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive =
                (item.href === "/admin/kelola" &&
                  (pathname === "/admin/kelola" ||
                    pathname === "/admin/ajukan" ||
                    pathname.startsWith("/admin/kelola/"))) ||
                pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`group flex w-full cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  style={{ fontSize: "15px" }}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                  {item.name}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full flex cursor-pointer items-center px-2 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 rounded-md"
              style={{ fontSize: "15px" }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
