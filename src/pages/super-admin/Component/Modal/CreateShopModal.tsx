/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCreateShopMutation } from "@/redux/api/shopApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopFormSchema } from "../shopFormSchema";
import { toast } from "sonner";
import ShopForm from "./ShopForm";

interface CreateShopModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateShopModal = ({ open, onClose }: CreateShopModalProps) => {
  const [createShop, { isLoading }] = useCreateShopMutation();

  const form = useForm({
    resolver: zodResolver(shopFormSchema),
    defaultValues: {
      shopName: "",
      shopOwnerName: "",
      email: "",
      password: "",
      contactNumber: "",
      address: "",
      subscriptionPlan: "",
      subscriptionDeadline: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const res = await createShop(values).unwrap();
      if (res?.statusCode === 200) {
        toast.success("Shop created successfully");
        onClose();
        form.reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Shop</DialogTitle>
        </DialogHeader>
        <ShopForm form={form} onSubmit={onSubmit} />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Shop"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShopModal;
