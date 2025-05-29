import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cartSlice';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/lib/types';

export function POSProductGrid() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; // Show more items per page

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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when search or category changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out', color: 'text-red-600 bg-red-50' };
    if (stock <= 5) return { text: 'Low', color: 'text-amber-600 bg-amber-50' };
    return { text: 'OK', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-card">
      {/* Compact Search Bar */}
      <div className="flex items-center gap-2 p-3 border-b">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search products, scan barcode..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-7 h-8 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Filter className="h-3 w-3" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0">
        {/* Compact Category Tabs */}
        <div className="px-3 pt-2">
          <TabsList className="grid grid-flow-col auto-cols-max gap-1 h-8">
            <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
            {MOCK_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs px-2">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="flex-1 mt-2 flex flex-col min-h-0">
          {/* Compact Results Summary */}
          <div className="flex justify-between items-center px-3 pb-2 text-xs text-muted-foreground">
            <span>{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}</span>
            <span>Page {currentPage}/{totalPages}</span>
          </div>

          {/* Compact Product Table */}
          <div className="flex-1 mx-3 border rounded overflow-hidden min-h-0">
            <div className="overflow-auto h-full">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 sticky top-0 z-10">
                  <tr className="border-b text-xs">
                    <th className="text-left p-2 font-medium">Product</th>
                    <th className="text-left p-2 font-medium w-20">SKU</th>
                    <th className="text-right p-2 font-medium w-16">Price</th>
                    <th className="text-center p-2 font-medium w-12">Stock</th>
                    <th className="text-center p-2 font-medium w-16">Status</th>
                    <th className="text-center p-2 font-medium w-16">Add</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product, index) => {
                      const stockStatus = getStockStatus(product.stock);
                      return (
                        <tr 
                          key={product.id} 
                          className={`border-b hover:bg-accent cursor-pointer transition-colors text-sm ${
                            index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                          }`}
                          onClick={() => handleAddToCart(product)}
                        >
                          <td className="p-2">
                            <div className="font-medium leading-tight">{product.name}</div>
                            {product.barcode && (
                              <div className="text-xs text-muted-foreground font-mono">{product.barcode}</div>
                            )}
                          </td>
                          <td className="p-2 font-mono text-xs">{product.sku}</td>
                          <td className="p-2 text-right font-bold">${product.price.toFixed(2)}</td>
                          <td className="p-2 text-center font-medium">{product.stock}</td>
                          <td className="p-2 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${stockStatus.color}`}>
                              {stockStatus.text}
                            </span>
                          </td>
                          <td className="p-2 text-center">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              disabled={product.stock === 0}
                              className="h-6 px-2 text-xs"
                            >
                              +
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-muted-foreground text-sm">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compact Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-3 border-t mt-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-7 px-2 text-xs"
              >
                <ChevronLeft className="h-3 w-3 mr-1" />
                Prev
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="h-7 w-7 p-0 text-xs"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-7 px-2 text-xs"
              >
                Next
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}