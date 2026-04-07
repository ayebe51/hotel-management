"use client";
import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMobileMenu } from "@/app/(dashboard)/layout";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const openMenu = useMobileMenu();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={openMenu}
          className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Buka menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm font-semibold text-gray-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-[11px] text-gray-400 hidden sm:block">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
          <Input placeholder="Cari..." className="pl-8 w-48 h-8 text-sm bg-gray-50 border-gray-200 focus:bg-white" />
        </div>
        <button className="relative p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
