import Link from "next/link";
import { BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <BedDouble className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold">Hotel Dashboard</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Kelola properti Anda<br />dari satu tempat
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
            Sistem internal manajemen properti untuk memantau reservasi, hunian, pendapatan, dan pengeluaran secara real-time.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: "Reservasi Aktif", value: "12" },
              { label: "Occupancy Rate", value: "68%" },
              { label: "Revenue Bulan Ini", value: "18.7jt" },
              { label: "Total Property", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-300 text-xs">© 2024 Hotel Dashboard · Internal System</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BedDouble className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Hotel Dashboard</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Selamat datang</h1>
          <p className="text-sm text-gray-500 mb-8">Masuk ke sistem manajemen properti</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <Input type="email" placeholder="email@hotel.com" defaultValue="hendra@lily.com" className="h-10" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Lupa password?</a>
              </div>
              <Input type="password" placeholder="••••••••" defaultValue="password" className="h-10" />
            </div>

            <Link href="/">
              <Button className="w-full h-10 mt-2">Masuk</Button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-3 font-medium">Demo akun tersedia:</p>
            <div className="space-y-2">
              {[
                { role: "Owner", email: "hendra@lily.com", color: "bg-violet-50 border-violet-100 text-violet-700" },
                { role: "Admin", email: "budi@lily.com", color: "bg-blue-50 border-blue-100 text-blue-700" },
                { role: "Finance", email: "rini@lily.com", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
              ].map((acc) => (
                <div key={acc.role} className={`flex justify-between items-center rounded-lg px-3 py-2 border text-xs ${acc.color}`}>
                  <span className="font-semibold">{acc.role}</span>
                  <span className="opacity-70">{acc.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
