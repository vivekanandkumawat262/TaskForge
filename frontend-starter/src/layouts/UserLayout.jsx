// src/pages/user/UserLayout.jsx
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";

export default function UserLayout() {
  return (
    <div className="flex bg-gray-50 min-w-screen min-h-screen">
      <UserSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
