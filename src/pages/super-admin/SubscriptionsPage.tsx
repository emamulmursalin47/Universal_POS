// pages/SubscriptionsPage.tsx (Styled to match ShopsPage)
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
// import { ActiveSubscription, SubscriptionPlan } from '@/types/subscription';
import { SubscriptionPlan } from '@/types/subscription';
// import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { SubscriptionPlansGrid } from '@/components/grids/SubscriptionGrids';
// import { SubscriptionsTable } from '@/components/tables/SubscriptionTable';
import { CreatePlanModal } from '@/components/modals/CreatePlanModal';
import { EditPlanModal } from '@/components/modals/EditPlanModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import axios from 'axios';

// const mockActiveSubscriptions: ActiveSubscription[] = [
//   {
//     id: 1,
//     shopName: 'TechStore Pro',
//     plan: 'Premium Plan',
//     status: 'active',
//     nextBilling: '2025-06-25',
//     amount: 99.99,
//   },
//   {
//     id: 2,
//     shopName: 'Fashion Hub',
//     plan: 'Standard Plan',
//     status: 'active',
//     nextBilling: '2025-06-15',
//     amount: 49.99,
//   },
//   {
//     id: 3,
//     shopName: 'Local Crafts',
//     plan: 'Basic Plan',
//     status: 'expired',
//     nextBilling: '2025-05-20',
//     amount: 29.99,
//   },
// ];

export default function SubscriptionsPage() {
  // const { plans, addPlan, updatePlan, deletePlan, togglePlanStatus } = useSubscriptionPlans();
  // const [activeSubscriptions] = useState<ActiveSubscription[]>(mockActiveSubscriptions);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected items
  const [planToEdit, setPlanToEdit] = useState<SubscriptionPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);

  const handleCreatePlan = async () => {
    await fetchPlans();
  };

  const handleEditPlan = useCallback((plan: SubscriptionPlan) => {
    console.log('Edit plan: called');
    console.log(plan);
    setPlanToEdit(plan); // Add this line - you were missing this!
    setIsEditModalOpen(true);
  }, []);

  // const handleUpdatePlan = useCallback(() => {
  //   // updatePlan(updatedPlan);
  //   console.log('Update plan: called');
  //   setPlanToEdit(null);
  //   setIsEditModalOpen(false);
  // }, []);

  // const handleViewPlan = useCallback((plan: SubscriptionPlan) => {
  //   console.log('View plan:', plan);
  //   // TODO: Implement view plan functionality (could open a read-only modal)
  // }, []);

  const handleToggleStatus = useCallback(() => {
    // togglePlanStatus(planId);
    console.log('Toggle status: called');
  }, []);

  const handleDeletePlan = (planId: string) => {
    console.log('Delete plan: called');
    const planToDelete = subscriptionPlans.find(p => p._id === planId);
    if (planToDelete) {
      console.log('planToDelete:', planToDelete);
      setPlanToDelete(planToDelete);
      setIsDeleteModalOpen(true);
    }
    // console.log(planId);
  };

  const confirmDeletePlan = async () => {
    if (planToDelete) {
      try {
        await axios.delete(`/api/v1/subscription/delete/${planToDelete._id}`, {
          headers: {
            'Authorization': `${localStorage.getItem('accessToken')}`,
          },
        });
      } catch (error) {
        console.error(`Error Deleting plans:${planToDelete.planName}: `, error);
      }
      await fetchPlans();
      setPlanToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };



  const handleCloseDeleteModal = useCallback(() => {
    setPlanToDelete(null);
    setIsDeleteModalOpen(false);
  }, []);

  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);

  const fetchPlans = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/subscription', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.data.data;
      setSubscriptionPlans(data);
      // console.log(subscriptionPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }
    , []);
  useEffect(() => {

    fetchPlans();
  }, [fetchPlans]);

  const handleCloseEditModal = useCallback(() => {
    setPlanToEdit(null);
    setIsEditModalOpen(false);
    // await fetchPlans();
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
              plans={subscriptionPlans}
              onEditPlan={handleEditPlan}
              // onViewPlan={handleViewPlan}
              onToggleStatus={handleToggleStatus}
              onDeletePlan={handleDeletePlan}
            />
          </CardContent>
        </Card>

        {/* Active Subscriptions Section */}
        {/* <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionsTable subscriptions={activeSubscriptions} />
          </CardContent>
        </Card> */}
      </div>

      {/* Modals */}
      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePlan={handleCreatePlan}
      />

      {planToEdit && (
        <EditPlanModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onUpdatePlan={fetchPlans}
          planToEdit={planToEdit}
        />
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeletePlan}
        planToDelete={planToDelete}
      />
    </div>
  );
}