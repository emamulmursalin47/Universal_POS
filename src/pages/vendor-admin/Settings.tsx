// app/settings/page.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Barcode, Percent, Plus } from 'lucide-react';

const DEFAULT_SHOP_SETTINGS = {
  id: '1',
  shopName: 'My Awesome Shop',
  address: '123 Main St, Cityville',
  contactNumber: '+1 (555) 123-4567',
  taxId: 'TAX123456789',
  currency: 'USD',
  timezone: 'America/New_York',
  receiptFooter: 'Thank you for your business!'
};

const DEFAULT_POS_SETTINGS = {
  id: '1',
  barcodeScanner: true,
  cashDrawer: true,
  receiptPrinter: true,
  defaultPaymentMethod: 'cash',
  autoPrintReceipts: true
};

const DEFAULT_TAX_SETTINGS = [
  { id: '1', name: 'Sales Tax', rate: 8.25, isActive: true },
  { id: '2', name: 'VAT', rate: 10, isActive: false }
];

export default function SettingsPage() {
  const [shopSettings, setShopSettings] = useState(DEFAULT_SHOP_SETTINGS);
  const [posSettings, setPosSettings] = useState(DEFAULT_POS_SETTINGS);
  const [taxSettings, setTaxSettings] = useState(DEFAULT_TAX_SETTINGS);

  const handleShopSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePosSettingsToggle = (setting: keyof typeof posSettings) => {
    setPosSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleTaxRateChange = (id: string, newRate: number) => {
    setTaxSettings(prev => 
      prev.map(tax => tax.id === id ? { ...tax, rate: newRate } : tax)
    );
  };

  const handleTaxStatusToggle = (id: string) => {
    setTaxSettings(prev => 
      prev.map(tax => tax.id === id ? { ...tax, isActive: !tax.isActive } : tax)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="shop" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shop">
            <Settings className="h-4 w-4 mr-2" />
            Shop Details
          </TabsTrigger>
          <TabsTrigger value="pos">
            <Barcode className="h-4 w-4 mr-2" />
            POS Settings
          </TabsTrigger>
          <TabsTrigger value="tax">
            <Percent className="h-4 w-4 mr-2" />
            Tax Settings
          </TabsTrigger>
        </TabsList>

        {/* Shop Settings Tab */}
        <TabsContent value="shop">
          <Card>
            <CardHeader>
              <CardTitle>Shop Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input
                    id="shopName"
                    name="shopName"
                    value={shopSettings.shopName}
                    onChange={handleShopSettingsChange}
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={shopSettings.contactNumber}
                    onChange={handleShopSettingsChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={shopSettings.address}
                  onChange={handleShopSettingsChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    value={shopSettings.taxId || ''}
                    onChange={handleShopSettingsChange}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    name="currency"
                    value={shopSettings.currency}
                    onChange={handleShopSettingsChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    name="timezone"
                    value={shopSettings.timezone}
                    onChange={handleShopSettingsChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="receiptFooter">Receipt Footer Text</Label>
                <Input
                  id="receiptFooter"
                  name="receiptFooter"
                  value={shopSettings.receiptFooter || ''}
                  onChange={handleShopSettingsChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* POS Settings Tab */}
        <TabsContent value="pos">
          <Card>
            <CardHeader>
              <CardTitle>POS Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Barcode Scanner</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable barcode scanner functionality
                  </p>
                </div>
                <Button
                  variant={posSettings.barcodeScanner ? 'default' : 'outline'}
                  onClick={() => handlePosSettingsToggle('barcodeScanner')}
                >
                  {posSettings.barcodeScanner ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Cash Drawer</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect to a cash drawer device
                  </p>
                </div>
                <Button
                  variant={posSettings.cashDrawer ? 'default' : 'outline'}
                  onClick={() => handlePosSettingsToggle('cashDrawer')}
                >
                  {posSettings.cashDrawer ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Receipt Printer</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable receipt printing
                  </p>
                </div>
                <Button
                  variant={posSettings.receiptPrinter ? 'default' : 'outline'}
                  onClick={() => handlePosSettingsToggle('receiptPrinter')}
                >
                  {posSettings.receiptPrinter ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Print Receipts</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically print receipts after payment
                  </p>
                </div>
                <Button
                  variant={posSettings.autoPrintReceipts ? 'default' : 'outline'}
                  onClick={() => handlePosSettingsToggle('autoPrintReceipts')}
                >
                  {posSettings.autoPrintReceipts ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <div>
                <Label htmlFor="defaultPaymentMethod">Default Payment Method</Label>
                <Input
                  id="defaultPaymentMethod"
                  value={posSettings.defaultPaymentMethod}
                  onChange={(e) => 
                    setPosSettings({ ...posSettings, defaultPaymentMethod: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Settings Tab */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxSettings.map((tax) => (
                  <div key={tax.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <Label>{tax.name}</Label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="number"
                        value={tax.rate}
                        onChange={(e) => handleTaxRateChange(tax.id, parseFloat(e.target.value))}
                        className="w-24"
                      />
                      <span>%</span>
                      <Button
                        variant={tax.isActive ? 'default' : 'outline'}
                        onClick={() => handleTaxStatusToggle(tax.id)}
                      >
                        {tax.isActive ? 'Active' : 'Inactive'}
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Tax
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}