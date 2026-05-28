import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="admin-section flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-[220px] flex-1 min-h-screen flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
