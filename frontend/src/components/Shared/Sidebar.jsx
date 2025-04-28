import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '@/lib/consts/navigation'
import { useAuth } from '@/lib/authUtils/AuthProvider';

const ResponsiveSidebar = ({ isOpen, isMobileOpen, toggleSidebar, toggleMobileMenu }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>

      {/* Main Sidebar */}
      <Card 
        className={`left-0 h-full bg-white transition-all duration-300 z-40
          fixed md:static
          ${isOpen ? 'w-64' : 'w-16'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        
      >
        <div className="flex flex-col h-full">

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 md:space-y-2 px-2">
              {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} isOpen={isOpen} />
              ))}
            </nav>
          </div>

          {/* Bottom Links */}
          <div className="border-t">
            <nav className="space-y-1 md:space-y-2 px-2 py-4">
              {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} isOpen={isOpen} />
              ))}

              {/* Logout Button */}
              
            <div
                onClick={logout}
                className={'flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-600 text-red-700 hover:bg-gray-50 hover:text-gray-900 hover:no-underline hover:text-red-500 hover:cursor-pointer'}
              >

                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-500`}
                  fill="none"
                  stroke="#dc2626"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                { isOpen && <span className="ml-3">Logout</span>}
              </div>
            
            </nav>
          </div>
        </div>
      </Card>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

const SidebarLink = ({ item, isOpen }) => {
  const { pathname } = useLocation();
  const isActive = pathname === item.path;

  return (
    <Link
      to={item.path}
      className={`flex items-center px-2 py-3 text-sm font-medium rounded-md 
        ${isActive
          ? 'bg-indigo-50 text-indigo-600 hover:no-underline'
          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:no-underline'
        }`}
    >
      {item.icon && (
        <item.icon
          className={`flex-shrink-0 w-5 h-5
            ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}
        />
      )}
      {isOpen && <span className="ml-3 ">{item.label}</span>}
    </Link>
  );
};

export default ResponsiveSidebar;