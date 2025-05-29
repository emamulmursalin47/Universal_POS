// pages/InventoryPage.tsx
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

import { Search, Package, AlertTriangle, MoreHorizontal, History, Users, TrendingUp } from 'lucide-react';
import { Product, StockAdjustmentFormData } from '@/types/inventory';
import { useStockAdjustment } from '@/hooks/useStockAdjustment';

import { MOCK_PRODUCTS } from '@/lib/constants';
import { toast } from '@/hooks/use-toast';
import StockAdjustmentModal from '@/components/modals/StockAdjustmentModal';
import BulkStockAdjustmentModal from '@/components/modals/BulkStockAdjustmentModal';
import StockAdjustmentHistoryModal from '@/components/modals/StockAdjustmentHistoryModal';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [showBulkAdjustmentModal, setShowBulkAdjustmentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyProduct, setHistoryProduct] = useState<Product | null>(null);
  
  // Mock products with state management
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  
  const {
    adjustments,
    isLoading,
    error,
    adjustStock,
    getAdjustmentHistory,
    clearError
  } = useStockAdjustment();

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const lowStockProducts = useMemo(() => 
    filteredProducts.filter(product => product.stock < 10), [filteredProducts]);
  
  const criticalStockProducts = useMemo(() => 
    filteredProducts.filter(product => product.stock < 5), [filteredProducts]);

  const handleSingleAdjustment = async (data: StockAdjustmentFormData): Promise<boolean> => {
    const product = products.find(p => p.id === data.productId);
    if (!product) return false;

    const success = await adjustStock(data, product);
    
    if (success) {
      // Update product stock in state
      setProducts(prevProducts => 
        prevProducts.map(p => {
          if (p.id === data.productId) {
            let newStock: number;
            switch (data.adjustmentType) {
              case 'increase':
                newStock = p.stock + data.quantity;
                break;
              case 'decrease':
                newStock = Math.max(0, p.stock - data.quantity);
                break;
              case 'set':
                newStock = data.quantity;
                break;
              default:
                newStock = p.stock;
            }
            return { ...p, stock: newStock };
          }
          return p;
        })
      );

      toast({
        title: 'Stock Adjusted',
        description: `Successfully adjusted stock for ${product.name}`,
      });
    }

    return success;
  };

  const handleBulkAdjustment = async (adjustments: StockAdjustmentFormData[]): Promise<boolean> => {
    try {
      let successCount = 0;
      
      for (const adjustment of adjustments) {
        const product = products.find(p => p.id === adjustment.productId);
        if (product) {
          const success = await adjustStock(adjustment, product);
          if (success) {
            successCount++;
            
            // Update product stock
            setProducts(prevProducts => 
              prevProducts.map(p => {
                if (p.id === adjustment.productId) {
                  let newStock: number;
                  switch (adjustment.adjustmentType) {
                    case 'increase':
                      newStock = p.stock + adjustment.quantity;
                      break;
                    case 'decrease':
                      newStock = Math.max(0, p.stock - adjustment.quantity);
                      break;
                    case 'set':
                      newStock = adjustment.quantity;
                      break;
                    default:
                      newStock = p.stock;
                  }
                  return { ...p, stock: newStock };
                }
                return p;
              })
            );
          }
        }
      }

      toast({
        title: 'Bulk Adjustment Complete',
        description: `Successfully adjusted ${successCount} out of ${adjustments.length} products`,
      });

      return successCount > 0;
    } catch {
      return false;
    }
  };

  const openAdjustmentModal = (product: Product) => {
    setSelectedProduct(product);
    setShowAdjustmentModal(true);
    clearError();
  };

  const openHistoryModal = (product?: Product) => {
    setHistoryProduct(product || null);
    setShowHistoryModal(true);
  };

  const getStockStatus = (stock: number) => {
    if (stock > 20) return { text: 'In Stock', variant: 'default' as const, color: 'bg-green-100 text-green-800' };
    if (stock > 10) return { text: 'Low Stock', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' };
    if (stock > 0) return { text: 'Critical', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' };
    return { text: 'Out of Stock', variant: 'destructive' as const, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openHistoryModal()}>
            <History className="h-4 w-4 mr-2" />
            View History
          </Button>
          <Button variant="outline" onClick={() => setShowBulkAdjustmentModal(true)}>
            <Users className="h-4 w-4 mr-2" />
            Bulk Adjustment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              {products.length} total items
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Less than 10 units
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Less than 5 units
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Adjustments</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adjustments.length}</div>
            <p className="text-xs text-muted-foreground">
              This session
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reorder Point</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      {searchTerm ? 'No products found matching your search.' : 'No products available.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    const productAdjustments = getAdjustmentHistory(product.id);
                    const lastAdjustment = productAdjustments[0];
                    
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-8 w-8 rounded object-cover mr-3"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mr-3">
                                <Package className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            <div>
                              <span className="font-medium">{product.name}</span>
                              <div className="text-xs text-muted-foreground">
                                {product.category}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>
                          <span className="font-medium">{product.stock}</span>
                          <span className="text-muted-foreground ml-1">units</span>
                        </TableCell>
                        <TableCell>{product.reorderPoint || 10}</TableCell>
                        <TableCell>
                          <Badge className={stockStatus.color}>
                            {stockStatus.text}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {lastAdjustment ? (
                            <div>
                              {new Date(lastAdjustment.adjustedAt).toLocaleDateString()}
                              <div className="text-xs">
                                {lastAdjustment.adjustmentType} by {lastAdjustment.adjustedBy}
                              </div>
                            </div>
                          ) : (
                            'No recent changes'
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openAdjustmentModal(product)}>
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Adjust Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openHistoryModal(product)}>
                                <History className="h-4 w-4 mr-2" />
                                View History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <StockAdjustmentModal
        isOpen={showAdjustmentModal}
        onClose={() => setShowAdjustmentModal(false)}
        product={selectedProduct}
        onAdjust={handleSingleAdjustment}
        isLoading={isLoading}
        error={error}
      />

      <BulkStockAdjustmentModal
        isOpen={showBulkAdjustmentModal}
        onClose={() => setShowBulkAdjustmentModal(false)}
        products={products}
        onBulkAdjust={handleBulkAdjustment}
        isLoading={isLoading}
        error={error}
      />

      <StockAdjustmentHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        adjustments={historyProduct ? getAdjustmentHistory(historyProduct.id) : adjustments}
        productName={historyProduct?.name}
      />
    </div>
  );
}