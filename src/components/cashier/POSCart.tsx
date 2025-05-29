/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/redux';
import { 
  updateItemQuantity, 
  removeItem, 
  applyItemDiscount, 
  applyCartDiscount, 
  clearCart 
} from '@/redux/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  CreditCard, 
  Save, 
  ShoppingBag,
  Printer,
  Percent,
  DollarSign,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { POSPaymentModal } from './POSPaymentModal';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalPurchases?: number;
}

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (type: 'percentage' | 'amount', value: number) => void;
  currentDiscount?: number;
  itemPrice?: number;
  isCartDiscount?: boolean;
}

function DiscountModal({ isOpen, onClose, onApply, currentDiscount = 0, itemPrice, isCartDiscount = false }: DiscountModalProps) {
  const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
  const [discountValue, setDiscountValue] = useState('');

  const handleApply = () => {
    const value = parseFloat(discountValue);
    if (isNaN(value) || value <= 0) return;
    
    let finalDiscount = value;
    if (discountType === 'percentage') {
      if (value > 100) return;
      if (itemPrice) {
        finalDiscount = (itemPrice * value) / 100;
      }
    }
    
    onApply(discountType, finalDiscount);
    setDiscountValue('');
    onClose();
  };

  const quickDiscounts = [5, 10, 15, 20, 25, 50];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">
            {isCartDiscount ? 'Cart Discount' : 'Item Discount'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label className="text-sm">Type</Label>
            <Select value={discountType} onValueChange={(value) => setDiscountType(value as 'percentage' | 'amount')}>
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="amount">Fixed Amount ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm">Value</Label>
            <div className="relative">
              {discountType === 'percentage' ? (
                <Percent className="absolute right-2 top-2 h-3 w-3 text-muted-foreground" />
              ) : (
                <DollarSign className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
              )}
              <Input
                type="number"
                placeholder={discountType === 'percentage' ? '%' : '$'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className={`h-8 ${discountType === 'amount' ? 'pl-7' : 'pr-7'}`}
                min="0"
                max={discountType === 'percentage' ? '100' : undefined}
                step="0.01"
              />
            </div>
          </div>

          {discountType === 'percentage' && (
            <div>
              <Label className="text-xs text-muted-foreground">Quick %</Label>
              <div className="grid grid-cols-3 gap-1 mt-1">
                {quickDiscounts.map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    onClick={() => setDiscountValue(percent.toString())}
                    className="h-7 text-xs"
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentDiscount > 0 && (
            <div className="p-2 bg-yellow-50 rounded text-xs border border-yellow-200">
              <span className="text-yellow-800">Current: ${currentDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 h-8 text-xs">
              Cancel
            </Button>
            <Button 
              onClick={handleApply}
              disabled={!discountValue || parseFloat(discountValue) <= 0}
              className="flex-1 h-8 text-xs"
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface POSCartProps {
  selectedCustomer?: Customer | null;
}

export function POSCart({ selectedCustomer }: POSCartProps) {
  const dispatch = useDispatch();
  const { items, subtotal, tax, discount, total } = useSelector((state: RootState) => state.cart);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [discountModal, setDiscountModal] = useState<{
    isOpen: boolean;
    productId?: string;
    itemPrice?: number;
    currentDiscount?: number;
    isCartDiscount?: boolean;
  }>({
    isOpen: false,
    isCartDiscount: false
  });
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateItemQuantity({ productId, quantity }));
  };
  
  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem(productId));
  };
  
  const openItemDiscountModal = (productId: string, itemPrice: number, currentDiscount: number) => {
    setDiscountModal({
      isOpen: true,
      productId,
      itemPrice,
      currentDiscount,
      isCartDiscount: false
    });
  };

  const openCartDiscountModal = () => {
    setDiscountModal({
      isOpen: true,
      currentDiscount: discount,
      isCartDiscount: true
    });
  };

  const handleApplyDiscount = (type: 'percentage' | 'amount', value: number) => {
    if (discountModal.isCartDiscount) {
      dispatch(applyCartDiscount(value));
    } else if (discountModal.productId) {
      dispatch(applyItemDiscount({ productId: discountModal.productId, discount: value }));
    }
  };
  
  const handleClearCart = () => {
    if (window.confirm('Clear cart?')) {
      dispatch(clearCart());
    }
  };

  const removeItemDiscount = (productId: string) => {
    dispatch(applyItemDiscount({ productId, discount: 0 }));
  };

  const removeCartDiscount = () => {
    dispatch(applyCartDiscount(0));
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-card">
      {/* Compact Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Cart ({items.length})</h2>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={handleClearCart} disabled={items.length === 0} className="h-7 px-2 text-xs">
            <Trash2 className="h-3 w-3 mr-1" />
            Clear
          </Button>
          <Button variant="outline" size="sm" disabled={items.length === 0} className="h-7 px-2 text-xs">
            <Save className="h-3 w-3 mr-1" />
            Hold
          </Button>
        </div>
      </div>
      
      {/* Cart Items */}
      <ScrollArea className="flex-1 min-h-0">
        {items.length > 0 ? (
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.product.id} className="p-3 hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight truncate">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${item.product.price.toFixed(2)} each
                    </p>
                    {item.discount > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 px-1 py-0">
                          -${item.discount.toFixed(2)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-red-500"
                          onClick={() => removeItemDiscount(item.product.id)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">${item.total.toFixed(2)}</div>
                    {item.discount > 0 && (
                      <div className="text-xs text-muted-foreground line-through">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    )}
                    <div className="flex items-center mt-1 bg-muted/50 rounded p-0.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex mt-2 gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 h-6 text-xs"
                    onClick={() => openItemDiscountModal(item.product.id, item.product.price * item.quantity, item.discount)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {item.discount > 0 ? 'Edit' : 'Discount'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-6 px-2 text-xs text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="font-medium text-sm">Cart is empty</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Add products from the table
            </p>
          </div>
        )}
      </ScrollArea>
      
      {/* Compact Totals */}
      <div className="p-3 border-t bg-muted/10">
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Discount</span>
            <div className="flex items-center gap-1">
              <span className="text-green-600">-${discount.toFixed(2)}</span>
              {discount > 0 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 text-red-500"
                  onClick={removeCartDiscount}
                >
                  <X className="h-2 w-2" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 px-1 text-xs"
                  onClick={openCartDiscountModal}
                  disabled={items.length === 0}
                >
                  <Tag className="h-2 w-2" />
                </Button>
              )}
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button variant="outline" disabled={items.length === 0} className="h-8 text-xs">
              <Printer className="h-3 w-3 mr-1" />
              Receipt
            </Button>
            <Button
              className="bg-primary h-8 text-xs font-semibold"
              disabled={items.length === 0}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              <CreditCard className="h-3 w-3 mr-1" />
              Pay ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Discount Modal */}
      <DiscountModal
        isOpen={discountModal.isOpen}
        onClose={() => setDiscountModal({ isOpen: false, isCartDiscount: false })}
        onApply={handleApplyDiscount}
        currentDiscount={discountModal.currentDiscount}
        itemPrice={discountModal.itemPrice}
        isCartDiscount={discountModal.isCartDiscount}
      />
      
      {/* Payment Modal */}
      <POSPaymentModal
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
      />
    </div>
  );
}