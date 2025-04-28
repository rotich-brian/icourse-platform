import { 
  HiOutlineViewGrid,
  HiAcademicCap,
  HiChartBar,
  HiCalendar,
  HiDocumentText,
  HiCog,
  HiUser            
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: HiOutlineViewGrid,
  },
  {
    key: 'courses',
    label: 'Courses',
    path: '/dashboard/courses',
    icon: HiAcademicCap,
  },
  {
    key: 'progress',
    label: 'Progress',
    path: '/dashboard/progress',
    icon: HiChartBar,
  },
  {
    key: 'events',
    label: 'Events',
    path: '/dashboard/events',
    icon: HiCalendar,
  },
  {
    key: 'resources',
    label: 'Resources',
    path: '/dashboard/resources',
    icon: HiDocumentText,
  }
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '/dashboard/settings',
    icon: HiCog,
  },
  {
    key: 'profile',
    label: 'Profile',
    path: '/dashboard/profile',
    icon: HiUser,
  }
];