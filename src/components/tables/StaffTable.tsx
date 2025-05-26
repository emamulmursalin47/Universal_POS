// components/StaffTable.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Edit, UserX, UserCheck, Trash2 } from 'lucide-react';
import { Staff } from '@/types/staff';
import { formatRoleName } from '@/utils/staffUtiils';


interface StaffTableProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onToggleStatus: (staffId: string) => void;
  onDelete: (staffId: string) => void;
}

const StaffTable: React.FC<StaffTableProps> = ({
  staff,
  onEdit,
  onToggleStatus,
  onDelete
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
  );
};

export default StaffTable;