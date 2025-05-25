import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Plus, Search, Mail, Phone, Calendar } from 'lucide-react';

// Types
interface Shop {
  id: number;
  name: string;
  email: string;
  contact: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  createdAt: string;
  deadline: string;
}

interface ShopFormData {
  name: string;
  email: string;
  contact: string;
  subscriptionPlan: string;
  deadline: string;
}

// Mock data
const MOCK_SHOPS: Shop[] = [
  {
    id: 1,
    name: "Tech Solutions Co.",
    email: "contact@techsolutions.com",
    contact: "+1 (555) 123-4567",
    subscriptionPlan: "premium",
    subscriptionStatus: "active",
    createdAt: "2024-01-15T00:00:00Z",
    deadline: "2024-07-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Digital Marketing Hub",
    email: "info@digitalmarketing.com",
    contact: "+1 (555) 987-6543",
    subscriptionPlan: "basic",
    subscriptionStatus: "active",
    createdAt: "2024-02-20T00:00:00Z",
    deadline: "2024-08-20T00:00:00Z"
  },
  {
    id: 3,
    name: "Creative Design Studio",
    email: "hello@creativedesign.com",
    contact: "+1 (555) 456-7890",
    subscriptionPlan: "standard",
    subscriptionStatus: "expired",
    createdAt: "2024-03-10T00:00:00Z",
    deadline: "2024-06-10T00:00:00Z"
  }
];

// Add Shop Modal Component
const AddShopModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddShop: (shop: Shop) => void;
}> = ({ isOpen, onClose, onAddShop }) => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    email: '',
    contact: '',
    subscriptionPlan: 'basic',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShop: Shop = {
      id: Date.now(),
      ...formData,
      subscriptionStatus: 'active',
      createdAt: new Date().toISOString()
    };
    onAddShop(newShop);
    setFormData({ name: '', email: '', contact: '', subscriptionPlan: 'basic', deadline: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Add New Shop
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shop-name">Shop Name</Label>
            <Input
              id="shop-name"
              placeholder="Enter shop name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shop-email">Email</Label>
            <Input
              id="shop-email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shop-contact">Contact Number</Label>
            <Input
              id="shop-contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subscription-plan">Subscription Plan</Label>
            <Select value={formData.subscriptionPlan} onValueChange={(value) => setFormData(prev => ({ ...prev, subscriptionPlan: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Subscription Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Shop
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Shop Card Component for Mobile
const ShopCard: React.FC<{ shop: Shop }> = ({ shop }) => {
  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
    if (daysUntilDeadline <= 7) return { status: 'warning', color: 'text-yellow-600', text: `${daysUntilDeadline} days left` };
    return { status: 'active', color: 'text-green-600', text: `${daysUntilDeadline} days left` };
  };

  const deadlineInfo = getDeadlineStatus(shop.deadline);

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{shop.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {shop.subscriptionStatus}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            {shop.email}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            {shop.contact}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Created: {new Date(shop.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span className={deadlineInfo.color}>
              Deadline: {new Date(shop.deadline).toLocaleDateString()} ({deadlineInfo.text})
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
              {shop.subscriptionPlan} Plan
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [shops, setShops] = useState<Shop[]>(MOCK_SHOPS);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddShop = (newShop: Shop) => {
    setShops(prev => [...prev, newShop]);
  };

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
    if (daysUntilDeadline <= 7) return { status: 'warning', color: 'text-yellow-600', text: `${daysUntilDeadline} days left` };
    return { status: 'active', color: 'text-green-600', text: `${daysUntilDeadline} days left` };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Shops</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Shop
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shop Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shop Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShops.map((shop) => {
                  const deadlineInfo = getDeadlineStatus(shop.deadline);
                  return (
                    <TableRow key={shop.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{shop.name}</div>
                            <div className="text-sm text-muted-foreground">{shop.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{shop.contact}</TableCell>
                      <TableCell className="capitalize">{shop.subscriptionPlan}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {shop.subscriptionStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{new Date(shop.deadline).toLocaleDateString()}</div>
                          <div className={`text-xs ${deadlineInfo.color}`}>
                            {deadlineInfo.text}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(shop.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </CardContent>
      </Card>

      <AddShopModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddShop={handleAddShop}
      />
    </div>
  );
}