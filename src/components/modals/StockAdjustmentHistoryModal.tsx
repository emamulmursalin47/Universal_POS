// modals/StockAdjustmentHistoryModal.tsx
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, TrendingUp, TrendingDown, RotateCcw, Calendar, User } from 'lucide-react';
import { StockAdjustment, ADJUSTMENT_REASONS } from '@/types/inventory';
import { format } from 'date-fns';

interface StockAdjustmentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  adjustments: StockAdjustment[];
  productName?: string;
}

export default function StockAdjustmentHistoryModal({
  isOpen,
  onClose,
  adjustments,
  productName
}: StockAdjustmentHistoryModalProps) {
  const sortedAdjustments = useMemo(() => {
    return [...adjustments].sort((a, b) => 
      new Date(b.adjustedAt).getTime() - new Date(a.adjustedAt).getTime()
    );
  }, [adjustments]);

  const getAdjustmentIcon = (type: string) => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'set':
        return <RotateCcw className="h-4 w-4 text-blue-600" />;
      default:
        return <History className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAdjustmentBadgeVariant = (type: string) => {
    switch (type) {
      case 'increase':
        return 'default';
      case 'decrease':
        return 'destructive';
      case 'set':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatAdjustmentType = (type: string) => {
    switch (type) {
      case 'increase':
        return 'Increase';
      case 'decrease':
        return 'Decrease';
      case 'set':
        return 'Set';
      default:
        return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Stock Adjustment History
            {productName && (
              <span className="text-muted-foreground font-normal">
                - {productName}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Adjustments</div>
              <div className="text-2xl font-bold">{adjustments.length}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-700">Increases</div>
              <div className="text-2xl font-bold text-green-700">
                {adjustments.filter(adj => adj.adjustmentType === 'increase').length}
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm text-red-700">Decreases</div>
              <div className="text-2xl font-bold text-red-700">
                {adjustments.filter(adj => adj.adjustmentType === 'decrease').length}
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700">Set Adjustments</div>
              <div className="text-2xl font-bold text-blue-700">
                {adjustments.filter(adj => adj.adjustmentType === 'set').length}
              </div>
            </div>
          </div>

          {/* Adjustments Table */}
          <div className="border rounded-lg">
            <ScrollArea className="h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Previous</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>New Stock</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Adjusted By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAdjustments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        No adjustment history found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedAdjustments.map((adjustment) => (
                      <TableRow key={adjustment.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">
                                {format(new Date(adjustment.adjustedAt), 'MMM dd, yyyy')}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {format(new Date(adjustment.adjustedAt), 'hh:mm a')}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{adjustment.productName}</div>
                            <div className="text-xs text-muted-foreground">{adjustment.sku}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getAdjustmentIcon(adjustment.adjustmentType)}
                            <Badge variant={getAdjustmentBadgeVariant(adjustment.adjustmentType)}>
                              {formatAdjustmentType(adjustment.adjustmentType)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">
                          {adjustment.previousStock}
                        </TableCell>
                        <TableCell className="font-mono">
                          {adjustment.adjustmentType === 'increase' && '+'}
                          {adjustment.adjustmentType === 'decrease' && '-'}
                          {adjustment.quantity}
                        </TableCell>
                        <TableCell className="font-mono font-medium">
                          {adjustment.newStock}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">
                              {ADJUSTMENT_REASONS[adjustment.reason as keyof typeof ADJUSTMENT_REASONS]}
                            </div>
                            {adjustment.notes && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {adjustment.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{adjustment.adjustedBy}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}