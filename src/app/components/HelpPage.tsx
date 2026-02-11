import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { HelpCircle, Search, Book, CreditCard, Users, Shield, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold medieval-heading mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions and get support
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Getting Started</h3>
              <p className="text-sm text-muted-foreground">New to Game Masters Collective?</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Booking Help</h3>
              <p className="text-sm text-muted-foreground">Sessions & scheduling</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Payments</h3>
              <p className="text-sm text-muted-foreground">Billing & refunds</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                For Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I find and book a DM?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      Browse our DM listings on the homepage or use the search to filter by location, 
                      game system, or play style. Click on a DM's profile to view their full details, 
                      reviews, and availability calendar.
                    </p>
                    <p>
                      When you're ready to book, select your preferred date and time from their 
                      availability calendar, choose between a one-shot or campaign, and complete the 
                      booking request. The DM will review and confirm your booking.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What's the difference between a one-shot and a campaign?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      A <strong>one-shot</strong> is a single, standalone session (typically 3-4 hours) 
                      with a complete story that begins and ends in one sitting.
                    </p>
                    <p className="mt-2">
                      A <strong>campaign</strong> is a series of connected sessions that tell an ongoing 
                      story over multiple game nights. When booking campaigns, you can reserve 1-20 
                      sessions and often receive bulk discounts.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How do payments work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      When you book a session, payment is processed immediately through Stripe but held 
                      in escrow. The DM receives payment 2 business days after the session is completed. 
                      This protects both players and DMs.
                    </p>
                    <p className="mt-2">
                      If a session is canceled according to the DM's cancellation policy, you'll receive 
                      a full or partial refund depending on the timing.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I cancel or reschedule a booking?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Yes, you can request cancellation from your bookings page. Refund eligibility 
                      depends on the DM's cancellation policy and how far in advance you cancel:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>7+ days before: Full refund</li>
                      <li>3-6 days before: 50% refund</li>
                      <li>Less than 3 days: No refund (at DM's discretion)</li>
                    </ul>
                    <p className="mt-2">
                      For rescheduling, contact your DM directly through the platform messaging system.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>What if I have a problem with my DM or session?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      We take session quality and safety seriously. If you experience issues:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 space-y-1">
                      <li>Try to resolve it directly with the DM first</li>
                      <li>Use the "Report Issue" feature in your completed sessions</li>
                      <li>Contact our support team for mediation</li>
                    </ol>
                    <p className="mt-2">
                      For safety concerns or Terms of Service violations, contact us immediately at 
                      safety@questmaster.com.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                For Game Masters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dm-1">
                  <AccordionTrigger>How do I become a DM on Game Masters Collective?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      To become a DM on Game Masters Collective:
                    </p>
                    <ol className="list-decimal pl-6 space-y-1">
                      <li>Create a player account if you don't have one</li>
                      <li>Go to Account Settings and click "Apply to Become a DM"</li>
                      <li>Complete the DM application with your experience and credentials</li>
                      <li>Wait for approval (typically 2-3 business days)</li>
                      <li>Set up your DM profile, pricing, and availability</li>
                    </ol>
                    <p>
                      We review all applications to ensure quality experiences for our players.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dm-2">
                  <AccordionTrigger>How do I get paid?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Earnings are automatically transferred to your connected bank account 2 business 
                      days after session completion. You can track all earnings and payouts in your 
                      Payment History.
                    </p>
                    <p className="mt-2">
                      Game Masters Collective charges a service fee (typically 15-20%) on each booking. The remaining 
                      amount is your payout. You're responsible for reporting this income for tax purposes.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dm-3">
                  <AccordionTrigger>How do I manage my availability?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Use the Availability page in your DM Dashboard to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Set regular weekly availability</li>
                      <li>Block out specific dates when you're unavailable</li>
                      <li>Add special available time slots</li>
                      <li>Set buffer time between sessions</li>
                    </ul>
                    <p className="mt-2">
                      Players can only book times that appear as available on your calendar.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dm-4">
                  <AccordionTrigger>What are bulk discounts and how do they work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Bulk discounts encourage players to book multiple campaign sessions at once. You 
                      can set different discount percentages for different booking quantities (e.g., 10% 
                      off for 5-9 sessions, 20% off for 10+ sessions).
                    </p>
                    <p className="mt-2">
                      This provides players with cost savings while giving you more booking security. 
                      You can enable or disable bulk discounts in your DM Profile settings.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dm-5">
                  <AccordionTrigger>What if a player doesn't show up?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      If a player is a no-show without prior notice:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 space-y-1">
                      <li>Wait at least 15 minutes past the start time</li>
                      <li>Try to contact them through the platform</li>
                      <li>Mark the session as "Player No-Show" in your dashboard</li>
                      <li>Submit a report explaining what happened</li>
                    </ol>
                    <p className="mt-2">
                      You'll still receive full payment for no-shows, and repeated offenders may face 
                      account restrictions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payments & Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pay-1">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      We accept all major credit and debit cards (Visa, Mastercard, American Express, 
                      Discover) through our secure payment processor, Stripe. We do not currently support 
                      PayPal or cryptocurrency.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pay-2">
                  <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Yes. All payment processing is handled by Stripe, a PCI-compliant payment processor. 
                      Game Masters Collective never stores your full credit card information on our servers. We only 
                      retain limited payment details necessary for transaction records.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pay-3">
                  <AccordionTrigger>When will I be charged?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Your payment method is charged immediately when you complete a booking. The payment 
                      is held in escrow and released to the DM 2 business days after the session is 
                      completed and marked as such.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pay-4">
                  <AccordionTrigger>How do refunds work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Refunds are processed according to the DM's cancellation policy and the timing of 
                      your cancellation. Once approved, refunds are returned to your original payment 
                      method within 5-10 business days.
                    </p>
                    <p className="mt-2">
                      For campaign bookings, partial refunds may apply if you cancel after some sessions 
                      have been completed.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Safety & Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="safe-1">
                  <AccordionTrigger>How does Game Masters Collective ensure safety?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      We take several measures to ensure a safe community:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>All DMs undergo identity verification</li>
                      <li>Review system allows users to rate experiences</li>
                      <li>24/7 support team for safety concerns</li>
                      <li>Clear community guidelines and code of conduct</li>
                      <li>Ability to report inappropriate behavior</li>
                      <li>Meeting addresses only shared after booking acceptance</li>
                    </ul>
                    <p>
                      We enforce a zero-tolerance policy for harassment, discrimination, or abusive behavior.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="safe-2">
                  <AccordionTrigger>How do I report a safety concern?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      If you experience or witness behavior that violates our safety policies:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 space-y-1">
                      <li>Use the "Report Issue" button on the user's profile or session</li>
                      <li>Select "Safety Concern" as the reason</li>
                      <li>Provide detailed information about the incident</li>
                    </ol>
                    <p className="mt-2">
                      For urgent safety matters, contact safety@questmaster.com immediately.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Still Need Help Section */}
        <div className="mt-12 p-8 bg-muted/50 border rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Support
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">
                Learn About Game Masters Collective
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
