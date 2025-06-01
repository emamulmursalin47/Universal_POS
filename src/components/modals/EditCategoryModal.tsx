// components/edit-category-modal.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";


interface EditCategoryModalProps {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedCategory: Category) => void;
}

export function EditCategoryModal({ 
  category, 
  open, 
  onOpenChange, 
  onSave 
}: EditCategoryModalProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || "");

  useEffect(() => {
    setName(category.name);
    setDescription(category.description || "");
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...category,
      name,
      description: description || undefined
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}