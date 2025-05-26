// components/StaffTable.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Edit, UserX } from 'lucide-react';
import { StaffTableProps } from '@/types/staff';
import { formatRoleName } from '@/utils/StaffValidation';


const StaffTable: React.FC<StaffTableProps> = ({ staff, onEdit, onDeactivate }) => {
  const getStatusBadge = (status: string = 'active') => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.active}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (staff.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or add a new staff member.</p>
      </div>
    );
  }

  return (
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
                    {staffMember.avatar ? (
                      <img
                        src={staffMember.avatar}
                        alt={staffMember.name}
                        className="h-8 w-8 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
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
                      onClick={() => onEdit(staffMember.id)}
                      className="hover:bg-blue-50 hover:border-blue-300"
                      title="Edit staff member"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDeactivate(staffMember.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                      title="Deactivate staff member"
                    >
                      <UserX className="h-3 w-3 mr-1" />
                      Deactivate
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;