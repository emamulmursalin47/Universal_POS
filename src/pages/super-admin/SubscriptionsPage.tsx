// pages/SubscriptionsPage.tsx (Styled to match ShopsPage)
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { ActiveSubscription, SubscriptionPlan } from '@/types/subscription';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { SubscriptionPlansGrid } from '@/components/grids/SubscriptionGrids';
import { SubscriptionsTable } from '@/components/tables/SubscriptionTable';
import { CreatePlanModal } from '@/components/modals/CreatePlanModal';
import { EditPlanModal } from '@/components/modals/EditPlanModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';

const mockActiveSubscriptions: ActiveSubscription[] = [
  {
    id: 1,
    shopName: 'TechStore Pro',
    plan: 'Premium Plan',
    status: 'active',
    nextBilling: '2025-06-25',
    amount: 99.99,
  },
  {
    id: 2,
    shopName: 'Fashion Hub',
    plan: 'Standard Plan',
    status: 'active',
    nextBilling: '2025-06-15',
    amount: 49.99,
  },
  {
    id: 3,
    shopName: 'Local Crafts',
    plan: 'Basic Plan',
    status: 'expired',
    nextBilling: '2025-05-20',
    amount: 29.99,
  },
];

export default function SubscriptionsPage() {
  const { plans, addPlan, updatePlan, deletePlan, togglePlanStatus } = useSubscriptionPlans();
  const [activeSubscriptions] = useState<ActiveSubscription[]>(mockActiveSubscriptions);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Selected items
  const [planToEdit, setPlanToEdit] = useState<SubscriptionPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);

  const handleCreatePlan = useCallback((newPlan: SubscriptionPlan) => {
    addPlan(newPlan);
  }, [addPlan]);

  const handleEditPlan = useCallback((plan: SubscriptionPlan) => {
    setPlanToEdit(plan);
    setIsEditModalOpen(true);
  }, []);

  const handleUpdatePlan = useCallback((updatedPlan: SubscriptionPlan) => {
    updatePlan(updatedPlan);
    setPlanToEdit(null);
    setIsEditModalOpen(false);
  }, [updatePlan]);

  const handleViewPlan = useCallback((plan: SubscriptionPlan) => {
    console.log('View plan:', plan);
    // TODO: Implement view plan functionality (could open a read-only modal)
  }, []);

  const handleToggleStatus = useCallback((planId: string) => {
    togglePlanStatus(planId);
  }, [togglePlanStatus]);

  const handleDeletePlan = useCallback((planId: string) => {
    const planToDelete = plans.find(p => p.id === planId);
    if (planToDelete) {
      setPlanToDelete(planToDelete);
      setIsDeleteModalOpen(true);
    }
  }, [plans]);

  const confirmDeletePlan = useCallback(() => {
    if (planToDelete) {
      deletePlan(planToDelete.id);
      setPlanToDelete(null);
      setIsDeleteModalOpen(false);
    }
  }, [planToDelete, deletePlan]);

  const handleCloseEditModal = useCallback(() => {
    setPlanToEdit(null);
    setIsEditModalOpen(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setPlanToDelete(null);
    setIsDeleteModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Header Section - Responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Subscription Plans
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your subscription plans and active subscriptions
            </p>
          </div>
          
          {/* Add Button - Full width on mobile */}
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Create Plan</span>
            <span className="hidden sm:inline">Create New Plan</span>
          </Button>
        </div>

        {/* Subscription Plans Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">Available Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionPlansGrid
              plans={plans}
              onEditPlan={handleEditPlan}
              onViewPlan={handleViewPlan}
              onToggleStatus={handleToggleStatus}
              onDeletePlan={handleDeletePlan}
            />
          </CardContent>
        </Card>

        {/* Active Subscriptions Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionsTable subscriptions={activeSubscriptions} />
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePlan={handleCreatePlan}
      />

      <EditPlanModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdatePlan={handleUpdatePlan}
        planToEdit={planToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeletePlan}
        planToDelete={planToDelete}
      />
    </div>
  );
}