import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-10">
        <UserCircle size={44} className="mx-auto text-ink mb-4" />
        <h1 className="text-2xl font-semibold">{user.fullName}</h1>
        <p className="text-stone text-sm mt-1">{user.email}</p>
      </div>

      <div className="border border-ink/10 divide-y divide-ink/10 text-sm">
        <div className="flex justify-between px-5 py-4">
          <span className="text-stone">Full Name</span>
          <span className="font-medium">{user.fullName}</span>
        </div>
        <div className="flex justify-between px-5 py-4">
          <span className="text-stone">Email</span>
          <span className="font-medium">{user.email}</span>
        </div>
        <div className="flex justify-between px-5 py-4">
          <span className="text-stone">Phone</span>
          <span className="font-medium">{user.phone}</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full mt-8 flex items-center justify-center gap-2 border border-ink/20 py-3.5 text-sm uppercase tracking-wide font-medium hover:border-ink transition-colors"
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </div>
  );
}
