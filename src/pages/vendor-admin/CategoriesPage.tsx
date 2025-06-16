import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Layers, Edit, Trash2, RefreshCw } from "lucide-react";
import { Category } from "@/types/category";
import { AddCategoryModal } from '@/components/modals/AddCategoryModal';
import { EditCategoryModal } from "@/components/modals/EditCategoryModal";
import axios from "axios";


export default function CategoriesPage() {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);


  const fetchCategorys = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/v1/category/all-category', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      });
      setCategories(response.data.data);
    } catch {
      await fetchCategorys();
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCategorys();
  }, [fetchCategorys]);


  const handleAddCategory = async (newCategory: { categoryName: string; description: string }) => {
    setIsLoading(true);
    await axios.post('/api/v1/category/create-category', {
      categoryName: newCategory.categoryName,
      description: newCategory.description
    }, {
      headers: {
        'Authorization': `${localStorage.getItem('accessToken')}`
      },
    });
    await fetchCategorys();
    setIsLoading(false);
  };

  const handleUpdateCategory = async ({ _id, categoryName, description }: { _id: string, categoryName: string, description: string }) => {
    setIsLoading(true);
    await axios.patch(`/api/v1/category/update-category/${_id}`, {
      categoryName: categoryName,
      description: description
    },
      {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      }
    );
    await fetchCategorys();
    setEditingCategory(null);
    setIsLoading(false);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setIsLoading(true);
    const confirmed = window.confirm(
      `Are you sure you want to delete this category?`
    );
    if (confirmed) {
      await axios.patch(`/api/v1/shop-role/update-staff/${categoryId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      })
      alert(`Category deleted successfully`);
      await fetchCategorys();
    }
    await fetchCategorys();
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-4">
          <Layers className="h-6 w-6" />
          <CardTitle>Categories</CardTitle>
        </div>
        <AddCategoryModal
          onSave={handleAddCategory}
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Category
          </Button>
        </AddCategoryModal>
      </CardHeader>
      <CardContent>
        {isloading &&
          <div className="flex items-center justify-center p-4">
            <RefreshCw className="h-28 w-28 animate-spin text-primary" />
          </div>
        }
        {
          !isloading &&
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">Sl.</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{category.categoryName}</TableCell>
                  <TableCell>{category.description || 'No description'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCategory(category)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }

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