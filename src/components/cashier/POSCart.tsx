import { useCallback, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Trash2,
  Plus,
  Minus,
  CreditCard,
  ShoppingBag,
} from 'lucide-react';
import { Customer, Product, Category } from '@/lib/types';

interface POSCartProps {
  selectedCustomer?: Customer | null;
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
  products: Product[];
  catregories: Category[];

}

export function POSCart({ cart, setCart }: POSCartProps) {
  const [discount, setDiscount] = useState("0");
  const [discountType, setDiscountType] = useState("cash");
  const [subtotalValue, setSubtotalValue] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);


  const handleUpdateQuantity = (productId: string, buyquantity: number) => {
    const selectedProduct = cart.find(item => item._id === productId);
    if (!selectedProduct || buyquantity < 1 || buyquantity > selectedProduct.quantity) return;

    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, buyquantity };
      }
      return item;
    });
    setCart(updatedCart);

  };

  const handleRemoveItem = (productId: string) => {
    if (window.confirm("Are you sure you want to remove this item from the cart?")) {
      const updatedCart = cart.filter(item => item._id !== productId);
      setCart(updatedCart);
    }
  };

  const subtotal = useCallback(async () => {
    let sum = 0;
    cart.forEach(item => {
      sum += item.sellingPrice * (item.buyquantity ?? 1);
    });
    setSubtotalValue(sum);
    return sum;
  }, [cart]);

  const calculateDiscount = useCallback(async (discountValue: string, subtotal: number, type: string) => {
    const amount = parseFloat(discountValue) || 0;
    if (type === "percent") {
      setDiscountValue((amount / 100) * subtotal);
    } else {
      setDiscountValue(amount);
    }
  }, []);

  const total = useCallback(async () => {
    setTotalValue(subtotalValue - discountValue);
  }, [subtotalValue, discountValue]);

  useEffect(() => {
    subtotal();
    calculateDiscount(discount, subtotalValue, discountType);
    total();
  }, [cart, discount, discountType, discountValue, subtotalValue, subtotal, calculateDiscount, total]);

  const handleClearCart = () => {
    if (window.confirm('Clear cart?')) {
      setCart([]);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-card">
      {/* Compact Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Cart ({cart.length})</h2>
        </div>
        <div className="flex gap-1">
          <Button variant="default" size="sm"
            onClick={handleClearCart}
            disabled={cart.length === 0}
            className="h-7 px-2 text-xs"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear
          </Button>
          {/* <Button variant="outline" size="sm"
            disabled={cart.length === 0}
            className="h-7 px-2 text-xs"
          >
            <Save className="h-3 w-3 mr-1" />
            Hold
          </Button> */}
        </div>
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1 min-h-0">
        {cart.length > 0 ? (
          <div className="divide-y">
            {cart.map((item, index) => (
              <div key={index} className="p-3 hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    {index + 1}.
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight truncate">{item.productName}</h3>
                    <h6 className="text-[9px] text-muted-foreground mt-0.5">{item.sku}</h6>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ৳ {item.sellingPrice.toFixed(2)}/ {item.unitType} X {item.buyquantity ?? 1} = <span className="font-semibold text-black"> ৳ {(item.sellingPrice * (item.buyquantity ?? 1)).toFixed(2)}</span>
                    </p>
                    {/* {item.discount > 0 && (
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
                    )} */}
                  </div>
                  <div className="text-right">
                    {/* <div className="font-bold text-sm">${item.total.toFixed(2)}</div> */}
                    {/* {item.discount > 0 && (
                      <div className="text-xs text-muted-foreground line-through">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    )} */}
                    <div className="flex items-center mt-1 bg-muted/50 rounded p-0.5">
                      <Button
                        variant="default"
                        size="sm"
                        className="h-6 w-6 p-0 dark:text-black"
                        onClick={() => handleUpdateQuantity(item._id, (item.buyquantity ?? 1) - 1)}
                        disabled={(item.buyquantity ?? 1) <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-xs font-medium">{item.buyquantity}</span>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleUpdateQuantity(item._id, (item.buyquantity ?? 1) + 1)}
                        disabled={(item.buyquantity ?? 1) >= item.quantity}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex mt-2 gap-1 flex-wrap flex-row-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item._id)}
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
      {cart.length > 0 &&
        <div className="p-3 border-t bg-muted/10">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              {cart.length > 0 &&
                <span>৳ {subtotalValue.toFixed(2)}</span>
              }
            </div>
            {/* <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div> */}
            <div className="flex justify-between items-center">
              <span className="flex items-center flex-wrap gap-1">
                Discount
                <span className="flex gap-1 flex-wrap items-center">
                  <Select value={discountType} onValueChange={setDiscountType}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Type Discount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="percent">Percent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-16 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />

                </span>
              </span>
              <div className="flex items-center gap-1">
                <span>
                  {cart.length > 0 &&
                    `৳ ${discountValue.toFixed(2)} (${discountType === 'cash' ? `৳ ${Number(discount).toFixed(2)}` : `${Number(discount).toFixed(2)}%`})`
                  }
                </span>
              </div>
            </div>

            <Separator className="my-1" />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              {/* <span>${total.toFixed(2)}</span> */}
              <span>৳ {totalValue.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-3">
              {/* <Button variant="outline" disabled={cart.length === 0} className="h-8 text-xs">
              <Printer className="h-3 w-3 mr-1" />
              Receipt
            </Button> */}
              <div className="flex items-center justify-center">
                <Button
                  className="bg-primary h-8 text-xs font-semibold"
                  disabled={cart.length === 0}
                // onClick={() => setIsPaymentModalOpen(true)}
                >
                  <CreditCard className="h-3 w-3 mr-1" />
                  Pay
                  {/* ${total.toFixed(2)} */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      }


      {/* Payment Modal */}
      {/* <POSPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
      /> */}
    </div>
  );
}