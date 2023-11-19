import AdminNavbarRoutes from "@/components/admin-navbar-routes";
import AdminMobileSidebar from "./mobile-sidebar";

const AdminNavbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <AdminMobileSidebar />
      <AdminNavbarRoutes />
    </div>
  );
};

export default AdminNavbar;
