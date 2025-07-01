// pages/StaffPage.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, RefreshCw } from "lucide-react";
// import { MOCK_STAFF_DATA } from '@/constants/staff';
// import { Staff, StaffFormData } from '@/types/staff';
// import StaffSearch from '@/components/staff/StaffSearch';
// import StaffTable from '@/components/tables/StaffTable';
import AddStaffModal from '@/components/modals/AddStaffModal';
import EditStaffModal from '@/components/modals/EditStaffModal';
import axios from 'axios';
import { StaffTypesNew } from '@/types/staff';
import StaffTableNew from '@/components/tables/StaffTableNew';

// Components

const StaffPage: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffTypesNew | null>(null);
  // const [staffList, setStaffList] = useState<Staff[]>(() => {
  //   return MOCK_STAFF_DATA.filter(user =>
  //     user.role === 'cashier' || user.role === 'vendor_admin'
  //   );
  // });

  // Enhanced filtering logic
  // const filteredStaff = useMemo(() => {
  //   return staffList.filter(staff => {
  //     const matchesSearch =
  //       staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       staff.loginId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       staff.id.toLowerCase().includes(searchTerm.toLowerCase());

  //     const matchesStatus =
  //       statusFilter === 'all' ||
  //       (statusFilter === 'active' && staff.status === 'active') ||
  //       (statusFilter === 'inactive' && staff.status === 'inactive');

  //     return matchesSearch && matchesStatus;
  //   });
  // }, [staffList, searchTerm, statusFilter]);

  // Check if filters are applied
  // const hasFilters = searchTerm.trim() !== '' || statusFilter !== 'all';

  // const handleAddStaff = useCallback((newStaffData: StaffFormData) => {
  //   // Check for existing data
  //   const existingStaff = staffList.find(staff => staff.id === newStaffData.id);
  //   if (existingStaff) {
  //     alert('Staff ID already exists. Please use a unique ID.');
  //     return;
  //   }

  //   const existingLoginId = staffList.find(staff => staff.loginId === newStaffData.loginId);
  //   if (existingLoginId) {
  //     alert('Login ID already exists. Please use a unique login ID.');
  //     return;
  //   }

  //   const existingEmail = staffList.find(staff => staff.email === newStaffData.email);
  //   if (existingEmail) {
  //     alert('Email address already exists. Please use a unique email address.');
  //     return;
  //   }

  //   const newStaffMember: Staff = {
  //     id: newStaffData.id,
  //     name: newStaffData.name,
  //     email: newStaffData.email,
  //     role: newStaffData.role as Staff['role'],
  //     loginId: newStaffData.loginId,
  //     password: newStaffData.password,
  //     avatar: null,
  //     status: 'active',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   };

  //   setStaffList(prev => [...prev, newStaffMember]);
  //   alert(`Staff member "${newStaffMember.name}" added successfully!`);
  // }, [staffList]);

  const handleEditStaff = useCallback((staff: StaffTypesNew) => {
    // console.log(staff)
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  }, []);

  // const handleUpdateStaff = useCallback((updatedStaff: Staff) => {
  //   setStaffList(prev =>
  //     prev.map(staff =>
  //       staff.id === updatedStaff.id ? updatedStaff : staff
  //     )
  //   );
  //   alert(`Staff member "${updatedStaff.name}" updated successfully!`);
  // }, []);




  // const clearFilters = () => {
  //   setSearchTerm('');
  //   setStatusFilter('all');
  // };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };


  const [staffs, setStaffs] = useState<StaffTypesNew[]>([])
  const fetchStaff = useCallback(async () => {
    setIsloading(true);
    try {
      const response = await axios('/api/v1/shop-role/staffs', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
        },
      });
      const data = response.data.data.staffQuery;
      setStaffs(data);
      // console.log('Fetched staffs:', staffs);
    } catch {
      // console.error('Error fetching staff:', error);
    }
    setIsloading(false);
  }, []); // No dependencies → stable reference

  useEffect(() => {
    fetchStaff(); // Runs only once
  }, [fetchStaff]); // Safe to include fetchStaff here

  const handleDeleteStaff = useCallback(async (staffId: string) => {
    setIsloading(true);
    const staff = staffs.find(s => s._id === staffId);
    if (!staff) return;

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${staff.fullName}"? This action cannot be undone.`
    );

    if (confirmed) {
      await axios.delete(`/api/v1/shop-role/delete-staff/${staffId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
        },
      })
      alert(`${staff.fullName} has been deleted successfully.`);
    }

    await fetchStaff();
    setIsloading(false);
  }, [fetchStaff, staffs]);

  const handleToggleStatus = useCallback(async (staffId: string) => {
    setIsloading(true);
    const staff = staffs.find(s => s.user === staffId);
    if (!staff) return;

    const action = staff.status === 'active' ? 'inactive' : 'active';
    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${staff.fullName}?`
    );

    if (confirmed) {
      await axios.patch(`/api/v1/shop-role/update-staff/${staffId}`, {
        status: action
      }, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      })
      alert(`${staff.fullName} has been ${action}d successfully.`);

    }
    await fetchStaff();
    setIsloading(false);
  }, [fetchStaff, staffs]);


  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Staff Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive management system for staff members and their access levels
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={openAddModal}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="sm:hidden">Add Staff</span>
              <span className="hidden sm:inline">Add New Staff Member</span>
            </Button>
            <Button
              onClick={fetchStaff}
              size="lg"
              className="w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {/* <span className="sm:hidden">Refresh staff</span> */}
              <span className="hidden sm:inline">Refresh Staff</span>
            </Button>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                All Staff Members
              </CardTitle>

              {/* Quick Stats Pills */}
              {/* {staffList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {staffList.filter(s => s.status === 'active').length} Active
                  </div>
                  <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    {staffList.filter(s => s.status === 'inactive').length} Inactive
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {staffList.length} Total
                  </div>
                </div>
              )} */}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search and Filter Section - Only show if there are staff members */}
            {/* {staffList.length > 0 && (
              <StaffSearch
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onSearchChange={setSearchTerm}
                onStatusFilterChange={setStatusFilter}
                onClearFilters={clearFilters}
              />
            )} */}

            {/* Responsive Staff Table/Cards */}
            {/* <StaffTable
              staff={filteredStaff}
              onEdit={handleEditStaff}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteStaff}
              onAddNew={openAddModal}
              onClearFilters={clearFilters}
              hasFilters={hasFilters}
            />  */}
            {isloading &&
              <div className="flex items-center justify-center p-4">
                <RefreshCw className="h-28 w-28 animate-spin text-primary" />
              </div>
            }
            {
              !isloading &&
              <StaffTableNew
                staff={staffs}
                // fetchStaff={fetchStaff}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteStaff}
                onEdit={handleEditStaff}
              />
            }
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); fetchStaff(); }}
        onSave={fetchStaff}
      />

      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedStaff(null); fetchStaff(); }}
        // onUpdate={handleUpdateStaff}
        staff={selectedStaff}
      // onUpdate={handleUpdateStaff}
      />
    </div>
  );
};

export default StaffPage;