// types.ts
export interface ShopSettings {
  id: string;
  shopName: string;
  address: string;
  contactNumber: string;
  taxId?: string;
  currency: string;
  timezone: string;
  receiptFooter?: string;
}

export interface POSSettings {
  id: string;
  barcodeScanner: boolean;
  cashDrawer: boolean;
  receiptPrinter: boolean;
  defaultPaymentMethod: string;
  autoPrintReceipts: boolean;
}

export interface TaxSettings {
  id: string;
  name: string;
  rate: number;
  isActive: boolean;
}