// components/products/ProductCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types/products';
import { MOCK_CATEGORIES } from '@/constants/products';
import { getStockStatus } from '@/utils/products';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete
}) => {
  const category = MOCK_CATEGORIES.find(c => c.id === product.categoryId);
  const stockStatus = getStockStatus(product.stock);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  SKU: {product.sku}
                </p>
                <p className="text-sm text-gray-500">
                  {category?.name || 'Uncategorized'}
                </p>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-600">
                  Stock: {product.stock}
                </span>
              </div>
              <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1 hover:bg-blue-50 hover:border-blue-300"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(product)}
                className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;