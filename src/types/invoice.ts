export type InvoiceItem = {
  _id: string;
  productId: string;
  productName: string;
  quantity: number;
  sellingPrice: number;
  totalAmount: number;
};

export type CustomerInfo = {
  customerId: string;
  name: string;
  email: string;
  contact: string;
  address: string;
};

export type Invoice = {
  _id: string;
  invoiceId: string;
  customerInfo: CustomerInfo;
  invoiceItems: InvoiceItem[];
  subTotalAmount: number;
  totalAmount: number;
  discount: number;
  dueAmount: number;
  invoiceDate: string; // ISO string format
  transactionType: 'Cash' | 'Card' | 'Mobile Banking' | string; // extend as needed
  paymentStatus: 'paid' | 'unpaid' | 'partial' | string; // extend as needed
  staffId: string;
  createdAt: string;
  updatedAt: string;
};