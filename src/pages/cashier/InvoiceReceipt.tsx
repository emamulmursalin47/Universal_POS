import React, { useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Mail, Phone, MapPin, Receipt, CreditCard } from 'lucide-react';
import { useParams } from "react-router-dom";
import axios from 'axios';

interface CustomerInfo {
    customerId: string;
    name: string;
    email: string;
    contact: string;
    address: string;
}

interface InvoiceItem {
    _id: string;
    productId: string;
    sku: string;
    productName: string;
    quantity: number;
    sellingPrice: number;
    totalAmount: number;
}

interface StaffInfo {
    _id: string;
    userId: string;
    user: string;
    email: string;
    vendorId: string;
    fullName: string;
    contactNumber: string;
    address: string;
    databaseName: string;
    role: string;
    status: string;
    isDeleted: boolean;
    createdAt: string; // ISO string or Date
    updatedAt: string;
}

export interface Invoice {
    _id: string;
    invoiceId: string;
    customerInfo: CustomerInfo;
    invoiceItems: InvoiceItem[];
    subTotalAmount: number;
    totalAmount: number;
    discount: number;
    dueAmount: number;
    invoiceDate: string;
    transactionType: string;
    paymentStatus: 'paid' | 'unpaid' | 'partial'; // can expand if needed
    staffId: StaffInfo;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


const InvoiceReceipt: React.FC = () => {
    const { invoiceId } = useParams<{ invoiceId: string }>();
    const [invoiceData, setInvoiceData] = React.useState<Invoice | null>(null);
    // Sample data based on the API response    

    const fetchInvoice = useCallback(async (invoiceId: string) => {
        try {
            const response = await axios.get(`/api/v1/invoice/single-invoice/${invoiceId}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log(response.data.data);
            setInvoiceData(response.data.data);
            //   return response.data.data;
        } catch (error) {
            console.error('Error fetching invoice:', error);
            //   return null;
        }
    }, []);

    useEffect(() => {
        if (invoiceId) {
            fetchInvoice(invoiceId);
        }
    }, [fetchInvoice, invoiceId]);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }); // e.g., "10 Jan 2025"

        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }); // e.g., "10:20 AM"

        return `${formattedDate} at ${formattedTime}`;
    };

    const formatCurrency = (amount: number) => {
        return `৳ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };


    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800 border-green-200 text-lg hover:bg-transperent';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 text-lg hover:bg-transperent';
            case 'overdue':
            case 'unpaid':
                return 'bg-red-100 text-red-800 border-red-200 text-lg hover:bg-transperent';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200 text-lg hover:bg-transperent';
        }
    };

    if (!invoiceData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader className="">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">INVOICE RECEIPT</h1>
                                {/* <p className="text-gray-600">Thank you for your business</p> */}
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-mono font-bold mb-2">
                                    {invoiceData.invoiceId}
                                </div>
                                <Badge className={getStatusColor(invoiceData.paymentStatus)}>
                                    <CreditCard className="w-6 h-6 mr-1" />
                                    {invoiceData.paymentStatus.toUpperCase()}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8">
                        {/* Invoice Details */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-lg font-semibold flex items-center">
                                    <User className="w-5 h-5 mr-2" />
                                    Bill To
                                </h3>
                                <div className=" text-gray-700">
                                    <p className="font-medium text-lg">{invoiceData.customerInfo.name}</p>
                                    {
                                        invoiceData.customerInfo.email &&
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{invoiceData.customerInfo.email}</span>
                                        </div>
                                    }
                                    {
                                        invoiceData.customerInfo.contact &&
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                            <span>{invoiceData.customerInfo.contact}</span>
                                        </div>
                                    }
                                    {
                                        invoiceData.customerInfo.address &&
                                        <div className="flex items-start">
                                            <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-500" />
                                            <span>{invoiceData.customerInfo.address}</span>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold flex items-center">
                                    <Receipt className="w-5 h-5 mr-2" />
                                    Invoice Details
                                </h3>
                                <div className="text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Invoice Date:</span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {formatDate(invoiceData.invoiceDate)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Staff:</span>
                                        <span className="font-mono">{invoiceData.staffId.fullName}({invoiceData.staffId.userId})</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Transaction Type:</span>
                                        <span className="capitalize font-medium">{invoiceData.transactionType}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8" />

                        {/* Items Table */}
                        <div className="">
                            <h3 className="text-lg font-semibold mb-4 text-center">Items</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-center">
                                            <th className="border border-gray-200 px-4 py-3 font-semibold w-[5px]">Sl.</th>
                                            <th className="border border-gray-200 px-4 py-3 font-semibold">Product</th>
                                            <th className="border border-gray-200 px-4 py-3 font-semibold">Qty</th>
                                            <th className="border border-gray-200 px-4 py-3 font-semibold">Unit Price</th>
                                            <th className="border border-gray-200 px-4 py-3 font-semibold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData.invoiceItems.map((item, index) => (
                                            <tr key={item._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                                                <td className="border border-gray-200 px-4 text-center">{index + 1}</td>
                                                <td className="border border-gray-200 px-4">
                                                    <div>
                                                        <p className="font-medium">{item.productName}</p>
                                                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-200 px-4 text-center">{item.quantity}</td>
                                                <td className="border border-gray-200 px-4 text-right">{formatCurrency(item.sellingPrice)}</td>
                                                <td className="border border-gray-200 px-4 text-right font-medium">{formatCurrency(item.totalAmount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-full max-w-sm">
                                <div className="">
                                    <div className="flex justify-between py-2 px-4">
                                        <span>Subtotal:</span>
                                        <span>{formatCurrency(invoiceData.subTotalAmount)}</span>
                                    </div>
                                    {invoiceData.discount > 0 && (
                                        <div className="flex justify-between py-2 text-green-600 px-4">
                                            <span>Discount:</span>
                                            <span>-{formatCurrency(invoiceData.discount)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between py-2 text-xl font-bold px-4">
                                        <span>Total Amount:</span>
                                        <span>{formatCurrency(invoiceData.totalAmount)}</span>
                                    </div>
                                    {invoiceData.dueAmount > 0 && (
                                        <div className="flex justify-between py-2 text-red-600 font-semibold px-4">
                                            <span>Due Amount:</span>
                                            <span>{formatCurrency(invoiceData.dueAmount)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8" />

                        {/* Footer */}
                        <div className="text-center text-gray-500 space-y-2">
                            {/* <p className="text-sm">Thank you for your business!</p> */}
                            <p className="text-xs">
                                Generated on {formatDate(invoiceData.createdAt)} | Invoice ID: {invoiceData.invoiceId}
                                <br />
                                Printed at {formatDate(new Date().toISOString())}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Print Button */}
                {/* <div className="mt-6 text-center">
                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-colors print:hidden"
                    >
                        Print Receipt
                    </button>
                </div> */}
            </div>

            {/* Print Styles */}
            {/* <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .min-h-screen {
            min-height: auto;
          }
          .shadow-lg {
            box-shadow: none !important;
          }
          .bg-gray-50 {
            background: white !important;
          }
        }
      `}</style> */}
        </div>
    );
};

export default InvoiceReceipt;