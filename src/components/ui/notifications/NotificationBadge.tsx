import { Badge } from '@/components/ui/badge';

interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <Badge
      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
      variant="destructive"
    >
      {count > 99 ? '99+' : count}
    </Badge>
  );
}