"use client";
import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Desktop offset */}
      <main className="flex-1 min-h-screen lg:ml-60 w-full min-w-0">
        {/* Pass toggle to children via context would be ideal, but for mockup we clone */}
        <div data-sidebar-toggle="true" className="hidden" onClick={() => setSidebarOpen(true)} />
        {/* We inject the toggle via a wrapper that children can use */}
        <MobileMenuProvider onOpen={() => setSidebarOpen(true)}>
          {children}
        </MobileMenuProvider>
      </main>
    </div>
  );
}

// Simple context to pass hamburger handler down to Topbar
import { createContext, useContext } from "react";

const MobileMenuContext = createContext<() => void>(() => {});
export const useMobileMenu = () => useContext(MobileMenuContext);

function MobileMenuProvider({ children, onOpen }: { children: React.ReactNode; onOpen: () => void }) {
  return (
    <MobileMenuContext.Provider value={onOpen}>
      {children}
    </MobileMenuContext.Provider>
  );
}
