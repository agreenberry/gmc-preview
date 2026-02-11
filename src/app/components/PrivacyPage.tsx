import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Shield } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold medieval-heading mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: February 9, 2026</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>Account Information:</strong> When you create an account, we collect your name, 
                email address, profile picture (from Google authentication), and any additional information 
                you provide in your profile.
              </p>
              <p>
                <strong>Booking Information:</strong> When you book or host sessions, we collect information 
                about the booking, including dates, times, session details, and meeting addresses.
              </p>
              <p>
                <strong>Payment Information:</strong> Payment details are processed and stored by our 
                payment processor, Stripe. We store only limited payment information necessary for 
                transaction records.
              </p>
              <p>
                <strong>Communication:</strong> We collect messages sent through our platform, support 
                inquiries, and feedback.
              </p>
              <p>
                <strong>Usage Data:</strong> We automatically collect information about how you use 
                Game Masters Collective, including pages visited, features used, and interactions with other users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve Game Masters Collective services</li>
                <li>Process bookings and payments</li>
                <li>Communicate with you about your account and bookings</li>
                <li>Send notifications and updates (based on your preferences)</li>
                <li>Provide customer support</li>
                <li>Ensure platform safety and prevent fraud</li>
                <li>Comply with legal obligations</li>
                <li>Conduct research and analytics to improve our services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>Between Users:</strong> When you book a session, your name, profile information, 
                and contact details are shared with the DM. Similarly, DMs' public profile information 
                is visible to all users.
              </p>
              <p>
                <strong>Service Providers:</strong> We share information with trusted service providers 
                who help us operate Game Masters Collective, including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Stripe (payment processing)</li>
                <li>Google (authentication services)</li>
                <li>Cloud hosting providers</li>
                <li>Email service providers</li>
              </ul>
              <p>
                <strong>Legal Requirements:</strong> We may disclose information when required by law, 
                court order, or to protect our rights and the safety of our users.
              </p>
              <p>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of 
                assets, user information may be transferred to the acquiring entity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication via Google OAuth</li>
                <li>Regular security audits and monitoring</li>
                <li>Limited employee access to personal data</li>
                <li>PCI-compliant payment processing through Stripe</li>
              </ul>
              <p>
                However, no method of transmission or storage is 100% secure. While we strive to protect 
                your information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information in your account settings</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Opt-Out:</strong> Control notification preferences and marketing communications</li>
                <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Object:</strong> Object to certain types of data processing</li>
              </ul>
              <p>
                To exercise these rights, contact us at privacy@questmaster.com or use the privacy 
                controls in your account settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Game Masters Collective uses cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep you signed in</li>
                <li>Remember your preferences</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and features</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Note that disabling cookies may 
                affect your ability to use certain features.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                We retain your information for as long as your account is active or as needed to provide 
                services. After account deletion, we may retain certain information for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compliance with legal obligations</li>
                <li>Resolution of disputes</li>
                <li>Enforcement of our agreements</li>
                <li>Prevention of fraud and abuse</li>
              </ul>
              <p>
                Anonymized or aggregated data may be retained indefinitely for analytics and research purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Game Masters Collective is not intended for users under 18 years of age. We do not knowingly collect 
                personal information from children. If we learn that we have collected information from 
                a child, we will delete it promptly. If you believe a child has provided us with personal 
                information, please contact us at privacy@questmaster.com.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. International Users</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Game Masters Collective is based in the United States. If you access our services from outside the U.S., 
                your information will be transferred to and processed in the United States. By using 
                Game Masters Collective, you consent to this transfer and processing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant 
                changes via email or platform notification. Continued use of Game Masters Collective after changes 
                constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                For questions about this Privacy Policy or our data practices, please contact:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@questmaster.com<br />
                <strong>Mail:</strong> Game Masters Collective Privacy Team<br />
                123 Adventure Lane, San Francisco, CA 94102
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
