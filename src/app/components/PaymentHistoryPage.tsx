import { useState } from 'react';
import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ArrowDownLeft, ArrowUpRight, Download, DollarSign, Calendar, User as UserIcon } from 'lucide-react';

interface PaymentHistoryPageProps {
  user: User;
}

interface Payment {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'refunded';
  description: string;
  dmName?: string;
  playerName?: string;
  sessionType: string;
}

// Mock payment data
const mockPayments: Payment[] = [
  {
    id: '1',
    type: 'sent',
    amount: 40,
    date: '2026-02-05',
    status: 'completed',
    description: 'Campaign Session',
    dmName: 'Sarah the Storyteller',
    sessionType: 'Campaign',
  },
  {
    id: '2',
    type: 'sent',
    amount: 50,
    date: '2026-01-28',
    status: 'completed',
    description: 'One-Shot Adventure',
    dmName: 'Marcus the Mighty',
    sessionType: 'One-Shot',
  },
  {
    id: '3',
    type: 'sent',
    amount: 320,
    date: '2026-01-15',
    status: 'completed',
    description: 'Campaign Package (10 sessions, 20% discount)',
    dmName: 'Sarah the Storyteller',
    sessionType: 'Campaign',
  },
  {
    id: '4',
    type: 'received',
    amount: 50,
    date: '2026-02-03',
    status: 'completed',
    description: 'One-Shot Session',
    playerName: 'Alex Johnson',
    sessionType: 'One-Shot',
  },
  {
    id: '5',
    type: 'received',
    amount: 40,
    date: '2026-01-30',
    status: 'pending',
    description: 'Campaign Session (payout processing)',
    playerName: 'Emily Chen',
    sessionType: 'Campaign',
  },
];

export function PaymentHistoryPage({ user }: PaymentHistoryPageProps) {
  const [filterYear, setFilterYear] = useState('2026');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPayments = mockPayments.filter(payment => {
    const yearMatch = payment.date.startsWith(filterYear);
    const statusMatch = filterStatus === 'all' || payment.status === filterStatus;
    return yearMatch && statusMatch;
  });

  const sentPayments = filteredPayments.filter(p => p.type === 'sent');
  const receivedPayments = filteredPayments.filter(p => p.type === 'received');

  const totalSent = sentPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalReceived = receivedPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayouts = receivedPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleExport = () => {
    // In real app, would generate CSV/PDF
    alert('Exporting payment history...');
  };

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 medieval-heading">Payment History</h1>
          <p className="text-muted-foreground">
            Track all your payments and earnings
          </p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-red-500" />
              <span className="text-2xl font-bold">${totalSent.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              On {sentPayments.length} sessions
            </p>
          </CardContent>
        </Card>

        {user.type === 'dm' && (
          <>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <ArrowDownLeft className="h-4 w-4 text-green-500" />
                  <span className="text-2xl font-bold">${totalReceived.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From {receivedPayments.filter(p => p.status === 'completed').length} sessions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Pending Payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-orange-500" />
                  <span className="text-2xl font-bold">${pendingPayouts.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Processing in 2-3 business days
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="filter-year" className="text-sm font-medium mb-2 block">
                Year
              </Label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger id="filter-year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="filter-status" className="text-sm font-medium mb-2 block">
                Status
              </Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="filter-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Tabs */}
      <Tabs defaultValue={user.type === 'dm' ? 'all' : 'sent'} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="sent">Payments Sent</TabsTrigger>
          {user.type === 'dm' && <TabsTrigger value="received">Payments Received</TabsTrigger>}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredPayments.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No payments found for the selected filters
              </CardContent>
            </Card>
          ) : (
            filteredPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {sentPayments.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No sent payments found
              </CardContent>
            </Card>
          ) : (
            sentPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))
          )}
        </TabsContent>

        {user.type === 'dm' && (
          <TabsContent value="received" className="space-y-4">
            {receivedPayments.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No received payments found
                </CardContent>
              </Card>
            ) : (
              receivedPayments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

function PaymentCard({ payment }: { payment: Payment }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              payment.type === 'sent' 
                ? 'bg-red-100 dark:bg-red-950' 
                : 'bg-green-100 dark:bg-green-950'
            }`}>
              {payment.type === 'sent' ? (
                <ArrowUpRight className={`h-5 w-5 text-red-600 dark:text-red-400`} />
              ) : (
                <ArrowDownLeft className={`h-5 w-5 text-green-600 dark:text-green-400`} />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{payment.description}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <UserIcon className="h-3 w-3" />
                    <span>{payment.type === 'sent' ? payment.dmName : payment.playerName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    payment.type === 'sent' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    {payment.type === 'sent' ? '-' : '+'}${payment.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(payment.date)}</span>
                  </div>
                  <Badge variant="outline">{payment.sessionType}</Badge>
                </div>
                <Badge
                  variant={
                    payment.status === 'completed'
                      ? 'default'
                      : payment.status === 'pending'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Label({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} className={className}>{children}</label>;
}
