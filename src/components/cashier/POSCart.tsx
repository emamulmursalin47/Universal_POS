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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  CreditCard, 
  DollarSign, 
  Save, 
  ShoppingBag,
  Printer
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { POSPaymentModal } from './POSPaymentModal';

export function POSCart() {
  const dispatch = useDispatch();
  const { items, subtotal, tax, discount, total } = useSelector((state: RootState) => state.cart);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateItemQuantity({ productId, quantity }));
  };
  
  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem(productId));
  };
  
  const handleApplyDiscount = (productId: string, discountAmount: number) => {
    dispatch(applyItemDiscount({ productId, discount: discountAmount }));
  };
  
  const handleCartDiscount = (discountAmount: number) => {
    dispatch(applyCartDiscount(discountAmount));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col h-full border rounded-md bg-card">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Current Sale</h2>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleClearCart}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" />
            Hold
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {items.length > 0 ? (
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.product.id} className="p-3 hover:bg-muted/40">
                <div className="flex justify-between">
                  <div className="flex-1 mr-4">
                    <h3 className="font-medium text-sm">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      ${item.product.price.toFixed(2)} each
                    </p>
                    {item.discount > 0 && (
                      <Badge variant="outline" className="mt-1 text-xs bg-green-50 text-green-700 border-green-200">
                        Discount: ${item.discount.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-medium">${item.total.toFixed(2)}</span>
                    <div className="flex items-center mt-1 justify-end">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex mt-2 space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => handleApplyDiscount(item.product.id, 1)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    Discount
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs h-7 px-2 text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="font-medium">Cart is empty</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add products by clicking on items in the product grid
            </p>
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button variant="outline" disabled={items.length === 0}>
              <Printer className="h-4 w-4 mr-2" />
              Receipt
            </Button>
            <Button
              className="bg-primary"
              disabled={items.length === 0}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pay
            </Button>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      <POSPaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
      />
    </div>
  );
}