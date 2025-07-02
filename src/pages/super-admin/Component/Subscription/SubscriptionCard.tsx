/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Check } from "lucide-react";
import { ISubscription } from "@/types/subscription";

interface SubscriptionCardProps {
  subscription: ISubscription;
  onEdit: () => void;
  onDelete: () => void;
}

const SubscriptionCard = ({
  subscription,
  onEdit,
  onDelete,
}: SubscriptionCardProps) => {
  const getStatusColor = (status: any) => {
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full">
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
        {/* Gradient background accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(
              subscription.status
            )} shadow-lg`}
          ></div>
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {subscription.planName}
              </h3>
              <Badge
                variant={
                  subscription.status === "active" ? "default" : "secondary"
                }
                className={`${
                  subscription.status === "active"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                    : "bg-gray-100 text-gray-800"
                } font-medium px-3 py-1 rounded-full text-xs uppercase tracking-wide`}
              >
                {subscription.status}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {subscription.description}
            </p>
          </div>

          {/* Price section */}
          <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                ${subscription.price}
              </span>
              <span className="text-gray-600 font-medium">
                / {subscription.billingCycle}
              </span>
            </div>
          </div>

          {/* Limits section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
              Usage Limits
            </h4>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">
                  {subscription.maxProducts}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">
                  Products
                </div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">
                  {subscription.maxUsers}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">
                  Users
                </div>
              </div>
            </div>
          </div>

          {/* Features section */}
          {subscription.features && subscription.features.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                Features
              </h4>
              <div className="space-y-2">
                {subscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1 h-10 font-medium hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="h-10 px-4 font-medium hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
