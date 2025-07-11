import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Edit, UserX, UserCheck, Trash2 } from 'lucide-react';
import { formatRoleName } from '@/utils/staffUtiils';
import { StaffTypesNew } from '@/types/staff';

interface StaffTableProps {
  staff: StaffTypesNew[];
  onToggleStatus: (staffId: string) => void;
  onDelete: (staffId: string) => void;
  onEdit: (staff: StaffTypesNew) => void;
}

const StaffTableNew: React.FC<StaffTableProps> = ({
  staff,
  onToggleStatus,
  onDelete,
  onEdit
}) => {
  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Inactive
      </span>
    );
  };

  // const onToggleStatus = async (staffId: string, status: string) => {
  //   console.log('staffId: ', staffId, 'status: ', status);
  //   console.log('staff', staff);
  //   const token = localStorage.getItem('accessToken');

  //   const payload = {
  //     status: status === 'active' ? 'inactive' : 'active',
  //   };
  //   console.log('payload', payload);
  //   const response = await axios.patch(`/api/v1/shop-role/update-staff/${staffId}`, payload,
  //     {
  //       headers: {
  //         Authorization: `${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   console.log('response', response);
  //   await fetchStaff();

  // };
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
                <tr className="border-b bg-gray-50 font-bold">
                  <th className="text-left p-4 font-medium text-gray-900">Sl.</th>
                  <th className="text-left p-4 font-medium text-gray-900">Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Contact</th>
                  <th className="text-left p-4 font-medium text-gray-900">Role</th>
                  <th className="text-left p-4 font-medium text-gray-900">Login ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember, index) => (
                  <tr key={staffMember._id} className="border-b hover:bg-gray-50 transition-colors">

                    <td className='text-center font-bold bg-gray-50 text-gray-900'>{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{staffMember.fullName}</span>
                          <div className="text-xs text-gray-500">Vendor-ID: {staffMember.vendorId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">
                      <div className="text-xs text-gray-500">{staffMember.contactNumber}</div>
                      <div className="text-sm text-gray-500">{staffMember.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="capitalize text-gray-700">
                        {formatRoleName(staffMember.role)}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 font-mono text-sm">{staffMember.userId}</td>
                    <td className="p-4">
                      {getStatusBadge(staffMember.status)}
                    </td>
                    <td className="p-4">
                      {
                        staffMember.isDeleted && (
                          <span className="px-5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Deleted Account
                          </span>
                        )
                      }
                      {
                        !staffMember.isDeleted && (
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
                              onClick={() => onToggleStatus(staffMember.user)}
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
                            {
                              staffMember.status === 'active' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onDelete(staffMember._id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Delete
                                </Button>
                              )
                            }
                          </div>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tablet Table View - Hidden on large and small screens */}
      {/* <div className="hidden md:block lg:hidden">
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
      </div> */}

      {/* Mobile Card View - Visible only on small screens */}
      {/* <div className="md:hidden space-y-4">
        {staff.map((staffMember) => (
          <StaffCard
            key={staffMember.id}
            staff={staffMember}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />
        ))}
      </div> */}
    </>
  );
};

export default StaffTableNew;