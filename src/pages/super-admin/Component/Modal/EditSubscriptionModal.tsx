import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ISubscription } from "@/types/subscription";
import EditSubscriptionForm from "../Form/EditSubscriptionForm";

interface EditSubscriptionModalProps {
  subscription: ISubscription;
  open: boolean;
  onClose: () => void;
}

const EditSubscriptionModal = ({
  subscription,
  open,
  onClose,
}: EditSubscriptionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <EditSubscriptionForm subscription={subscription} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditSubscriptionModal;
