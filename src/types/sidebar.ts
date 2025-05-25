/* eslint-disable @typescript-eslint/no-explicit-any */
// types/sidebar.ts

export interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarProps {
  menuItems: MenuItem[];
  title?: string;
  userRole?: string;
}

export interface SidebarItemProps {
  item: MenuItem;
  mobile?: boolean;
  collapsed?: boolean;
  isActiveRoute: (path: string) => boolean;
}

export interface UserSectionProps {
  mobile?: boolean;
  collapsed?: boolean;
  user: any;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  signOut: () => void;
}