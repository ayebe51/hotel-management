"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Calendar, BookOpen, TrendingUp, Receipt,
  Building2, BedDouble, BarChart3, ClipboardList, Users, FileDown, LogOut, X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Kalender Hunian", icon: Calendar },
  { href: "/reservations", label: "Reservasi", icon: BookOpen },
  { href: "/income", label: "Income", icon: TrendingUp },
  { href: "/expenses", label: "Expenses", icon: Receipt },
  { href: "/properties", label: "Property", icon: Building2 },
  { href: "/rooms", label: "Kamar", icon: BedDouble },
  { href: "/occupancy", label: "Performa Hunian", icon: BarChart3 },
  { href: "/reports", label: "Laporan", icon: FileDown },
  { href: "/audit-log", label: "Audit Log", icon: ClipboardList },
  { href: "/users", label: "Manajemen User", icon: Users },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <aside className="h-full w-60 bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
            <BedDouble className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">Hotel Dashboard</p>
            <p className="text-[11px] text-gray-400">Internal System</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Menu</p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  )}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-blue-600" : "text-gray-400")} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
            PH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Pak Hendra</p>
            <p className="text-[11px] text-gray-400">Owner</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Keluar
        </Link>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-60 z-40 shadow-sm">
        {content}
      </div>

      {/* Mobile: overlay drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <div className="lg:hidden fixed left-0 top-0 h-full z-50 shadow-xl">
            {content}
          </div>
        </>
      )}
    </>
  );
}
