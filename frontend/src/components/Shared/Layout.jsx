import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ResponsiveSidebar from "./Sidebar";

const Layout = () => {
  // State management
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    isMobileOpen: false
  });
  
  const [authState, setAuthState] = useState({
    userData: null,
    error: null,
    loading: true
  });

  // Toggle handlers
  const toggleSidebar = () => {
    setSidebarState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  };

  const toggleMobileMenu = () => {
    setSidebarState(prev => ({
      ...prev,
      isMobileOpen: !prev.isMobileOpen
    }));
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          throw new Error("User is not authenticated");
        }

        const response = await fetch("http://localhost:3000/user", {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAuthState(prev => ({
          ...prev,
          userData: data,
          loading: false
        }));

      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthState(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }));
      }
    };

    fetchUserData();
  }, []);

  // Loading state
  if (authState.loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Error state
  if (authState.error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">Error: {authState.error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="flex flex-col w-full">
        <Header
          isSidebarOpen={sidebarState.isOpen}
          isMobileOpen={sidebarState.isMobileOpen}
          toggleMobileMenu={toggleMobileMenu}
          toggleSidebar={toggleSidebar}
          userData={authState.userData}
        />
        
        <div className="flex flex-1 min-h-0">
          <div className="h-full">
            <ResponsiveSidebar
              isOpen={sidebarState.isOpen}
              isMobileOpen={sidebarState.isMobileOpen}
              toggleSidebar={toggleSidebar}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
          
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet context={authState} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;