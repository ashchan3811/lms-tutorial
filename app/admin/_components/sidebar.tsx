"use client";

import Logo from "@/components/logo";
import AdminSidebarRoutes from "./sidebar-routes";

const AdminSidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <AdminSidebarRoutes />
      </div>
    </div>
  );
};

export default AdminSidebar;
