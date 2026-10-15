import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

const ADMIN_STORAGE_KEY = 'su_admin_mode_active';
const VALID_PINS = ['1789', '12a8', '1234', 'admin123', 'lequangtrung'];

export function AdminProvider({ children, onOpenAdmin }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const saved = sessionStorage.getItem(ADMIN_STORAGE_KEY) || localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('survey'); // 'survey' | 'ai' | 'museum' | 'system'

  const openAdmin = (tab = 'survey') => {
    setAdminActiveTab(tab);
    setIsAdminModalOpen(true);
    if (onOpenAdmin) onOpenAdmin(tab);
  };

  const closeAdmin = () => {
    setIsAdminModalOpen(false);
  };

  const loginAdmin = (pin) => {
    const cleanPin = String(pin || '').trim().toLowerCase();
    if (VALID_PINS.includes(cleanPin)) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {}
  };

  const toggleAdminModal = (tab = 'survey') => {
    if (isAdminModalOpen) {
      closeAdmin();
    } else {
      openAdmin(tab);
    }
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      isAdminModalOpen,
      setIsAdminModalOpen,
      adminActiveTab,
      setAdminActiveTab,
      openAdmin,
      closeAdmin,
      loginAdmin,
      logoutAdmin,
      toggleAdminModal,
      onOpenAdmin: openAdmin
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
