import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "./formatDate";

interface Shop {
  shopName: string;
  email: string;
  contactNumber: string;
  status: string;
  createdAt: string;
}

interface RecentShopsTableProps {
  shops: Shop[];
}

export const RecentShopsTable = ({ shops }: RecentShopsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Shop Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.map((shop) => (
          <TableRow key={shop.email}>
            <TableCell className="font-medium">{shop.shopName}</TableCell>
            <TableCell>{shop.email}</TableCell>
            <TableCell>{shop.contactNumber}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  shop.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {shop.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              {formatDate(shop.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentShopsTable;
