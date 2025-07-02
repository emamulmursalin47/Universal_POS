import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type TVendorStatus = "active" | "inactive";

interface ShopFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: TVendorStatus | "all";
  onStatusFilterChange: (value: TVendorStatus | "all") => void;
}

const ShopFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ShopFiltersProps) => {
  return (
    <div className="flex items-center gap-4">
      <Input
        placeholder="Search shops by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <Select
        value={statusFilter}
        onValueChange={(value: TVendorStatus | "all") =>
          onStatusFilterChange(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShopFilters;
