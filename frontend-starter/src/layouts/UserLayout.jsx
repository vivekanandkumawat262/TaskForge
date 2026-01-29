import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      {/* Header / Sidebar */}
      <header className="bg-white shadow p-4">User Dashboard</header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
