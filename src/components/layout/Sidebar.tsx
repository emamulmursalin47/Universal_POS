/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ResponsiveSidebar.tsx

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { SidebarProps } from "@/types/sidebar";
import { DesktopSidebar } from "../sidebar/DesktopSidebar";
import { useAppSelector } from "@/redux/hook";

export function Sidebar({ menuItems, title = "POS System" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Enhanced active route detection
  const isActiveRoute = (path: string) => {
    if (path === location.pathname) return true;

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const itemSegments = path.split("/").filter(Boolean);

    if (pathSegments.length === itemSegments.length) {
      return pathSegments.every(
        (segment, index) => segment === itemSegments[index]
      );
    }

    return false;
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken"); // Clear token
    navigate("/login"); // Redirect to login route
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopSidebar
        menuItems={menuItems}
        title={title}
        userRole={user?.role}
        collapsed={collapsed}
        user={user}
        setCollapsed={setCollapsed}
        isActiveRoute={isActiveRoute}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        signOut={handleSignOut}
      />
    </>
  );
}
