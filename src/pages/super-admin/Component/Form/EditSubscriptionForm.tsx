/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useUpdateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { ISubscription } from "@/types/subscription";

// Updated type
type TEditSubscriptionFormValues = {
  planName?: string;
  price?: number;
  description?: string;
  billingCycle?: "monthly" | "quarterly" | "yearly";
  maxProducts?: number;
  maxUsers?: number;
  supportLevel?: "basic" | "standard" | "premium";
  features: { value: string }[]; // updated from string[] to object[]
  status?: "active" | "expired" | "cancelled";
};

interface EditSubscriptionFormProps {
  subscription: ISubscription;
  onSuccess: () => void;
}

const EditSubscriptionForm = ({
  subscription,
  onSuccess,
}: EditSubscriptionFormProps) => {
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const form = useForm<TEditSubscriptionFormValues>({
    defaultValues: {
      planName: subscription.planName,
      price: subscription.price,
      description: subscription.description,
      billingCycle: subscription.billingCycle,
      maxProducts: subscription.maxProducts,
      maxUsers: subscription.maxUsers,
      supportLevel: subscription.supportLevel as
        | "basic"
        | "standard"
        | "premium"
        | undefined,
      features:
        subscription.features.length > 0
          ? subscription.features.map((f) => ({ value: f }))
          : [{ value: "" }],
      status: subscription.status,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const onSubmit = async (values: TEditSubscriptionFormValues) => {
    try {
      if (!values.planName?.trim()) {
        toast.error("Plan name is required");
        return;
      }

      if (values.price !== undefined && values.price < 0) {
        toast.error("Price must be a positive number");
        return;
      }

      const filteredFeatures = values.features
        .map((f) => f.value.trim())
        .filter((f) => f !== "");

      const res = await updateSubscription({
        id: subscription._id,
        data: {
          ...values,
          features: filteredFeatures,
        },
      }).unwrap();

      if (res?.statusCode === 200) {
        toast.success("Subscription updated successfully");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="planName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter plan name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billingCycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Cycle</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="maxProducts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Products</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxUsers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Users</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="supportLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select support level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Features</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name={`features.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={`Feature ${index + 1}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length <= 1}
                className="bg-gray-50 border border-gray-300"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ value: "" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Feature
          </Button>
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update Plan
        </Button>
      </form>
    </Form>
  );
};

export default EditSubscriptionForm;
