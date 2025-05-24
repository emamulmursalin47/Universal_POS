import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart, setPaymentMethod } from '@/redux/slices/cartSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, DollarSign, Smartphone, Check, Printer } from 'lucide-react';

interface POSPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function POSPaymentModal({ isOpen, onClose, total }: POSPaymentModalProps) {
  const dispatch = useDispatch();
  const [paymentTab, setPaymentTab] = useState('cash');
  const [cashAmount, setCashAmount] = useState(total.toFixed(2));
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  const cashAmountNum = parseFloat(cashAmount);
  const change = cashAmountNum - total;
  
  const handlePayment = () => {
    dispatch(setPaymentMethod(paymentTab as 'cash' | 'card' | 'other'));
    
    // In a real app, we would process the payment here
    setPaymentCompleted(true);
    
    // Reset after showing success
    setTimeout(() => {
      dispatch(clearCart());
      setPaymentCompleted(false);
      onClose();
    }, 2000);
  };
  
  const handleCashAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCashAmount(value);
    }
  };
  
  const quickAmounts = [
    { label: 'Exact', value: total },
    { label: '$5', value: 5 },
    { label: '$10', value: 10 },
    { label: '$20', value: 20 },
    { label: '$50', value: 50 },
    { label: '$100', value: 100 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        
        {paymentCompleted ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Successful</h3>
            <p className="text-muted-foreground">Total amount: ${total.toFixed(2)}</p>
            <Button className="mt-6" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
          </div>
        ) : (
          <>
            <Tabs defaultValue="cash" value={paymentTab} onValueChange={setPaymentTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="cash">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Cash
                </TabsTrigger>
                <TabsTrigger value="card">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="other">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Other
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="cash" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Amount Received</label>
                    <Input
                      type="text"
                      value={cashAmount}
                      onChange={handleCashAmountChange}
                      className="text-right text-lg font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount.label}
                        variant="outline"
                        onClick={() => setCashAmount(amount.value.toFixed(2))}
                      >
                        {amount.label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-md">
                    <span className="font-medium">Change</span>
                    <span className="font-bold">
                      ${change >= 0 ? change.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="card" className="space-y-4">
                <div className="p-6 text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Card Payment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Total amount: ${total.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Please process the card payment using your terminal.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="other" className="space-y-4">
                <div className="p-6 text-center">
                  <Smartphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Other Payment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Total amount: ${total.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Process payment using alternative methods like mobile payments or gift cards.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handlePayment}
                disabled={paymentTab === 'cash' && (isNaN(cashAmountNum) || cashAmountNum < total)}
              >
                Complete Payment
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}