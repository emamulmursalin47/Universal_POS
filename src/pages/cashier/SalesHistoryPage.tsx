import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Receipt } from 'lucide-react';
// import { MOCK_SALES } from '@/lib/constants';
import axios from 'axios';
import { Invoice } from '@/types/invoice';
import RealTimeClock from '@/lib/realTimeClock';
import { useNavigate } from "react-router-dom";


export default function SalesHistoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState<Invoice[]>([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [todaySales, setTodaySales] = useState<Invoice[]>([]);
  const today = new Date().toISOString().split('T')[0];
  const handleViewReceipt = (invoiceId: string) => {
    console.log(invoiceId);
    navigate(`/cashier/recipt/${invoiceId}`);
  };

  const getUpperDision = useCallback((salesData: Invoice[]) => {
    const filteredSales = salesData.filter(sale => sale.createdAt.startsWith(today));
    setTodaySales(filteredSales);

    const total = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    setTodayTotal(total);
    setAverageOrderValue(total / (filteredSales.length || 1));

    console.log(filteredSales);
    console.log(total);
    console.log(total / (filteredSales.length || 1));
  }, [today]);

  const fetchSales = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/invoice/all-invoice', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data.data);
      setSales(response.data.data);
      getUpperDision(response.data.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
      return [];
    }
  }, [getUpperDision]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Sales History</h1>
        {/* <Button>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button> */}
        <RealTimeClock />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {todayTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySales.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {averageOrderValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="font-bold">
                  <TableHead className="text-center">Sl.</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Transaction Type</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.filter(sale => sale.createdAt.startsWith(today)).map((sale, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">{sale.invoiceId}</div>
                    </TableCell>
                    <TableCell>
                      {new Date(sale.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                      <br />
                      {new Date(sale.createdAt).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>{sale.invoiceItems.length} {sale.invoiceItems.length > 1 ? 'items' : 'item'}</TableCell>
                    <TableCell className={`capitalize`}>
                      <span className={`px-4 py-2 rounded-full font-medium ${sale.paymentStatus === 'paid' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                        {sale.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="capitalize">{sale.transactionType}</TableCell>
                    {/* <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                        sale.status === 'refunded' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {sale.status}
                      </span>
                    </TableCell> */}
                    <TableCell>৳ {sale.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm"
                        onClick={() => handleViewReceipt(sale.invoiceId)}>
                        <Receipt className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}