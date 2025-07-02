/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { useDeleteSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { toast } from "sonner";
import { ISubscription } from "@/types/subscription";

interface DeleteSubscriptionModalProps {
  subscription: ISubscription;
  open: boolean;
  onClose: () => void;
}

const DeleteSubscriptionModal = ({
  subscription,
  open,
  onClose,
}: DeleteSubscriptionModalProps) => {
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteSubscription(subscription._id).unwrap();
      if (res?.statusCode === 200) {
        toast.success("Subscription plan deleted successfully");
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete subscription plan");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the "
            {subscription.planName}" subscription plan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSubscriptionModal;
