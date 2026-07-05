import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "dnman_users"; // mock "database" of registered users
const SESSION_KEY = "dnman_session"; // currently logged-in user id

// ---- localStorage helpers -------------------------------------------
// NOTE: This is a frontend-only demo auth system. Passwords are stored
// in plain text in localStorage purely for prototyping — never do this
// in a real app. Replace with a real backend + hashed passwords + JWT
// (or a service like Firebase Auth / Supabase Auth) for production.

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(user) {
  if (!user) return null;
  const { password, ...publicUser } = user;
  return publicUser;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on first load
  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const match = readUsers().find((u) => u.id === sessionId);
      if (match) setUser(toPublicUser(match));
    }
    setLoading(false);
  }, []);

  const register = ({ fullName, email, phone, password }) => {
    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      return { success: false, message: "This email is already registered." };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password, // plain text — demo only, see note above
      createdAt: new Date().toISOString(),
    };

    writeUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, newUser.id);
    setUser(toPublicUser(newUser));

    return { success: true };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const match = readUsers().find(
      (u) => u.email === normalizedEmail && u.password === password
    );

    if (!match) {
      return { success: false, message: "Incorrect email or password." };
    }

    localStorage.setItem(SESSION_KEY, match.id);
    setUser(toPublicUser(match));
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
