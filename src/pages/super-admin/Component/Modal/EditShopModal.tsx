/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useEditShopMutation } from "@/redux/api/shopApi";
import { editShopValidationSchema } from "../shopFormSchema";
import { toast } from "sonner";
import EditShopForm from "../Form/EditShopForm";

interface EditShopModalProps {
  shop: any;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditShopModal = ({
  shop,
  open,
  onClose,
  onSuccess,
}: EditShopModalProps) => {
  const [editShop, { isLoading }] = useEditShopMutation();

  const form = useForm({
    resolver: zodResolver(editShopValidationSchema),
    defaultValues: {
      shopOwnerName: "",
      email: "",
      contactNumber: "",
      address: "",
      subscriptionPlan: "",
      subscriptionDeadline: "",
    },
  });

  useEffect(() => {
    if (shop) {
      form.reset({
        shopOwnerName: shop.shopOwnerName,
        email: shop.email,
        contactNumber: shop.contactNumber,
        address: shop.address,
        subscriptionPlan: shop.subscriptionPlan?._id,
        subscriptionDeadline: shop.subscriptionDeadline
          ? new Date(shop.subscriptionDeadline).toISOString().split("T")[0]
          : "",
      });
    }
  }, [shop, form]);

  const onSubmit = async (values: any) => {
    try {
      const res = await editShop({ id: shop._id, data: values }).unwrap();
      toast.success(res?.message || "Shop updated successfully");
      onClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Shop: {shop?.shopName}</DialogTitle>
        </DialogHeader>
        <EditShopForm
          form={form}
          onSubmit={onSubmit}
          shopName={shop?.shopName || ""}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditShopModal;
