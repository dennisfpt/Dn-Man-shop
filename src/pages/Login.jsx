import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-10">
        <LogIn size={28} className="mx-auto text-ink mb-3" />
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <p className="text-stone text-sm mt-2">
          Welcome back to <span className="tracking-widest2">DN MAN</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-wide text-stone">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            className="w-full mt-1.5 bg-transparent border-b border-ink/20 focus:border-ink py-2 text-sm outline-none placeholder:text-stone/60"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-stone">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={handleChange("password")}
            placeholder="••••••••"
            className="w-full mt-1.5 bg-transparent border-b border-ink/20 focus:border-ink py-2 text-sm outline-none placeholder:text-stone/60"
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-ink text-cream py-3.5 text-sm uppercase tracking-wide font-medium hover:bg-charcoal transition-colors"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-stone mt-8">
        Don't have an account?{" "}
        <Link to="/register" className="text-ink border-b border-ink pb-0.5">
          Create one
        </Link>
      </p>
    </div>
  );
}
