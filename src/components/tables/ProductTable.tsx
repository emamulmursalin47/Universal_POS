// components/tables/ProductTable.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  DollarSign,
  Barcode
} from 'lucide-react';
import { Product } from '@/types/products';


interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onToggleStatus: (productId: string) => void;
  onDelete: (productId: string) => void;
  onAddNew: () => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onToggleStatus,
  onDelete,
  onAddNew,
  onClearFilters,
  hasFilters
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return 'out';
    if (product.stock <= product.minStock) return 'low';
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
          {hasFilters ? 'No products found' : 'No products yet'}
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          {hasFilters 
            ? 'Try adjusting your search criteria or filters to find products.'
            : 'Get started by adding your first product to the inventory.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {hasFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
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
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">
                    {product.id}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Buy:</span>
                        <span className="font-medium">{formatCurrency(product.buyPrice)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sell:</span>
                        <span className="font-medium text-green-600">{formatCurrency(product.sellPrice)}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Margin: {getProfitMargin(product.buyPrice, product.sellPrice)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {getStockBadge(product)}
                      <div className="text-sm">
                        <span className="font-medium">{product.stock}</span> units
                      </div>
                      {product.stock <= product.minStock && product.stock > 0 && (
                        <div className="flex items-center text-yellow-600 text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Below min ({product.minStock})
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-mono text-sm">
                      <Barcode className="h-3 w-3" />
                      {product.barCode}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.status === 'active' ? 'default' : 'secondary'}
                      className={product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {product.status}
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
                        onClick={() => onToggleStatus(product.id)}
                        className="h-8 w-8 p-0"
                      >
                        {product.status === 'active' ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product.id)}
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

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="font-medium text-lg">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.description}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                      <span className="text-xs text-gray-400 font-mono">ID: {product.id}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={product.status === 'active' ? 'default' : 'secondary'}
                    className={product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {product.status}
                  </Badge>
                </div>

                {/* Pricing Info */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <DollarSign className="h-3 w-3" />
                      Buy Price
                    </div>
                    <div className="font-medium">{formatCurrency(product.buyPrice)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <DollarSign className="h-3 w-3" />
                      Sell Price
                    </div>
                    <div className="font-medium text-green-600">{formatCurrency(product.sellPrice)}</div>
                  </div>
                </div>

                {/* Stock and Barcode */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    {getStockBadge(product)}
                    <div className="text-sm">
                      <span className="font-medium">{product.stock}</span> units available
                    </div>
                    {product.stock <= product.minStock && product.stock > 0 && (
                      <div className="flex items-center text-yellow-600 text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Below minimum stock ({product.minStock})
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Barcode className="h-3 w-3" />
                      Barcode
                    </div>
                    <div className="font-mono text-sm">{product.barCode}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-xs text-gray-400">
                    Profit Margin: {getProfitMargin(product.buyPrice, product.sellPrice)}%
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(product)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus(product.id)}
                    >
                      {product.status === 'active' ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Disable
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Enable
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;