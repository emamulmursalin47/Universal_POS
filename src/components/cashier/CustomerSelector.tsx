import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    UserPlus,
    Search,
    X,
    Check,
    User
} from "lucide-react";
import { Customer } from "@/lib/types";
import axios from "axios";

interface CustomerSelectorProps {
    customers: Customer[];
    selectedCustomer: Customer | null;
    onCustomerSelect: (customer: Customer | null) => void;
}

const CustomerSelector = ({ customers, selectedCustomer, onCustomerSelect }: CustomerSelectorProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [phoneSearch, setPhoneSearch] = useState('');
    const [newCustomer, setNewCustomer] = useState<Customer>({
        name: '',
        contact: '',
        email: '',
        address: '',
    });
    const [isAddingNew, setIsAddingNew] = useState(false);

    const filteredCustomers = customers.filter(customer =>
        customer.contact.includes(phoneSearch) ||
        customer.name.toLowerCase().includes(phoneSearch.toLowerCase())
    );

    const handlePhoneSearch = (phone: string) => {
        setPhoneSearch(phone);
        // Auto-select if exact phone match
        const exactMatch = customers.find(c => c.contact === phone);
        if (exactMatch) {
            onCustomerSelect(exactMatch);
            setIsDialogOpen(false);
            setPhoneSearch('');
        }
    };

    const handleAddNewCustomer = useCallback(async () => {
        if (!newCustomer.name || !newCustomer.contact) return;
        const customer: Customer = {
            name: newCustomer.name,
            contact: newCustomer.contact,
            email: newCustomer.email || "",
            address: newCustomer.address || "",
        };

        // In real app, this would be an API call
        const response = await axios.post('/api/v1/customer/create-customer', customer, {
            headers: {
                'Authorization': `${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
        });

        console.log(response);

        setPhoneSearch("");
        setIsDialogOpen(false);
        setIsAddingNew(false);
        setNewCustomer({ name: "", contact: "", email: "", address: "" });
    }, [newCustomer]);

    const removeCustomer = () => {
        onCustomerSelect(null);
    };

    return (
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
            <User className="h-4 w-4 text-muted-foreground" />
            {selectedCustomer ? (
                <div className="flex items-center justify-between flex-1">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">{selectedCustomer.name}</span>
                        <span className="text-sm text-muted-foreground">{selectedCustomer.contact}</span>
                        {/* {selectedCustomer.totalPurchases !== undefined && (
              <Badge variant="outline" className="text-xs">
                ${selectedCustomer.totalPurchases.toFixed(0)}
              </Badge>
            )} */}
                    </div>
                    <div className="flex gap-1">
                        {/* <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Edit className="h-3 w-3" />
            </Button> */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200"
                            onClick={removeCustomer}
                        >
                            <X className="h-3 w-3" strokeWidth={4} />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2 flex-1">
                    <Input
                        placeholder="Enter customer phone number..."
                        value={phoneSearch}
                        onChange={(e) => handlePhoneSearch(e.target.value)}
                        className="flex-1 h-8"
                    />
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Search className="h-3 w-3" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
                            <DialogHeader>
                                <DialogTitle>Customer Search & Management</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label>Search by Phone or Name</Label>
                                    <Input
                                        placeholder="Phone number or customer name..."
                                        value={phoneSearch}
                                        onChange={(e) => setPhoneSearch(e.target.value)}
                                    />
                                </div>

                                {filteredCustomers.length > 0 && !isAddingNew && (
                                    <div className="space-y-2 max-h-60 overflow-auto">
                                        <Label className="text-sm font-medium">Existing Customers</Label>
                                        {filteredCustomers.map((customer) => (
                                            <div
                                                key={customer._id}
                                                className="p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                                                onClick={() => {
                                                    onCustomerSelect(customer);
                                                    setIsDialogOpen(false);
                                                    setPhoneSearch('');
                                                }}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-sm">{customer.name}</p>
                                                        <p className="text-xs text-muted-foreground">{customer.contact}</p>
                                                        {customer.email && (
                                                            <p className="text-xs text-muted-foreground">{customer.email}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!isAddingNew ? (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setIsAddingNew(true)}
                                    >
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        Add New Customer
                                    </Button>
                                ) : (
                                    <div className="space-y-3 p-3 border rounded-md bg-muted/50">
                                        <Label className="text-sm font-medium">Add New Customer</Label>
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="Customer Name *"
                                                value={newCustomer.name}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                            />
                                            <Input
                                                placeholder="Phone Number *"
                                                value={newCustomer.contact}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
                                            />
                                            <Input
                                                placeholder="Email (Optional)"
                                                value={newCustomer.email}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                            />
                                            <Input
                                                placeholder="Address (Optional)"
                                                value={newCustomer.address}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={handleAddNewCustomer}
                                                disabled={!newCustomer.name || !newCustomer.contact}
                                                className="flex-1"
                                            >
                                                <Check className="h-3 w-3 mr-1" />
                                                Add
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setIsAddingNew(false);
                                                    setNewCustomer({ name: '', contact: '', email: '', address: '' });
                                                }}
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">or search</span>
                </div>
            )}
        </div>
    );
}

export default CustomerSelector;