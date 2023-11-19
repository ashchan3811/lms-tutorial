"use client";

import AdminSidebarItem from "./sidebar-item";

import { LayoutDashboard, List, PersonStandingIcon } from "lucide-react";

const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Home Page",
    href: "/",
  },
  {
    icon: PersonStandingIcon,
    label: "Teachers",
    href: "/admin/teacher",
  },
  {
    icon: List,
    label: "Categories",
    href: "/admin/category",
  },
];

const AdminSidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {adminRoutes.map((route) => (
        <AdminSidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default AdminSidebarRoutes;
