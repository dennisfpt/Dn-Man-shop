import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number";
    if (form.password.length < 6)
      next.password = "Password must be at least 6 characters";
    if (form.confirmPassword !== form.password)
      next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = register(form);
    if (!result.success) {
      setErrors({ email: result.message });
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-10">
        <UserPlus size={28} className="mx-auto text-ink mb-3" />
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="text-stone text-sm mt-2">
          Join <span className="tracking-widest2">DN MAN</span> for faster checkout
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-wide text-stone">Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={handleChange("fullName")}
            placeholder="Nguyen Van A"
            className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
              errors.fullName ? "border-red-500" : "border-ink/20 focus:border-ink"
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-stone">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
              errors.email ? "border-red-500" : "border-ink/20 focus:border-ink"
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-stone">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="09xx xxx xxx"
            className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
              errors.phone ? "border-red-500" : "border-ink/20 focus:border-ink"
            }`}
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-stone">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            placeholder="At least 6 characters"
            className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
              errors.password ? "border-red-500" : "border-ink/20 focus:border-ink"
            }`}
          />
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-stone">Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="Re-enter password"
            className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
              errors.confirmPassword ? "border-red-500" : "border-ink/20 focus:border-ink"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-ink text-cream py-3.5 text-sm uppercase tracking-wide font-medium hover:bg-charcoal transition-colors"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-stone mt-8">
        Already have an account?{" "}
        <Link to="/login" className="text-ink border-b border-ink pb-0.5">
          Sign in
        </Link>
      </p>
    </div>
  );
}
