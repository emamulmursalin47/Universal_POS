import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, EyeIcon, EyeOffIcon, BarcodeIcon } from "lucide-react";
import type { Product, Category } from "@/lib/types";

interface POSProductGridProps {
  products: Product[];
  categories: Category[];
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function POSProductGrid({ products, categories, cart, setCart }: POSProductGridProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");
  const [showBuyPrice, setShowBuyPrice] = useState(false);


  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item._id === product._id)
    if (!existingItem) {
      setCart((prevCart: Product[]) => [...prevCart, { ...product, buyquantity: 1 }]);
    }
  };

  const handleSearchAddToCart = (value: string) => {
    // console.log('Add to cart:', value);
    products.filter((product) => {
      if (product.barCodeNumber == value) {
        handleAddToCart(product);
        setSearchTerm('');
      }
    });
  };

  // search by name, sku, or bar code
  const filteredProducts = products.filter((product) => {
    // console.log('product', product);
    // console.log('searchTerm', searchTerm);
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      || product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeTab === 'all' || product.category._id === activeTab;
    return matchesSearch && matchesCategory;
  });

  // Reset to first page when search or category changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleShowBuyPriceChange = (value: boolean) => {
    setShowBuyPrice(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out', color: 'text-red-600 bg-red-50 px-3 py-1 rounded-xl' };
    if (stock <= 5) return { text: 'Low', color: 'text-amber-600 bg-amber-50 px-3 py-1 rounded-xl' };
    return { text: 'OK', color: 'text-green-600 bg-green-50 px-3 py-1 rounded-xl' };
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-card pb-2">
      {/* Compact Search Bar */}
      <div className="flex items-center gap-2 p-3 border-b">
        <div className="flex items-center gap-2 relative">
          <BarcodeIcon className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
          <Input
            id="barcode"
            placeholder="Scan barcode"
            onChange={(f) => handleSearchAddToCart(f.target.value)}
            onKeyDown={(g) => {
              if (g.key === 'Enter') {
                handleSearchAddToCart((g.target as HTMLInputElement).value);
              }
            }}
            className="pl-7 h-8 text-sm"
          />
        </div>

        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
          <Input
            id="searchProduct"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-7 h-8 text-sm"
          />
        </div>
        <Button
          variant="outline" size="sm" className="h-8 w-8 p-0"
          onClick={() => handleShowBuyPriceChange(!showBuyPrice)}
          title={showBuyPrice ? 'Hide Buy Price' : 'Show Buy Price'}
        >
          {showBuyPrice ? <EyeOffIcon className="h-3 w-3" /> : <EyeIcon className="h-3 w-3" />}
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0">
        {/* Compact Category Tabs */}
        <div className="px-3 pt-2">
          <TabsList className="grid grid-flow-col auto-cols-max gap-1 h-8">
            <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category._id} value={category._id} className="text-xs px-2">
                {category.categoryName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="flex-1 mt-2 flex flex-col min-h-0">
          {/* Compact Results Summary */}
          <div className="flex justify-between items-center px-3 pb-2 text-xs text-muted-foreground">
            <span>{filteredProducts.length} out of {products.length} products</span>
          </div>

          {/* Compact Product Table */}
          <div className="flex-1 mx-3 border rounded overflow-hidden min-h-0">
            <div className="overflow-auto h-full">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 sticky top-0 z-10">
                  <tr className="border-b text-xs">
                    <th className="text-center p-2 font-medium w-5">Sl.</th>
                    <th className="text-left p-2 font-medium">Product</th>
                    <th className="text-left p-2 font-medium w-12">SKU</th>
                    {
                      showBuyPrice && (
                        <th className="text-right p-2 font-medium w-12">Buy Price</th>
                      )
                    }
                    <th className="text-right p-2 font-medium w-12">Sell Price</th>
                    <th className="text-center p-2 font-medium w-12">Stock</th>
                    <th className="text-center p-2 font-medium w-16">Status</th>
                    <th className="text-center p-2 font-medium w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => {
                      const stockStatus = getStockStatus(product.quantity);
                      return (
                        <tr
                          key={index}
                          className={`border-b hover:bg-accent cursor-pointer transition-colors text-sm ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                            }`}
                        // onClick={() => handleAddToCart(product)}
                        >
                          <td className="p-2 text-center">{index + 1}</td>
                          <td className="p-2">
                            <div className="font-medium leading-tight">{product.productName}</div>
                            {product.barCodeNumber && (
                              <div className="text-xs text-muted-foreground font-mono">{product.barCodeNumber}</div>
                            )}
                          </td>
                          <td className="p-2 font-mono text-xs">{product.sku}</td>
                          {
                            showBuyPrice && (
                              <td className="p-2 text-right font-bold">৳{product.buyPrice.toFixed(2)}</td>
                            )}
                          <td className="p-2 text-right font-bold">৳{product.sellingPrice.toFixed(2)}</td>
                          <td className="p-2 text-center font-medium">{product.quantity}</td>
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
                              disabled={product.quantity === 0}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}