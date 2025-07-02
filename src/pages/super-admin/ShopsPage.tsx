/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useGetAllShopsQuery } from "@/redux/api/shopApi";
import useDebounce from "@/hooks/useDebounce";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ShopFilters from "./Component/SearchFilter/ShopFilters";
import ShopsDataTable from "./Component/Table/ShopsDataTable";
import Pagination from "@/components/shared/Pagination";
import CreateShopModal from "./Component/Modal/CreateShopModal";
import EditShopModal from "./Component/Modal/EditShopModal";

type TVendorStatus = "active" | "inactive";

const ShopPage = () => {
  // State management
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TVendorStatus | "all">(
    "all"
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedShop, setSelectedShop] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // API query with debounced search
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, isLoading } = useGetAllShopsQuery({
    page,
    limit,
    search: debouncedSearch,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  // Handlers
  const handleEdit = (shop: any) => {
    setSelectedShop(shop);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shop Management</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Shop
        </Button>
      </div>

      {/* Filters */}
      <ShopFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Data Table */}
      <ShopsDataTable
        shops={data?.data || []}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      {/* Pagination */}
      {data?.meta?.total > limit && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(data.meta.total / limit)}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modals */}
      <CreateShopModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedShop && (
        <EditShopModal
          shop={selectedShop}
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ShopPage;
