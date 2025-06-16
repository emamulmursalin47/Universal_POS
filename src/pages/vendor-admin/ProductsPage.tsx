import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import ProductTable from '@/components/tables/ProductTable';
// import AddProductModal from '@/components/modals/AddProductModal';
// import EditProductModal from '@/components/modals/EditProductModal';
import { Product, ProfitSummary } from '@/types/products';
// import { Product, ProductFormData } from '@/types/products';
import axios from 'axios';


const calculateProfit = (products: Product[], minStockLevel: number): ProfitSummary => {
  let totalBuyPrice = 0;
  let totalSellingPrice = 0;
  let lowStockCount = 0;
  let inStockCount = 0;
  let outOfStockCount = 0;

  for (const product of products) {
    totalBuyPrice += product.buyPrice * product.quantity;
    totalSellingPrice += product.sellingPrice * product.quantity;

    if (product.quantity === 0) {
      outOfStockCount++;
    } else if (product.quantity < minStockLevel) {
      lowStockCount++;
    } else {
      inStockCount++;
    }
  }

  const totalProfit = totalSellingPrice - totalBuyPrice;

  return {
    totalProducts: products.length,
    totalBuyPrice,
    totalSellingPrice,
    totalProfit,
    inStockCount,
    lowStockCount,
    outOfStockCount,
  };
};


const ProductPage: React.FC = () => {
  const minStockLevel = 30;
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [statusFilter, setStatusFilter] = useState<string>('all');
  // const [categoryFilter, setCategoryFilter] = useState<string>('all');
  // const [stockFilter, setStockFilter] = useState<string>('all');
  // const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [productList, setProductList] = useState<Product[]>(MOCK_PRODUCT_DATA);
  const [products, setProducts] = useState<Product[]>([]);
  const [profitSummary, setProfitSummary] = useState<ProfitSummary>({
    totalProducts: 0,
    totalBuyPrice: 0,
    totalSellingPrice: 0,
    totalProfit: 0,
    lowStockCount: 0,
    inStockCount: 0,
    outOfStockCount: 0
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/product/all-product', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`
        },
      });
      console.log(response.data.data);
      setProducts(response.data.data);
      setProfitSummary(calculateProfit(response.data.data, minStockLevel));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Enhanced filtering logic
  // const filteredProducts = useMemo(() => {
  //   return productList.filter(product => {
  //     const matchesSearch =
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.barCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.category.toLowerCase().includes(searchTerm.toLowerCase());

  //     const matchesStatus =
  //       statusFilter === 'all' ||
  //       (statusFilter === 'active' && product.status === 'active') ||
  //       (statusFilter === 'inactive' && product.status === 'inactive');

  //     const matchesCategory =
  //       categoryFilter === 'all' ||
  //       product.category === categoryFilter;

  //     const matchesStock =
  //       stockFilter === 'all' ||
  //       (stockFilter === 'in-stock' && product.stock > product.minStock) ||
  //       (stockFilter === 'low-stock' && product.stock > 0 && product.stock <= product.minStock) ||
  //       (stockFilter === 'out-of-stock' && product.stock === 0);

  //     return matchesSearch && matchesStatus && matchesCategory && matchesStock;
  //   });
  // }, [productList, searchTerm, statusFilter, categoryFilter, stockFilter]);

  // Check if filters are applied
  // const hasFilters = "all";

  // Calculate statistics
  // const stats = useMemo(() => {
  //   const totalProducts = productList.length;
  //   const activeProducts = productList.filter(p => p.status === 'active').length;
  //   const inStockProducts = productList.filter(p => p.stock > p.minStock).length;
  //   const lowStockProducts = productList.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  //   const outOfStockProducts = productList.filter(p => p.stock === 0).length;
  //   const totalValue = productList.reduce((sum, p) => sum + (p.sellPrice * p.stock), 0);
  //   const totalInvestment = productList.reduce((sum, p) => sum + (p.buyPrice * p.stock), 0);

  //   return {
  //     totalProducts,
  //     activeProducts,
  //     inStockProducts,
  //     lowStockProducts,
  //     outOfStockProducts,
  //     totalValue,
  //     totalInvestment,
  //     potentialProfit: totalValue - totalInvestment
  //   };
  // }, [productList]);

  // const handleAddProduct = useCallback((newProductData: ProductFormData) => {
  //   // Check for existing data
  //   const existingProduct = productList.find(product => product.id === newProductData.id);
  //   if (existingProduct) {
  //     alert('Product ID already exists. Please use a unique ID.');
  //     return;
  //   }

  //   const existingBarcode = productList.find(product => product.barCode === newProductData.barCode);
  //   if (existingBarcode) {
  //     alert('Barcode already exists. Please use a unique barcode.');
  //     return;
  //   }

  //   const newProduct: Product = {
  //     id: newProductData.id,
  //     name: newProductData.name,
  //     description: newProductData.description,
  //     category: newProductData.category,
  //     buyPrice: newProductData.buyPrice,
  //     sellPrice: newProductData.sellPrice,
  //     stock: newProductData.stock,
  //     minStock: newProductData.minStock,
  //     barCode: newProductData.barCode,
  //     image: newProductData.image || null,
  //     status: 'active',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   };

  //   setProductList(prev => [...prev, newProduct]);
  //   alert(`Product "${newProduct.name}" added successfully!`);
  // }, [productList]);

  const handleEditProduct = useCallback((product: Product) => {
    // setSelectedProduct(product);
    // setIsEditModalOpen(true);
    alert(`Product "${product}" edited successfully!`);
  }, []);

  // const handleUpdateProduct = useCallback((updatedProduct: Product) => {
  //   setProductList(prev => 
  //     prev.map(product => 
  //       product.id === updatedProduct.id ? updatedProduct : product
  //     )
  //   );
  //   alert(`Product "${updatedProduct.name}" updated successfully!`);
  // }, []);

  const handleToggleStatus = useCallback((productId: string) => {
    console.log('productId', productId);
  }, []);
  //   const product = productList.find(p => p.id === productId);
  //   if (!product) return;

  //   const action = product.status === 'active' ? 'deactivate' : 'activate';
  //   const confirmed = window.confirm(
  //     `Are you sure you want to ${action} "${product.name}"?`
  //   );

  //   if (confirmed) {
  //     setProductList(prev =>
  //       prev.map(product =>
  //         product.id === productId
  //           ? { ...product, status: product.status === 'active' ? 'inactive' : 'active', updatedAt: new Date() }
  //           : product
  //       )
  //     );
  //     alert(`${product.name} has been ${action}d successfully.`);
  //   }
  // }, [productList]);

  const handleDeleteProduct = useCallback((productId: string) => {
    console.log('productId', productId);
  }, []);
  //   const product = productList.find(p => p.id === productId);
  //   if (!product) return;

  //   const confirmed = window.confirm(
  //     `Are you sure you want to permanently delete "${product.name}"? This action cannot be undone.`
  //   );

  //   if (confirmed) {
  //     setProductList(prev => prev.filter(p => p.id !== productId));
  //     alert(`${product.name} has been deleted successfully.`);
  //   }
  // }, [productList]);

  // const clearFilters = () => {
  //   // setSearchTerm('');
  //   // setStatusFilter('all');
  //   // setCategoryFilter('all');
  //   // setStockFilter('all');
  //   console.log('clearFilters called');
  // };

  const openAddModal = () => {
    // setIsAddModalOpen(true);
    console.log('openAddModal called');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Product Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive inventory management system for all your products
            </p>
          </div>

          <Button
            // onClick={openAddModal} 
            size="lg"
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Add Product</span>
            <span className="hidden sm:inline">Add New Product</span>
          </Button>
        </div>

        {/* Statistics Cards - Only show if there are products */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold">
                      {profitSummary.totalProducts}
                    </p>
                    {/* <p className="text-2xl font-bold">{stats.totalProducts}</p> */}
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold">৳ {profitSummary.totalBuyPrice.toFixed(2)}</p>
                    {/* <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p> */}
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Low Stock Alert</p>
                    <p className="text-2xl font-bold">{profitSummary.lowStockCount}</p>
                    {/* <p className="text-2xl font-bold">{stats.lowStockProducts}</p> */}
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Potential Profit</p>
                    <p className="text-2xl font-bold">৳ {profitSummary.totalProfit.toFixed(2)}</p>
                    {/* <p className="text-2xl font-bold">${stats.potentialProfit.toLocaleString()}</p> */}
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                {/* All Products ({filteredProducts.length}) */}
                All Products
              </CardTitle>

              {/* Quick Stats Pills */}
              {products.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {profitSummary.inStockCount} In Stock
                    {/* {stats.inStockProducts} In Stock */}
                  </div>
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    {profitSummary.lowStockCount} Low Stock
                    {/* {stats.lowStockProducts} Low Stock */}
                  </div>
                  <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    {profitSummary.outOfStockCount} Out of Stock
                    {/* {stats.outOfStockProducts} Out of Stock */}
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {profitSummary.totalProducts} Total
                    {/* {stats.totalProducts} Total */}
                  </div>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search and Filter Section - Only show if there are products */}
            {/* {productList.length > 0 && (
              <ProductSearch
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                categoryFilter={categoryFilter}
                stockFilter={stockFilter}
                onSearchChange={setSearchTerm}
                onStatusFilterChange={setStatusFilter}
                onCategoryFilterChange={setCategoryFilter}
                onStockFilterChange={setStockFilter}
                onClearFilters={clearFilters}
              />
            )} */}

            {/* Responsive Product Table/Cards */}
            <ProductTable
              products={products}
              onEdit={handleEditProduct}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteProduct}
              onAddNew={openAddModal}
              minStockLevel={minStockLevel}
            />
          </CardContent>
        </Card>
      </div>

      {/* Modals */}

      {/* <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct}
      /> */}

      {/* <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      /> */}
    </div>
  );
};

export default ProductPage;