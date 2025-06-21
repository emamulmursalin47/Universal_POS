import { useCallback, useState, useEffect } from "react";
import { POSCart } from '@/components/cashier/POSCart';
import { POSProductGrid } from "@/components/cashier/POSProductGrid";
import RealTimeClock from "@/lib/realTimeClock";
import { Calendar } from "lucide-react";
import { Product, Category, Customer } from "@/lib/types";
// Ensure that the 'Customer' type here matches the one used in POSCartProps
import axios from "axios";
import CustomerSelector from "@/components/cashier/CustomerSelector";

const CashierPOS = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [cart, setCart] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/product/all-product', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      });
      // console.log(response.data.data);
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
      // console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/customer/all-customers', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      });
      // console.log("Customers", response.data.data);
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, []);


  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCustomers();
  }, [fetchProducts, fetchCategories, fetchCustomers]);

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
        <div className="text-right text-sm text-muted-foreground flex items-center gap-1 ">
          {/* {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} */}
          <Calendar className="h-4 w-4" /> <RealTimeClock />
        </div>
      </div>

      {/* Compact Customer Bar */}
      <CustomerSelector
        selectedCustomer={selectedCustomer}
        onCustomerSelect={setSelectedCustomer}
        customers={customers}

      />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-2 min-h-0">
          <POSProductGrid products={products} categories={categories} cart={cart} setCart={setCart} />
        </div>
        <div className="min-h-0">
          <POSCart
            selectedCustomer={selectedCustomer}
            cart={cart}
            setCart={setCart}
            products={products}
            catregories={categories}
          />
        </div>
      </div>
    </div>
  );
}

export default CashierPOS;