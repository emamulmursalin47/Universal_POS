// src/app/(dashboard)/admin/subscriptions/components/CreateSubscriptionModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateSubscriptionForm from "../Form/CreateSubscriptionForm";

interface CreateSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateSubscriptionModal = ({
  open,
  onClose,
}: CreateSubscriptionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Subscription Plan</DialogTitle>
        </DialogHeader>
        <CreateSubscriptionForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubscriptionModal;
