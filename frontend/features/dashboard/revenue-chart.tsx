"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatIDR } from "@/lib/utils";

interface RevenueChartProps {
  data: Array<{ month: string; lily: number; tulip: number; melati: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="border-gray-100">
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-800">Tren Revenue Bulanan</CardTitle>
          <span className="text-[11px] text-gray-400">2024</span>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lily" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tulip" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="melati" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => formatIDR(value)}
              contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Area type="monotone" dataKey="lily" stroke="#3b82f6" strokeWidth={2} fill="url(#lily)" dot={false} name="Lily" />
            <Area type="monotone" dataKey="tulip" stroke="#10b981" strokeWidth={2} fill="url(#tulip)" dot={false} name="Tulip" />
            <Area type="monotone" dataKey="melati" stroke="#f59e0b" strokeWidth={2} fill="url(#melati)" dot={false} name="Melati" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
