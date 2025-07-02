import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
interface DashboardCardProps {
  title: string;
  value?: number;
  icon: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  isLoading,
  className = "",
}: DashboardCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-3/4" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
