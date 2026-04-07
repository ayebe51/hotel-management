"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { formatIDR } from "@/lib/utils";

const data = [
  { month: "Jan", income: 18800000 },
  { month: "Feb", income: 20100000 },
  { month: "Mar", income: 25200000 },
  { month: "Apr", income: 18700000, current: true },
  { month: "Mei", income: 22800000 },
  { month: "Jun", income: 27400000 },
];

export function IncomeTrendChart() {
  return (
    <Card className="border-gray-100">
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-800">Tren Income Bulanan</CardTitle>
          <span className="text-[11px] text-gray-400">2024</span>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => formatIDR(v)} contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #e5e7eb" }} />
            <Bar dataKey="income" radius={[6, 6, 0, 0]} name="Income">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.current ? "#3b82f6" : "#dbeafe"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
