import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/lib/types';

interface CartItem {
  product: Product;
  quantity: number;
  discount: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  customer: string | null;
  paymentMethod: 'cash' | 'card' | 'other' | null;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  total: 0,
  customer: null,
  paymentMethod: null,
};

const calculateCartTotals = (state: CartState) => {
  state.subtotal = state.items.reduce((sum, item) => sum + item.total, 0);
  state.tax = Number((state.subtotal * 0.1).toFixed(2)); // Example tax rate of 10%
  state.total = Number((state.subtotal + state.tax - state.discount).toFixed(2));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = Number((existingItem.product.price * existingItem.quantity - existingItem.discount).toFixed(2));
      } else {
        state.items.push({
          product,
          quantity,
          discount: 0,
          total: Number((product.price * quantity).toFixed(2)),
        });
      }
      
      calculateCartTotals(state);
    },
    
    updateItemQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        item.quantity = quantity;
        item.total = Number((item.product.price * item.quantity - item.discount).toFixed(2));
        calculateCartTotals(state);
      }
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      calculateCartTotals(state);
    },
    
    applyItemDiscount: (state, action: PayloadAction<{ productId: string; discount: number }>) => {
      const { productId, discount } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        item.discount = discount;
        item.total = Number((item.product.price * item.quantity - item.discount).toFixed(2));
        calculateCartTotals(state);
      }
    },
    
    applyCartDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      calculateCartTotals(state);
    },
    
    setCustomer: (state, action: PayloadAction<string | null>) => {
      state.customer = action.payload;
    },
    
    setPaymentMethod: (state, action: PayloadAction<'cash' | 'card' | 'other' | null>) => {
      state.paymentMethod = action.payload;
    },
    
    clearCart: (state) => {
      return initialState;
    },
  },
});

export const {
  addItem,
  updateItemQuantity,
  removeItem,
  applyItemDiscount,
  applyCartDiscount,
  setCustomer,
  setPaymentMethod,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;