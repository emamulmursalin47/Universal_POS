/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useGetAllSubscriptionsQuery } from "@/redux/api/subscriptionApi";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchAndFilter from "./Component/Subscription/SubscriptionSearchAndFilter";
import SubscriptionCard from "./Component/Subscription/SubscriptionCard";
import Pagination from "@/components/shared/Pagination";
import CreateSubscriptionModal from "./Component/Modal/CreateSubscriptionModal";
import EditSubscriptionModal from "./Component/Modal/EditSubscriptionModal";
import DeleteSubscriptionModal from "./Component/Modal/DeleteSubscriptionModal";

const SubscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  const { data, isLoading, isError } = useGetAllSubscriptionsQuery({
    searchTerm,
    status: statusFilter,
    page,
    limit: 10,
  });

  const subscriptions = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0 };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page on new search
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status === "all" ? "" : status);
    setPage(1);
  };

  if (isError) {
    return <div>Error loading subscriptions</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
      </div>

      <SearchAndFilter
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        currentStatus={statusFilter}
      />

      <div className="grid gap-6 mt-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No subscription plans found
          </div>
        ) : (
          subscriptions.map((subscription: any) => (
            <div className="grid grid-cols-3 gap-6">
              <SubscriptionCard
                key={subscription._id}
                subscription={subscription}
                onEdit={() => setEditingSubscription(subscription)}
                onDelete={() => setSubscriptionToDelete(subscription)}
              />
            </div>
          ))
        )}
      </div>

      {meta.total > 0 && (
        <Pagination
          currentPage={meta.page}
          totalPages={Math.ceil(meta.total / meta.limit)}
          onPageChange={setPage}
        />
      )}

      <CreateSubscriptionModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {editingSubscription && (
        <EditSubscriptionModal
          subscription={editingSubscription}
          open={!!editingSubscription}
          onClose={() => setEditingSubscription(null)}
        />
      )}

      {subscriptionToDelete && (
        <DeleteSubscriptionModal
          subscription={subscriptionToDelete}
          open={!!subscriptionToDelete}
          onClose={() => setSubscriptionToDelete(null)}
        />
      )}
    </div>
  );
};

export default SubscriptionsPage;
