// components/SidebarItem.tsx

import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SidebarItemProps } from '@/types/sidebar';

export function SidebarItem({ item, mobile = false, collapsed = false, isActiveRoute }: SidebarItemProps) {
  const isActive = isActiveRoute(item.path);
  const isDisabled = item.disabled;

  const itemContent = (
    <div className="flex items-center w-full relative">
      <div className="flex-shrink-0 flex items-center justify-center">
        {item.icon}
      </div>
      {(!collapsed || mobile) && (
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
    mobile 
      ? 'h-11 px-3 justify-start'
      : collapsed 
        ? 'h-10 px-2 justify-center'
        : 'h-11 px-3 justify-start',
    // Fixed active state styling - choose one of these options:
    
    // Option 1: Subtle highlight (recommended)
    isActive && [
      'bg-primary/10 text-primary border-l-4 border-primary shadow-sm',
      'hover:bg-primary/20 hover:text-primary'
    ],
    
    // Option 2: If you want the primary background with white text
    // isActive && [
    //   'bg-primary text-primary-foreground shadow-sm',
    //   'hover:bg-primary/90 hover:text-primary-foreground'
    // ],
    
    // Option 3: Accent-based highlighting
    // isActive && [
    //   'bg-accent text-accent-foreground border-l-4 border-primary shadow-sm',
    //   'hover:bg-accent/90 hover:text-accent-foreground'
    // ],
    
    isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
  );

  if (isDisabled) {
    return (
      <div className={baseClassName}>
        {itemContent}
      </div>
    );
  }

  if (collapsed && !mobile) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink to={item.path} className={baseClassName}>
              {itemContent}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="flex items-center gap-2">
            <span>{item.title}sss</span>
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
}