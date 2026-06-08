import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="ml-[240px] min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  )
}