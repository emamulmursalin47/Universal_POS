import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cartSlice';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/lib/types';

export function POSProductGrid() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ product, quantity: 1 }));
  };

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.barcode?.includes(searchTerm) ||
                         product.sku.includes(searchTerm);
    const matchesCategory = activeTab === 'all' || product.categoryId === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, scan barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-flow-col auto-cols-max gap-2 overflow-auto pb-2">
          <TabsTrigger value="all">All Products</TabsTrigger>
          {MOCK_CATEGORIES.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="flex-1 mt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleAddToCart(product)}
                >
                  <div className="aspect-square bg-muted relative">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-tl-md">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                    <div className="mt-1 text-xs">
                      <span className={product.stock > 10 ? "text-green-500" : "text-amber-500"}>
                        Stock: {product.stock}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-32 bg-muted/50 rounded-md">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}