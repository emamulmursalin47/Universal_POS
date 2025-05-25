/* eslint-disable @typescript-eslint/no-explicit-any */
// components/MobileAppBar.tsx

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 

  Bell,

  User,

  MoreHorizontal
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarItem } from './SidebarItems';
import { UserSection } from './UserSection';
import { SidebarProps } from '@/types/sidebar';

interface MobileAppBarProps extends SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isActiveRoute: (path: string) => boolean;
  user: any;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  signOut: () => void;
}

export function MobileAppBar({ 
  menuItems, 
  title = "POS System", 
  userRole,
  mobileMenuOpen,
  setMobileMenuOpen,
  isActiveRoute,
  user,
  userMenuOpen,
  setUserMenuOpen,
  signOut
}: MobileAppBarProps) {
  // Get primary navigation items (first 4 items)
  const primaryItems = menuItems.slice(0, 4);
  const hasMoreItems = menuItems.length > 4;

  const BottomNavItem = ({ item, isMore = false }: { item: any; isMore?: boolean }) => {
    const isActive = isMore ? false : isActiveRoute(item.path);
    
    const itemContent = (
      <div className="flex flex-col items-center justify-center min-h-[56px] px-2">
        <div className={cn(
          "flex items-center justify-center w-6 h-6 mb-1 relative",
          isActive ? "text-primary" : "text-muted-foreground"
        )}>
          {item.icon}
          {item.badge && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center min-w-[16px]"
            >
              {item.badge}
            </Badge>
          )}
        </div>
        <span className={cn(
          "text-xs font-medium truncate max-w-full",
          isActive ? "text-primary" : "text-muted-foreground"
        )}>
          {item.title}
        </span>
      </div>
    );

    if (isMore) {
      return (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="flex-1 flex flex-col items-center justify-center min-h-[56px] px-2 hover:bg-accent/50 transition-colors">
              {itemContent}
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] p-0">
            <div className="flex flex-col h-full bg-card">
              {/* Sheet Header */}
              <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                    <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-foreground">{title}</h1>
                    {userRole && (
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        {userRole}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* All Navigation Items */}
              <ScrollArea className="flex-1 py-4">
                <nav className="space-y-1 px-3">
                  {menuItems.map((navItem) => (
                    <SidebarItem 
                      key={navItem.path} 
                      item={navItem} 
                      mobile={true}
                      isActiveRoute={isActiveRoute}
                    />
                  ))}
                </nav>
              </ScrollArea>

              {/* User Section */}
              <div className="border-t border-border/60 p-3">
                <UserSection 
                  mobile={true}
                  user={user}
                  userMenuOpen={userMenuOpen}
                  setUserMenuOpen={setUserMenuOpen}
                  signOut={signOut}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <NavLink 
        to={item.path} 
        className="flex-1 flex flex-col items-center justify-center min-h-[56px] px-2 hover:bg-accent/50 transition-colors"
      >
        {itemContent}
      </NavLink>
    );
  };

  return (
    <>
      {/* Top Header for Mobile (Optional - can be removed if not needed) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-card/95 backdrop-blur-sm border-b border-border/60 shadow-sm">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="font-bold text-lg text-foreground">{title}</h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-1.5 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
            </Button>
            
            {user && (
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-sm">
                <User className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border/60 shadow-lg">
        <div className="flex items-center justify-around safe-area-pb">
          {/* Primary Navigation Items */}
          {primaryItems.map((item) => (
            <BottomNavItem key={item.path} item={item} />
          ))}
          
          {/* More Menu (if there are more than 4 items) */}
          {hasMoreItems && (
            <BottomNavItem 
              item={{
                title: 'More',
                icon: <MoreHorizontal className="h-5 w-5" />,
                path: '#'
              }}
              isMore={true}
            />
          )}
        </div>
      </div>

      {/* Content spacers */}
      <div className="lg:hidden h-14" /> {/* Top spacer */}
      <div className="lg:hidden h-16" /> {/* Bottom spacer */}
    </>
  );
}