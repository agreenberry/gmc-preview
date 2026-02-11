import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Scroll } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Scroll className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold medieval-heading mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: February 9, 2026</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                By accessing and using Game Masters Collective ("the Platform"), you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                Game Masters Collective reserves the right to modify these terms at any time. Continued use of the 
                Platform after changes constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>Account Creation:</strong> You must create an account to access certain features. 
                You agree to provide accurate, current information and maintain the security of your account.
              </p>
              <p>
                <strong>Account Responsibility:</strong> You are responsible for all activities that occur 
                under your account. Notify us immediately of any unauthorized use.
              </p>
              <p>
                <strong>Age Requirement:</strong> You must be at least 18 years old to create an account 
                or use Game Masters Collective services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Harass, threaten, or harm other users</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Interfere with the Platform's operation or security</li>
                <li>Use the Platform for any illegal or unauthorized purpose</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Bookings and Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>Booking Agreements:</strong> When you book a session, you enter into a direct 
                agreement with the Game Master. Game Masters Collective facilitates the connection but is not 
                a party to the transaction.
              </p>
              <p>
                <strong>Payment Processing:</strong> All payments are processed securely through our 
                payment partner, Stripe. Payments are held in escrow until session completion.
              </p>
              <p>
                <strong>Cancellations:</strong> Cancellation policies vary by DM. Review the specific 
                cancellation policy before booking. Refunds are subject to the DM's policy and our 
                refund guidelines.
              </p>
              <p>
                <strong>Service Fees:</strong> Game Masters Collective charges a service fee on each transaction. 
                Fees are clearly displayed before payment confirmation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Game Master Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>DM Verification:</strong> All DMs must complete our verification process, including 
                identity confirmation and agreement to our DM Code of Conduct.
              </p>
              <p>
                <strong>Session Quality:</strong> DMs agree to provide professional, high-quality gaming 
                experiences and maintain respectful, inclusive environments.
              </p>
              <p>
                <strong>Payouts:</strong> DM earnings are paid out according to our payout schedule. 
                Game Masters Collective retains a service fee from each booking.
              </p>
              <p>
                <strong>Tax Responsibility:</strong> DMs are responsible for reporting and paying taxes 
                on their earnings. Game Masters Collective will provide necessary tax documentation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Content and Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>User Content:</strong> You retain ownership of content you post but grant 
                Game Masters Collective a license to use, display, and distribute it on the Platform.
              </p>
              <p>
                <strong>Platform Content:</strong> All Game Masters Collective branding, design, and functionality 
                are protected by copyright and trademark laws.
              </p>
              <p>
                <strong>Game System IP:</strong> Users must respect intellectual property rights of game 
                publishers and only use licensed or authorized content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>Between Users:</strong> Disputes between players and DMs should first be resolved 
                directly. Game Masters Collective Support can mediate if necessary.
              </p>
              <p>
                <strong>With Game Masters Collective:</strong> Any disputes with Game Masters Collective shall be resolved through 
                binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Game Masters Collective provides the Platform "as is" without warranties of any kind. We are not 
                liable for any damages arising from your use of the Platform, interactions with other 
                users, or gaming sessions booked through our service.
              </p>
              <p>
                Our total liability shall not exceed the amount you paid to Game Masters Collective in the six 
                months preceding the claim.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Game Masters Collective may suspend or terminate your account at any time for violations of these 
                terms or other policies. You may close your account at any time through account settings.
              </p>
              <p>
                Upon termination, your right to use the Platform ceases immediately. Provisions regarding 
                intellectual property, liability, and dispute resolution survive termination.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> legal@questmaster.com<br />
                <strong>Mail:</strong> Game Masters Collective Legal Department<br />
                123 Adventure Lane, San Francisco, CA 94102
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
