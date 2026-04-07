import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { mockProperties } from "@/lib/mock-data";
import { FileDown, FileSpreadsheet, FileText } from "lucide-react";

export function ReportsView() {
  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ekspor Laporan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipe Laporan</label>
              <Select className="w-full">
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Format</label>
              <Select className="w-full">
                <option value="excel">Excel (.xlsx)</option>
                <option value="csv">CSV</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Property</label>
              <Select className="w-full">
                <option value="">Semua Property</option>
                {mockProperties.filter(p => p.is_active).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bulan</label>
              <Select className="w-full">
                <option value="4">April 2024</option>
                <option value="3">Maret 2024</option>
                <option value="2">Februari 2024</option>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="gap-2 flex-1">
              <FileSpreadsheet className="w-4 h-4" />
              Unduh Excel
            </Button>
            <Button variant="outline" className="gap-2 flex-1">
              <FileText className="w-4 h-4" />
              Unduh CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview columns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kolom yang Disertakan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {["Tanggal", "Kode Transaksi", "Deskripsi", "Kategori / Tipe", "Jumlah (IDR)", "Status"].map((col) => (
              <div key={col} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                {col}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
