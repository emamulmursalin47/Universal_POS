// components/StaffCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Edit, UserX, UserCheck, Trash2, Mail, User, Shield } from 'lucide-react';
import { Staff } from '@/types/staff';
import { formatRoleName } from '@/utils/staffUtiils';


interface StaffCardProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onToggleStatus: (staffId: string) => void;
  onDelete: (staffId: string) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({
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

  const getRoleIcon = (role: string) => {
    return role === 'vendor_admin' ? (
      <Shield className="h-4 w-4 text-purple-600" />
    ) : (
      <User className="h-4 w-4 text-orange-600" />
    );
  };

  const getRoleColor = (role: string) => {
    return role === 'vendor_admin' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-orange-100 text-orange-800';
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{staff.name}</h3>
              <p className="text-sm text-gray-500">ID: {staff.id}</p>
            </div>
          </div>
          {getStatusBadge(staff.status)}
        </div>

        {/* Staff Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-700 truncate">{staff.email}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              {getRoleIcon(staff.role)}
              <span className="text-gray-700 ml-2">{formatRoleName(staff.role)}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(staff.role)}`}>
              {formatRoleName(staff.role)}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-gray-700 font-mono">{staff.loginId}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(staff)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit className="h-3 w-3 mr-2" />
            Edit
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onToggleStatus(staff.id)}
            className={`flex-1 ${staff.status === 'active' 
              ? 'text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300' 
              : 'text-green-500 hover:text-green-600 hover:bg-green-50 hover:border-green-300'
            }`}
          >
            {staff.status === 'active' ? (
              <>
                <UserX className="h-3 w-3 mr-2" />
                Deactivate
              </>
            ) : (
              <>
                <UserCheck className="h-3 w-3 mr-2" />
                Activate
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(staff.id)}
            className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <Trash2 className="h-3 w-3 mr-2" />
            Delete
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Created: {staff.createdAt.toLocaleDateString()}</span>
            <span>Updated: {staff.updatedAt.toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffCard;