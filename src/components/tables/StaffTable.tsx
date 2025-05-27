// components/StaffTable.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Edit, UserX, UserCheck, Trash2, Plus, Filter } from 'lucide-react';
import { Staff } from '@/types/staff';
import { formatRoleName } from '@/utils/staffUtiils';
import StaffCard from '../staff/StaffCard';


interface StaffTableProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onToggleStatus: (staffId: string) => void;
  onDelete: (staffId: string) => void;
  onAddNew?: () => void; // Optional for empty state
  onClearFilters?: () => void; // Optional for empty state
  hasFilters?: boolean; // To show appropriate empty state
}

const StaffTable: React.FC<StaffTableProps> = ({
  staff,
  onEdit,
  onToggleStatus,
  onDelete,
  onAddNew,
  onClearFilters,
  hasFilters = false
}) => {
  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Inactive
      </span>
    );
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="max-w-sm mx-auto">
        <div className="rounded-full bg-gray-100 h-16 w-16 mx-auto mb-6 flex items-center justify-center">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No staff members found
        </h3>
        <p className="text-gray-600 mb-6">
          {hasFilters
            ? 'Try adjusting your search terms or filters to see more results.'
            : 'Get started by adding your first staff member to begin managing your team.'
          }
        </p>
        {hasFilters ? (
          onClearFilters && (
            <Button onClick={onClearFilters} variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )
        ) : (
          onAddNew && (
            <Button onClick={onAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Staff Member
            </Button>
          )
        )}
      </div>
    </div>
  );

  if (staff.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {/* Desktop Table View - Hidden on small screens */}
      <div className="hidden lg:block">
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-900">Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Email</th>
                  <th className="text-left p-4 font-medium text-gray-900">Role</th>
                  <th className="text-left p-4 font-medium text-gray-900">Login ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember) => (
                  <tr key={staffMember.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{staffMember.name}</span>
                          <div className="text-xs text-gray-500">ID: {staffMember.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">{staffMember.email}</td>
                    <td className="p-4">
                      <span className="capitalize text-gray-700">
                        {formatRoleName(staffMember.role)}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 font-mono text-sm">{staffMember.loginId}</td>
                    <td className="p-4">
                      {getStatusBadge(staffMember.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onEdit(staffMember)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onToggleStatus(staffMember.id)}
                          className={`${staffMember.status === 'active' 
                            ? 'text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300' 
                            : 'text-green-500 hover:text-green-600 hover:bg-green-50 hover:border-green-300'
                          }`}
                        >
                          {staffMember.status === 'active' ? (
                            <>
                              <UserX className="h-3 w-3 mr-1" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-3 w-3 mr-1" />
                              Activate
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onDelete(staffMember.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tablet Table View - Hidden on large and small screens */}
      <div className="hidden md:block lg:hidden">
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Staff</th>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Role & Status</th>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember) => (
                  <tr key={staffMember.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{staffMember.name}</div>
                          <div className="text-sm text-gray-500">{staffMember.email}</div>
                          <div className="text-xs text-gray-500 font-mono">{staffMember.loginId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-700">
                          {formatRoleName(staffMember.role)}
                        </div>
                        {getStatusBadge(staffMember.status)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onEdit(staffMember)}
                            className="hover:bg-blue-50 hover:border-blue-300 text-xs"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onToggleStatus(staffMember.id)}
                            className={`text-xs ${staffMember.status === 'active' 
                              ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                              : 'text-green-500 hover:text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {staffMember.status === 'active' ? (
                              <>
                                <UserX className="h-3 w-3 mr-1" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-3 w-3 mr-1" />
                                Activate
                              </>
                            )}
                          </Button>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onDelete(staffMember.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs w-full"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Card View - Visible only on small screens */}
      <div className="md:hidden space-y-4">
        {staff.map((staffMember) => (
          <StaffCard
            key={staffMember.id}
            staff={staffMember}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default StaffTable;