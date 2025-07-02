/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useActivateShopMutation,
  useDeleteShopMutation,
} from "@/redux/api/shopApi";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { formatDate } from "../formatDate";

interface ShopsDataTableProps {
  shops: any[];
  isLoading: boolean;
  onEdit: (shopId: string) => void;
}

const ShopsDataTable = ({ shops, isLoading, onEdit }: ShopsDataTableProps) => {
  const [activateShop] = useActivateShopMutation();
  const [deleteShop] = useDeleteShopMutation();
  const [shopToDelete, setShopToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleStatusChange = async (shopId: string) => {
    try {
      const res = await activateShop(shopId).unwrap(); // Add await here
      if (res?.statusCode === 200) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleDeleteClick = (shopId: string) => {
    setShopToDelete(shopId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!shopToDelete) return;

    const promise = deleteShop(shopToDelete).unwrap();

    toast.promise(promise, {
      loading: "Deleting shop...",
      success: "Shop deleted successfully",
      error: "Failed to delete shop",
      finally: () => {
        setIsDeleteDialogOpen(false);
        setShopToDelete(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (shops.length === 0) {
    return <div className="text-center py-8 text-gray-500">No shops found</div>;
  }

  return (
    <>
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Shop Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Subscription Plan</TableHead>
            <TableHead>Subscription End</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop._id}>
              <TableCell className="font-medium">{shop.shopName}</TableCell>
              <TableCell>{shop.shopOwnerName}</TableCell>
              <TableCell>{shop.email}</TableCell>
              <TableCell>{shop.contactNumber}</TableCell>
              <TableCell>
                <Badge
                  variant={shop.status === "active" ? "default" : "destructive"}
                >
                  {shop.status}
                </Badge>
              </TableCell>
              <TableCell>
                {shop.subscriptionPlan ? (
                  <div className="space-y-1">
                    <div className="font-medium">
                      {shop.subscriptionPlan.planName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {shop.subscriptionPlan.billingCycle} • $
                      {shop.subscriptionPlan.price}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Max {shop.subscriptionPlan.maxProducts} products •{" "}
                      {shop.subscriptionPlan.maxUsers} users
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">No subscription</span>
                )}
              </TableCell>
              <TableCell>{formatDate(shop.subscriptionDeadline)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(shop)}
                  aria-label="Edit shop"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStatusChange(shop._id)}
                  disabled={shop.status === "active"}
                  aria-label="Activate shop"
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(shop._id)}
                  aria-label="Delete shop"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              shop and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShopsDataTable;
