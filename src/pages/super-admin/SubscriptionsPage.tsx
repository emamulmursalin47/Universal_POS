// pages/SubscriptionsPage.tsx
import  { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
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
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Subscription Plans
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription plans and active subscriptions
          </p>
        </div>
        
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      <SubscriptionPlansGrid
        plans={plans}
        onEditPlan={handleEditPlan}
        onViewPlan={handleViewPlan}
        onToggleStatus={handleToggleStatus}
        onDeletePlan={handleDeletePlan}
      />

      <SubscriptionsTable subscriptions={activeSubscriptions} />

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