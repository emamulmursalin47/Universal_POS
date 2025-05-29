// app/categories/page.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Layers } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/constants';
import { Category, Product } from '@/types/category';
import { AddCategoryModal } from '@/components/modals/AddCategoryModal';
import { EditCategoryModal } from '@/components/modals/EditCategoryModal';


export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProductCount = (categoryId: string) => {
    return MOCK_PRODUCTS.filter((product: Product) => product.categoryId === categoryId).length;
  };

  const handleAddCategory = (newCategory: { name: string; description: string }) => {
    const categoryToAdd: Category = {
      id: Math.random().toString(36).substring(2, 9),
      ...newCategory
    };
    setCategories([...categories, categoryToAdd]);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-4">
          <Layers className="h-6 w-6" />
          <CardTitle>Categories</CardTitle>
        </div>
        <AddCategoryModal onSave={handleAddCategory}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Category
          </Button>
        </AddCategoryModal>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Category Management</h2>
          <div className="mt-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description || 'No description'}</TableCell>
                <TableCell>{getProductCount(category.id)} products</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingCategory(category)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {editingCategory && (
          <EditCategoryModal
            category={editingCategory}
            open={!!editingCategory}
            onOpenChange={(open) => !open && setEditingCategory(null)}
            onSave={handleUpdateCategory}
          />
        )}
      </CardContent>
    </Card>
  );
}