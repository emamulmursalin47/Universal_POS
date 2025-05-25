// components/UserSection.tsx

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { UserSectionProps } from '@/types/sidebar';

export function UserSection({ 
  mobile = false, 
  collapsed = false, 
  user, 
  userMenuOpen, 
  setUserMenuOpen, 
  signOut 
}: UserSectionProps) {
  if (!user) return null;

  if (collapsed && !mobile) {
    return (
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
    );
  }

  return (
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
  );
}