import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../auth/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/Dashboard";
import DashboardA from "../pages/DashboardA";
import Profile from "../pages/Profile";
import AdminUsers from "../pages/AdminUsers";
import MyTasks from "../components/user/MyTasks";
import CompletedTasks from "../components/user/CompletedTasks";
import Profile2 from "../components/user/Profile";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* <Route
      path="/user"
      element={
        <ProtectedRoute role="user">
          <UserDashboard />
        </ProtectedRoute>
      }
    >
      {/* 👇 CHILD ROUTE  
      <Route path="projects" element={<Projects />} />
      {/* 👇 SINGLE PROJECT (OPEN PROJECT) 
      <Route path="projects/:projectId" element={<ProjectDetails />} />
    </Route> */}

    <Route
      path="/user"
      element={
        <ProtectedRoute role="user">
          <UserLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="userDashboard" element={<UserDashboard />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:projectId" element={<ProjectDetails />} />
      <Route path="profile" element={<Profile />} />
      <Route path="tasks" element={<MyTasks />} />
      <Route path="completed" element={<CompletedTasks />} />
      {/* <Route path="profile2" element={<Profile2 />} /> */}

    </Route>

    <Route
      path="/admin"
      element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }
    >
         <Route path="" element={<DashboardA />} />
        <Route path="profile" element={<Profile />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
        <Route path="users" element={<AdminUsers />} />
    </Route>
  </Routes>
);

export default AppRoutes;
