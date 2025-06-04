/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/shop/modals/AddShopModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Plus, User, MapPin, Mail, Phone, Calendar, Eye, EyeOff } from 'lucide-react';
// import { Shop } from '@/types/shop';
import { ResponsiveModal } from './ResponsiveModal';
import axios from 'axios';

interface SubscriptionPlan {
  _id: string;
  planName: string;
  price: number;
  description: string;
  billingCycle: string;
  maxProducts: number;
  maxUsers: number;
  supportLevel: string;
  features: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddShop: () => void;
}

interface CreateShopFormData {
  shopName: string;
  shopOwnerName: string;
  email: string;
  password: string;
  contactNumber: string;
  address: string;
  subscriptionPlan: string;
  subscriptionDeadline: string;
}

export const AddShopModal: React.FC<AddShopModalProps> = ({
  isOpen,
  onClose,
  onAddShop,
}) => {
  const [formData, setFormData] = useState<CreateShopFormData>({
    shopName: '',
    shopOwnerName: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    subscriptionPlan: '',
    subscriptionDeadline: ''
  });

  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateShopFormData>>({});

  const authToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (isOpen && authToken) {
      loadSubscriptionPlans();
    }
  }, [isOpen, authToken]);

  const loadSubscriptionPlans = async () => {
    if (!authToken) {
      console.error('Authorization token is required');
      return;
    }

    setIsLoadingPlans(true);
    try {
      const response = await axios.get('/api/v1/subscription', {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const result = response.data;

      // Filter only active plans
      const activePlans = result.data.filter((plan: SubscriptionPlan) => plan.status === 'active');
      setSubscriptionPlans(activePlans);

    } catch (error) {
      console.error('Error loading subscription plans:', error);
      // Fallback to empty array on error
      setSubscriptionPlans([]);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateShopFormData> = {};

    if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
    if (!formData.shopOwnerName.trim()) newErrors.shopOwnerName = 'Shop owner name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.subscriptionPlan) newErrors.subscriptionPlan = 'Subscription plan is required';
    if (!formData.subscriptionDeadline) newErrors.subscriptionDeadline = 'Subscription deadline is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatSubscriptionDeadline = (dateString: string): string => {
    // Convert YYYY-MM-DD to ISO string with end of day time
    const date = new Date(dateString);
    date.setHours(23, 59, 59, 0);
    return date.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!authToken) {
      console.error('Authorization token is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        shopName: formData.shopName,
        shopOwnerName: formData.shopOwnerName,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        address: formData.address,
        subscriptionPlan: formData.subscriptionPlan,
        subscriptionDeadline: formatSubscriptionDeadline(formData.subscriptionDeadline)
      };
      console.log(payload);

      await axios.post('/api/v1/user/create-shop', payload, {
        headers: {
          'Authorization': `${authToken}`,
        },
      });

      // const result = response.data;
      // const response = await fetch('/api/v1/user/create-shop', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `${authToken}`,
      //   },
      //   body: JSON.stringify(payload)
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to create shop');
      // }

      // const result = await response.json();

      // Transform API response to match Shop interface if needed
      // const newShop: Shop = {
      //   id: result.data?.id || Date.now(),
      //   name: formData.shopName,
      //   email: formData.email,
      //   contact: formData.contactNumber,
      //   address: formData.address,
      //   ownerName: formData.shopOwnerName,
      //   ownerPhone: formData.contactNumber,
      //   subscriptionPlan: formData.subscriptionPlan,
      //   subscriptionStatus: 'active',
      //   deadline: formData.subscriptionDeadline,
      //   isActive: true,
      //   createdAt: new Date().toISOString(),
      //   ...result.data
      // };

      // onAddShop(newShop);
      onAddShop();
      handleClose();
    } catch (error) {
      console.error('Error creating shop:', error);
      // You might want to show a toast notification or set an error state here
      alert(error instanceof Error ? error.message : 'Failed to create shop');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        shopName: '',
        shopOwnerName: '',
        email: '',
        password: '',
        contactNumber: '',
        address: '',
        subscriptionPlan: '',
        subscriptionDeadline: ''
      });
      setErrors({});
      setShowPassword(false);
      onClose();
    }
  };

  const updateFormData = (field: keyof CreateShopFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getSelectedPlan = () => {
    return subscriptionPlans.find(plan => plan._id === formData.subscriptionPlan);
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Shop"
      icon={<Building2 className="h-5 w-5" />}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column - Shop Information */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Shop Information</h3>
            </div>

            {/* Shop Name */}
            <div className="space-y-2">
              <Label htmlFor="shop-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Shop Name *
              </Label>
              <Input
                id="shop-name"
                placeholder="Enter shop name"
                value={formData.shopName}
                onChange={(e) => updateFormData('shopName', e.target.value)}
                className={`h-11 ${errors.shopName ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.shopName && <p className="text-sm text-red-600">{errors.shopName}</p>}
            </div>

            {/* Shop Email */}
            <div className="space-y-2">
              <Label htmlFor="shop-email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Shop Email Address *
              </Label>
              <Input
                id="shop-email"
                type="email"
                placeholder="Enter shop email address"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4" />
                Account Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secure password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className={`h-11 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="contact-number" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Number *
              </Label>
              <Input
                id="contact-number"
                type="tel"
                placeholder="01712345612"
                value={formData.contactNumber}
                onChange={(e) => updateFormData('contactNumber', e.target.value)}
                className={`h-11 ${errors.contactNumber ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.contactNumber && <p className="text-sm text-red-600">{errors.contactNumber}</p>}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shop Address *
              </Label>
              <Input
                id="address"
                placeholder="Enter complete shop address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className={`h-11 ${errors.address ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>
          </div>

          {/* Right Column - Owner & Subscription Information */}
          <div className="space-y-5">
            {/* Owner Information Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Owner Information</h3>
              </div>

              {/* Shop Owner Name */}
              <div className="space-y-2">
                <Label htmlFor="shop-owner-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Shop Owner Name *
                </Label>
                <Input
                  id="shop-owner-name"
                  placeholder="Enter shop owner's full name"
                  value={formData.shopOwnerName}
                  onChange={(e) => updateFormData('shopOwnerName', e.target.value)}
                  className={`h-11 ${errors.shopOwnerName ? 'border-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                />
                {errors.shopOwnerName && <p className="text-sm text-red-600">{errors.shopOwnerName}</p>}
              </div>
            </div>

            {/* Subscription Information Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Subscription Information</h3>
              </div>

              {/* Subscription Plan */}
              <div className="space-y-2">
                <Label htmlFor="subscription-plan" className="text-sm font-medium text-gray-700">
                  Subscription Plan *
                </Label>
                <Select
                  value={formData.subscriptionPlan}
                  onValueChange={(value) => updateFormData('subscriptionPlan', value)}
                  disabled={isSubmitting || isLoadingPlans}
                >
                  <SelectTrigger className={`h-11 ${errors.subscriptionPlan ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder={isLoadingPlans ? "Loading plans..." : "Select a plan"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptionPlans.map((plan) => (
                      <SelectItem key={plan._id} value={plan._id}>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${plan.planName.toLowerCase().includes('basic') ? 'bg-gray-400' :
                              plan.planName.toLowerCase().includes('pro') ? 'bg-blue-400' :
                                plan.planName.toLowerCase().includes('enterprise') ? 'bg-purple-400' : 'bg-green-400'
                              }`}></div>
                            <span className="font-medium">{plan.planName}</span>
                            <span className="text-sm text-gray-500">
                              ৳{plan.price}/{plan.billingCycle}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 pl-5">
                            {plan.maxProducts} products • {plan.maxUsers} users • {plan.supportLevel}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subscriptionPlan && <p className="text-sm text-red-600">{errors.subscriptionPlan}</p>}
                {getSelectedPlan() && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <strong>{getSelectedPlan()?.planName}</strong>
                      <span className="text-blue-600 font-semibold">
                        ৳{getSelectedPlan()?.price}/{getSelectedPlan()?.billingCycle}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs">{getSelectedPlan()?.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>📦 {getSelectedPlan()?.maxProducts} products</div>
                      <div>👥 {getSelectedPlan()?.maxUsers} users</div>
                      <div className="col-span-2">🎧 {getSelectedPlan()?.supportLevel}</div>
                    </div>
                    <div className="pt-2">
                      <div className="text-xs font-medium text-gray-700 mb-1">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {getSelectedPlan()?.features.map((feature, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Subscription Deadline */}
              <div className="space-y-2">
                <Label htmlFor="subscription-deadline" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Subscription Deadline *
                </Label>
                <Input
                  id="subscription-deadline"
                  type="date"
                  value={formData.subscriptionDeadline}
                  onChange={(e) => updateFormData('subscriptionDeadline', e.target.value)}
                  className={`h-11 ${errors.subscriptionDeadline ? 'border-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.subscriptionDeadline && <p className="text-sm text-red-600">{errors.subscriptionDeadline}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="order-2 sm:order-1 h-11 px-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !authToken}
            className="order-1 sm:order-2 h-11 px-6"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Shop...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create Shop
              </>
            )}
          </Button>
        </div>
      </form>
    </ResponsiveModal>
  );
};