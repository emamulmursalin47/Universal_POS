import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Package,
  AlertTriangle,
  Barcode
} from 'lucide-react';
import { Product } from '@/types/products';


interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onToggleStatus: (productId: string) => void;
  onDelete: (productId: string) => void;
  onAddNew: () => void;
  minStockLevel: number;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onToggleStatus,
  onDelete,
  onAddNew,
  minStockLevel
}) => {
  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD'
  //   }).format(amount);
  // };

  const getStockStatus = (product: Product) => {
    if (product.quantity === 0) return 'out';
    if (product.quantity <= minStockLevel) return 'low';
    return 'good';
  };

  const getStockBadge = (product: Product) => {
    const status = getStockStatus(product);
    switch (status) {
      case 'out':
        return <Badge variant="destructive">Out of Stock</Badge>;
      case 'low':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      default:
        return <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>;
    }
  };

  const getProfitMargin = (buyPrice: number, sellPrice: number) => {
    if (buyPrice === 0) return 0;
    return ((sellPrice - buyPrice) / buyPrice * 100).toFixed(1);
  };

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Get started by adding your first product to the inventory.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Sl.</TableHead>
                <TableHead className="w-[100px]">Product ID</TableHead>
                <TableHead>Product Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm text-center">{index + 1}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {product.sku}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{product.productName}</div>
                      {/* <div className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </div> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category.categoryName}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Buy:</span>
                        <span className="font-medium">{(product.buyPrice)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sell:</span>
                        <span className="font-medium text-green-600">{(product.sellingPrice)}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Margin: {getProfitMargin(product.buyPrice, product.sellingPrice)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {getStockBadge(product)}
                      <div className="text-sm">
                        <span className="font-medium">{product.quantity}</span> units
                      </div>
                      {product.quantity <= minStockLevel && product.quantity > 0 && (
                        <div className="flex items-center text-yellow-600 text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Below min ({minStockLevel})
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-mono text-sm">
                      <Barcode className="h-3 w-3" />
                      {product.barCodeNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.isActive ? 'default' : 'secondary'}
                      className={product.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleStatus(product._id)}
                        className="h-8 w-8 p-0"
                      >
                        {product.isActive ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product._id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;