"use client";

import { LuLayoutDashboard } from "react-icons/lu";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <LuLayoutDashboard className="h-6 w-6 text-gray-600" />
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p>1,240 người dùng đã đăng ký</p>

        <p>320 đơn hàng trong tháng này</p>
      </div>
    </div>
  );
}
