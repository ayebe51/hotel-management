"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatIDR } from "@/lib/utils";

const data = [
  { name: "Lily", value: 2300000, color: "#3b82f6" },
  { name: "Tulip", value: 1050000, color: "#10b981" },
  { name: "Melati", value: 2000000, color: "#f59e0b" },
];

const byCategory = [
  { name: "Maintenance", value: 3500000, color: "#f59e0b" },
  { name: "Operasional", value: 1850000, color: "#3b82f6" },
];

export function ExpenseBreakdownChart() {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <Card className="border-gray-100">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-sm font-semibold text-gray-800">Breakdown Expenses</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={byCategory} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
              {byCategory.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => formatIDR(v)} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2 mt-2">
          {byCategory.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
              <span className="text-xs font-medium text-gray-800">{formatIDR(item.value)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-700">Total</span>
            <span className="text-xs font-bold text-gray-900">{formatIDR(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
