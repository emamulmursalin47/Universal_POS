import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShoppingBag, Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface SidebarProps {
  menuItems: MenuItem[];
  title?: string;
  userRole?: string;
}

export function Sidebar({ menuItems, title = "POS System", userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  // Enhanced active route detection
  const isActiveRoute = (path: string) => {
    // Exact match first
    if (path === location.pathname) return true;
    
    // For index/dashboard routes, only match exact paths
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const itemSegments = path.split('/').filter(Boolean);
    
    // Dashboard route handling - only match if segments are exactly the same
    if (pathSegments.length === itemSegments.length) {
      return pathSegments.every((segment, index) => segment === itemSegments[index]);
    }
    
    return false;
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setUserMenuOpen(false); // Close user menu when collapsing
  };

  const SidebarItem = ({ item }: { item: MenuItem }) => {
    const isActive = isActiveRoute(item.path);
    const isDisabled = item.disabled;

    const itemContent = (
      <div className="flex items-center w-full relative">
        <div className="flex-shrink-0 flex items-center justify-center">
          {item.icon}
        </div>
        {!collapsed && (
          <div className="ml-3 flex-1 flex items-center justify-between min-w-0">
            <span className="truncate font-medium">{item.title}</span>
            {item.badge && (
              <Badge 
                variant={isActive ? "secondary" : "outline"} 
                className="ml-2 text-xs shrink-0"
              >
                {item.badge}
              </Badge>
            )}
          </div>
        )}
      </div>
    );

    const baseClassName = cn(
      'flex items-center w-full rounded-lg text-sm transition-all duration-200 relative',
      'hover:bg-accent/80 hover:text-accent-foreground',
      'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-accent/80',
      collapsed ? 'h-10 px-2 justify-center' : 'h-11 px-3 justify-start',
      isActive && [
        'bg-primary text-primary-foreground shadow-sm',
        'hover:bg-primary/90 hover:text-primary-foreground'
      ],
      isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
    );

    if (isDisabled) {
      return (
        <div className={baseClassName}>
          {itemContent}
        </div>
      );
    }

    if (collapsed) {
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to={item.path} className={baseClassName}>
                {itemContent}
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10} className="flex items-center gap-2">
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant="outline" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <NavLink to={item.path} className={baseClassName}>
        {itemContent}
      </NavLink>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col bg-card/95 backdrop-blur-sm border-r border-border/60 h-screen shadow-lg transition-all duration-300 ease-in-out relative',
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
          variant="ghost"
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
      <ScrollArea className="flex-1 py-4">
        <nav className={cn("space-y-1", collapsed ? "px-2" : "px-3")}>
          {menuItems.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </nav>
      </ScrollArea>

      {/* User Section */}
      {user && (
        <>
          <Separator className="opacity-60" />
          <div className={cn("p-3 bg-gradient-to-t from-card/50 to-transparent", collapsed && "px-2")}>
            {collapsed ? (
              // Collapsed user section
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-10 p-0 hover:bg-accent rounded-lg"
                      >
                        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                      </Button>
                      <Separator className="my-2 opacity-60" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={signOut}
                        className="w-full h-9 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    <div className="text-sm">
                      <p className="font-medium">{user.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              // Expanded user section
              <div className="space-y-3">
                <div 
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg bg-accent/30 cursor-pointer hover:bg-accent/50 transition-colors",
                    userMenuOpen && "bg-accent/50"
                  )}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-sm">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    userMenuOpen && "rotate-180"
                  )} />
                </div>
                
                {userMenuOpen && (
                  <div className="space-y-1 pl-2">
                    <Button
                      variant="ghost"
                      onClick={signOut}
                      className="w-full justify-start h-9 text-sm hover:bg-destructive/10 hover:text-destructive rounded-lg"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}