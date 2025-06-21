import { useCallback, useState, useEffect } from 'react';
// import { POSCart } from '@/components/cashier/POSCart';
import { POSProductGrid } from '@/components/cashier/POSProductGrid';
// import { useAuth } from '@/hooks/useAuth';
// import { MOCK_SHOPS } from '@/lib/constants';
import RealTimeClock from '@/lib/realTimeClock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {

  Phone,
  UserPlus,
  Search,
  X,
  Edit,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product,Category } from '@/lib/types';
import axios from 'axios';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalPurchases?: number;
  lastVisit?: string;
}

// Mock customer data - in real app, this would come from API
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    totalPurchases: 1250.50,
    lastVisit: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+1987654321',
    email: 'jane@example.com',
    totalPurchases: 850.25,
    lastVisit: '2024-01-10'
  }
];

interface CustomerSelectorProps {
  selectedCustomer: Customer | null;
  onCustomerSelect: (customer: Customer | null) => void;
}

function CustomerSelector({ selectedCustomer, onCustomerSelect }: CustomerSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);

  const filteredCustomers = customers.filter(customer =>
    customer.phone.includes(phoneSearch) ||
    customer.name.toLowerCase().includes(phoneSearch.toLowerCase())
  );

  const handlePhoneSearch = (phone: string) => {
    setPhoneSearch(phone);
    // Auto-select if exact phone match
    const exactMatch = customers.find(c => c.phone === phone);
    if (exactMatch) {
      onCustomerSelect(exactMatch);
      setIsDialogOpen(false);
      setPhoneSearch('');
    }
  };

  const handleAddNewCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) return;

    const customer: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email || undefined,
      totalPurchases: 0,
      lastVisit: new Date().toISOString().split('T')[0]
    };

    // In real app, this would be an API call
    customers.push(customer);
    onCustomerSelect(customer);
    setNewCustomer({ name: '', phone: '', email: '' });
    setIsAddingNew(false);
    setIsDialogOpen(false);
    setPhoneSearch('');
  };

  const removeCustomer = () => {
    onCustomerSelect(null);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
      <Phone className="h-4 w-4 text-muted-foreground" />
      {selectedCustomer ? (
        <div className="flex items-center justify-between flex-1">
          <div className="flex items-center gap-3">
            <span className="font-medium">{selectedCustomer.name}</span>
            <span className="text-sm text-muted-foreground">{selectedCustomer.phone}</span>
            {selectedCustomer.totalPurchases !== undefined && (
              <Badge variant="outline" className="text-xs">
                ${selectedCustomer.totalPurchases.toFixed(0)}
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
              onClick={removeCustomer}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Enter customer phone number..."
            value={phoneSearch}
            onChange={(e) => handlePhoneSearch(e.target.value)}
            className="flex-1 h-8"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Search className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Customer Search & Management</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Search by Phone or Name</Label>
                  <Input
                    placeholder="Phone number or customer name..."
                    value={phoneSearch}
                    onChange={(e) => setPhoneSearch(e.target.value)}
                  />
                </div>

                {filteredCustomers.length > 0 && !isAddingNew && (
                  <div className="space-y-2 max-h-60 overflow-auto">
                    <Label className="text-sm font-medium">Existing Customers</Label>
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => {
                          onCustomerSelect(customer);
                          setIsDialogOpen(false);
                          setPhoneSearch('');
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.phone}</p>
                            {customer.email && (
                              <p className="text-xs text-muted-foreground">{customer.email}</p>
                            )}
                          </div>
                          {customer.totalPurchases !== undefined && (
                            <Badge variant="outline" className="text-xs">
                              ${customer.totalPurchases.toFixed(0)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!isAddingNew ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsAddingNew(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Customer
                  </Button>
                ) : (
                  <div className="space-y-3 p-3 border rounded-md bg-muted/50">
                    <Label className="text-sm font-medium">Add New Customer</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Customer Name *"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      />
                      <Input
                        placeholder="Phone Number *"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      />
                      <Input
                        placeholder="Email (Optional)"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleAddNewCustomer}
                        disabled={!newCustomer.name || !newCustomer.phone}
                        className="flex-1"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsAddingNew(false);
                          setNewCustomer({ name: '', phone: '', email: '' });
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <span className="text-xs text-muted-foreground whitespace-nowrap">or search</span>
        </div>
      )}
    </div>
  );
}

export default function CashierPOS() {
  // const { user } = useAuth();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/product/all-product', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/category/all-category', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // In a real app, we would fetch the shop data from API
  // const shopData = user?.shopId 
  //   ? MOCK_SHOPS.find(shop => shop.id === user.shopId) 
  //   : null;

  return (
    <div className="h-screen flex flex-col p-4 gap-3 overflow-hidden">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Point of Sale</h1>
          {/* {shopData && (
            <p className="text-sm text-muted-foreground">{shopData.name}</p>
          )} */}
        </div>
        <div className="text-right text-sm text-muted-foreground">
          {/* {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} */}
          <RealTimeClock />
        </div>
      </div>

      {/* Compact Customer Bar */}
      <CustomerSelector
        selectedCustomer={selectedCustomer}
        onCustomerSelect={setSelectedCustomer}
      />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-2 min-h-0">
          <POSProductGrid products={products} categories={categories} />
        </div>
        {/* <div className="min-h-0">
          <POSCart  />
        </div> */}
      </div>
    </div>
  );
}