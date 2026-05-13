import { createContext, useContext, useEffect, useState } from "react";

const ClientAuthContext = createContext(null);
const STORAGE_KEY = "orbito_users";
const SESSION_KEY = "orbito_session";

const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const ClientAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const register = ({ name, email, password }) => {
    const users = loadUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=151717&textColor=F1F1F1`,
      createdAt: new Date().toISOString(),
      phone: "",
      bio: "",
      location: "",
      favorites: [],
    };
    saveUsers([...users, newUser]);
    const session = { ...newUser };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const signIn = ({ email, password }) => {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error("Invalid email or password.");
    const session = { ...found };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const updateProfile = (patch) => {
    if (!user) return;
    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return;
    users[idx] = { ...users[idx], ...patch };
    saveUsers(users);
    const session = { ...users[idx] };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  const toggleFavorite = (key) => {
    if (!user) return false;
    const favs = new Set(user.favorites || []);
    if (favs.has(key)) favs.delete(key);
    else favs.add(key);
    updateProfile({ favorites: Array.from(favs) });
    return favs.has(key);
  };

  return (
    <ClientAuthContext.Provider
      value={{ user, ready, register, signIn, signOut, updateProfile, toggleFavorite }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => {
  const ctx = useContext(ClientAuthContext);
  if (!ctx) throw new Error("useClientAuth must be used inside ClientAuthProvider");
  return ctx;
};
