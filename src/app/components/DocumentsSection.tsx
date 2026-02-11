import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { Download, FileText, Calendar, Shield } from 'lucide-react';

interface DocumentsSectionProps {
  user: User;
}

interface TaxDocument {
  id: string;
  type: '1099' | 'W9' | 'Receipt';
  year: number;
  date: string;
  amount?: number;
  status: 'available' | 'pending' | 'not-applicable';
}

// Mock tax documents
const mockDocuments: TaxDocument[] = [
  {
    id: '1',
    type: '1099',
    year: 2025,
    date: '2026-01-31',
    amount: 4250,
    status: 'available',
  },
  {
    id: '2',
    type: '1099',
    year: 2024,
    date: '2025-01-31',
    amount: 3890,
    status: 'available',
  },
  {
    id: '3',
    type: '1099',
    year: 2026,
    date: '2027-01-31',
    status: 'pending',
  },
];

export function DocumentsSection({ user }: DocumentsSectionProps) {
  const handleDownload = (doc: TaxDocument) => {
    // In real app, would download PDF
    alert(`Downloading ${doc.type}-${doc.year}.pdf...`);
  };

  const handleRequestW9 = () => {
    alert('W-9 form request submitted. You will receive an email with the form.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tax Documents</h2>
        <p className="text-sm text-muted-foreground">
          Access your tax forms and receipts
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Tax Information</p>
              <p className="text-sm text-muted-foreground">
                {user.type === 'dm' 
                  ? 'As a DM earning income through Game Masters Collective, you may receive a 1099-NEC form if you earned more than $600 in a calendar year. Forms are issued by January 31st of the following year.'
                  : 'You can download payment receipts for your records. These can be useful for expense tracking and budgeting.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {user.type === 'dm' && (
        <>
          {/* 1099 Forms */}
          <Card>
            <CardHeader>
              <CardTitle>1099-NEC Forms</CardTitle>
              <CardDescription>
                Annual tax forms for earnings through Game Masters Collective
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockDocuments
                .filter(doc => doc.type === '1099')
                .map((doc) => (
                  <div key={doc.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">1099-NEC {doc.year}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>Issued {new Date(doc.date).toLocaleDateString()}</span>
                            </div>
                            {doc.amount && (
                              <Badge variant="outline">
                                ${doc.amount.toLocaleString()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={doc.status === 'available' ? 'default' : 'secondary'}
                        >
                          {doc.status === 'available' ? 'Available' : 'Pending'}
                        </Badge>
                        {doc.status === 'available' && (
                          <Button
                            onClick={() => handleDownload(doc)}
                            variant="outline"
                            size="sm"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                        )}
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}

              {mockDocuments.filter(doc => doc.type === '1099').length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No 1099 forms available yet</p>
                  <p className="text-sm mt-1">
                    Forms will appear here once you earn $600+ in a calendar year
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* W-9 Form */}
          <Card>
            <CardHeader>
              <CardTitle>W-9 Form</CardTitle>
              <CardDescription>
                Request for Taxpayer Identification Number and Certification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Game Masters Collective requires a completed W-9 form to process payments and issue 1099 forms. 
                You should have submitted this when you became a DM.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleRequestW9} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Request New W-9
                </Button>
                <Button variant="outline">
                  View Submitted W-9
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Payment Receipts */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Receipts</CardTitle>
          <CardDescription>
            {user.type === 'dm' 
              ? 'Receipts for payments received from players'
              : 'Receipts for session payments'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            You can download detailed receipts for all {user.type === 'dm' ? 'received' : 'sent'} payments 
            from the Payment History page.
          </p>
          <Button variant="outline" asChild>
            <a href="/payments">
              View Payment History
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Tax Help */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-lg">Need Help with Taxes?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Tax requirements can be complex. We recommend consulting with a tax professional 
            for advice specific to your situation.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="link" className="h-auto p-0 text-primary" asChild>
              <a href="/help/taxes" target="_blank">
                Tax FAQ
              </a>
            </Button>
            <span className="text-muted-foreground">•</span>
            <Button variant="link" className="h-auto p-0 text-primary" asChild>
              <a href="/contact" target="_blank">
                Contact Support
              </a>
            </Button>
            <span className="text-muted-foreground">•</span>
            <Button variant="link" className="h-auto p-0 text-primary" asChild>
              <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer">
                IRS Resources
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
