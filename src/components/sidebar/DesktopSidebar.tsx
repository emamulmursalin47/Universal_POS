/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DesktopSidebar.tsx

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingBag, 
  Menu, 
  X
} from 'lucide-react';

import { UserSection } from './UserSection';
import { SidebarProps } from '@/types/sidebar';
import { SidebarItem } from './SidebarItems';

interface DesktopSidebarProps extends SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isActiveRoute: (path: string) => boolean;
  user?: any;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  signOut: () => void;
}

export function DesktopSidebar({ 
  menuItems, 
  title = "POS System", 
  userRole,
  collapsed,
  setCollapsed,
  isActiveRoute,
  user,
  userMenuOpen,
  setUserMenuOpen,
  signOut
}: DesktopSidebarProps) {
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setUserMenuOpen(false);
  };

  
  return (
    <div
      className={cn(
        'hidden lg:flex flex-col bg-card/95 backdrop-blur-sm border-r border-border/60 h-screen shadow-lg transition-all duration-300 ease-in-out relative',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/60 bg-gradient-to-r from-card to-card/80">
        <div className="flex items-center min-w-0 flex-1">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <ShoppingBag className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          {!collapsed && (
            <div className="ml-3 min-w-0 flex-1">
              <h1 className="font-bold text-lg text-foreground truncate">
                {title}
              </h1>
              {userRole && (
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {userRole}
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Toggle Button */}
        <Button
          variant="default"
          size="sm"
          onClick={handleToggleCollapse}
          className="h-8 w-8 p-0 hover:bg-accent rounded-md transition-all duration-200 flex-shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 mt-2 py-4">
        <nav className={cn("space-y-1", collapsed ? "px-2" : "px-3")}>
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.path} 
              item={item}
              collapsed={collapsed}
              isActiveRoute={isActiveRoute}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* User Section */}
      {user && (
        <>
          <Separator className="opacity-60" />
          <div className={cn("p-3 bg-gradient-to-t from-card/50 to-transparent", collapsed && "px-2")}>
            <UserSection 
              collapsed={collapsed}
              user={user}
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
              signOut={signOut}
            />
          </div>
        </>
      )}
    </div>
  );
}