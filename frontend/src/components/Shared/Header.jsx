import React, { useState, Fragment } from 'react';
import { HiLightningBolt } from "react-icons/hi";
import { Menu, X, ChevronDown, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/lib/authUtils/AuthProvider';

const Header = ({ isSidebarOpen, isMobileOpen, toggleMobileMenu,toggleSidebar, userData }) => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Course application Submitted',
      message: 'Data Devs application submitted successfuly',
      time: '5 minutes ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Course Complete',
      message: 'You have completed Javascript for beginners',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'System Update',
      message: 'iCourse will undergo maintenance at 2 AM',
      time: '2 hours ago',
      unread: false,
    }
  ];


  const { logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className=" top-0 right-0 z-40 flex h-16 w-screen items-center border-b bg-white px-4 shadow-sm">
      <div className="flex w-full items-center justify-between h-16">
        {/* Left side */}
        <div className="flex items-center ">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center"
        >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center"
        >
          <Menu className="h-5 w-5" />
        </Button>


          <Link to='/' className="flex items-center gap-2 text-gray-900 hover:no-underline">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
              <HiLightningBolt className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">Learning</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications Popover */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button 
                  className={`
                    relative flex h-10 w-10 items-center justify-center rounded-full
                    ${open ? 'bg-gray-100' : 'hover:bg-gray-100'}
                  `}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    2
                  </span>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-50 mt-2 w-[calc(100vw-32px)] max-w-[480px] rounded-lg border bg-white shadow-lg">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Mark all as read
                      </Button>
                    </div>
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex gap-3 px-4 py-3 hover:bg-gray-50 ${
                            notification.unread ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {notification.message}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border-t p-4 text-center">
                      <Button variant="ghost" size="sm" className="text-sm">
                        View all notifications
                      </Button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="items-center gap-2 hidden md:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-medium">
                  U
                </div>
                <span className="hidden text-gray-700 md:block">{userData.name? userData.name : "User Name"}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;