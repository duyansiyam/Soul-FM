import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0f1420]">
      <AdminSidebar />
      <main className="ml-56 min-h-screen">
        {children}
      </main>
    </div>
  )
}