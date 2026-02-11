import { useState } from 'react';
import { User } from '@/types';
import {
  Mail,
  DollarSign,
  CreditCard,
  Shield,
  Eye,
  EyeOff,
  Pencil,
  X,
  Save,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import { toast } from 'sonner';

interface AccountDetailsSectionProps {
  user: User;
  onSave: (e: React.FormEvent) => void;
}

interface FormData {
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  showInSearch: boolean;
  showLocation: boolean;
  showContact: boolean;
  showReviews: boolean;
  showSessionHistory: boolean;
  autoAcceptEvents: boolean;
  activityStatus: boolean;
  allowDirectMessages: boolean;
  showBookingHistory: boolean;
}

export function AccountDetailsSection({ user }: AccountDetailsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  // Initial form data
  const initialFormData: FormData = {
    email: user.email,
    addressLine1: '123 Main Street',
    addressLine2: '',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'us',
    showInSearch: true,
    showLocation: true,
    showContact: false,
    showReviews: true,
    showSessionHistory: true,
    autoAcceptEvents: false,
    activityStatus: true,
    allowDirectMessages: true,
    showBookingHistory: false,
  };

  const [originalData, setOriginalData] = useState<FormData>(initialFormData);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(originalData) !== JSON.stringify(formData);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSave = () => {
    setOriginalData(formData);
    setIsEditing(false);
    setShowConfirmDialog(false);
    toast.success('Account settings updated successfully!');
  };

  const handleAddPaymentMethod = () => {
    toast.success('Payment method added successfully!');
  };

  const handleRemovePaymentMethod = () => {
    toast.success('Payment method removed');
  };

  // Get list of changed fields for confirmation dialog
  const getChangedFields = () => {
    const changes: string[] = [];
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        // Convert camelCase to readable format
        const readable = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        changes.push(readable);
      }
    });
    return changes;
  };

  return (
    <>
      <div className="space-y-6 relative pb-20">
        {/* Edit Button */}
        {!isEditing && (
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Account Details</h2>
            <Button onClick={handleEdit} variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
          </div>
        )}

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              {isEditing ? 'Edit your login details and account settings' : 'Your login details and account settings'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This is your login email and where we will send notifications
                  </p>
                </>
              ) : (
                <p className="text-sm">{formData.email}</p>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Password</Label>
              {isEditing ? (
                <Button type="button" variant="outline" size="sm">
                  Change Password
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">••••••••</p>
              )}
              <p className="text-xs text-muted-foreground">
                Last changed 3 months ago
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Connected Accounts</Label>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold">G</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Google</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge variant="secondary">Connected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              <CreditCard className="inline h-5 w-5 mr-2" />
              Payment Information
            </CardTitle>
            <CardDescription>
              Manage your payment methods for booking sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 border rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Secure Payment Processing</p>
                  <p className="text-xs text-muted-foreground">
                    All payments are securely processed through Stripe. Game Masters Collective never stores your full card details.
                    Payments are held in escrow and released to DMs after sessions are completed.
                  </p>
                </div>
              </div>
            </div>

            {/* Saved Payment Methods */}
            <div className="space-y-3">
              <Label>Saved Payment Methods</Label>

              {/* Example Saved Card */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Visa ending in 4242</p>
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Expires 12/2026</p>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                      >
                        {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={handleRemovePaymentMethod}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Add New Payment Method */}
              {isEditing && (
                <Button type="button" variant="outline" className="w-full" onClick={handleAddPaymentMethod}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              )}
            </div>

            <Separator />

            {/* Billing Address */}
            <div className="space-y-3">
              <Label>Billing Address</Label>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Address Line 1"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  />
                  <Input
                    placeholder="Address Line 2"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  />
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  <Input
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                  <Input
                    placeholder="ZIP/Postal Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="text-sm">
                  <p>{formData.addressLine1}</p>
                  {formData.addressLine2 && <p>{formData.addressLine2}</p>}
                  <p>
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    {formData.country === 'us'
                      ? 'United States'
                      : formData.country === 'ca'
                        ? 'Canada'
                        : formData.country === 'uk'
                          ? 'United Kingdom'
                          : 'Australia'}
                  </p>
                </div>
              )}
            </div>

            {user.type === 'dm' && (
              <>
                <Separator />

                {/* DM Payout Information */}
                <div className="space-y-3">
                  <Label>Payout Information</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect your bank account or debit card to receive payments from completed sessions
                  </p>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 bg-primary/10 rounded flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Bank Account ••••4567</p>
                          <p className="text-xs text-muted-foreground">Wells Fargo</p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button type="button" variant="ghost" size="sm">
                          Update
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                    <p className="text-xs text-blue-900 dark:text-blue-100">
                      <strong>Payout Schedule:</strong> Earnings are transferred to your account 2 business days after
                      session completion. Minimum payout is $25.
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control what information is visible to others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Profile in Search Results</Label>
                <p className="text-sm text-muted-foreground">
                  {user.type === 'dm'
                    ? 'Allow players to find you when browsing for DMs'
                    : 'Allow DMs to see your player profile'}
                </p>
              </div>
              <Switch
                checked={formData.showInSearch}
                onCheckedChange={(checked) => handleInputChange('showInSearch', checked)}
                disabled={!isEditing}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Location</Label>
                <p className="text-sm text-muted-foreground">Display your city and state on your profile</p>
              </div>
              <Switch
                checked={formData.showLocation}
                onCheckedChange={(checked) => handleInputChange('showLocation', checked)}
                disabled={!isEditing}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Contact Information</Label>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your email after booking confirmation
                </p>
              </div>
              <Switch
                checked={formData.showContact}
                onCheckedChange={(checked) => handleInputChange('showContact', checked)}
                disabled={!isEditing}
              />
            </div>

            <Separator />

            {user.type === 'dm' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Reviews and Ratings</Label>
                    <p className="text-sm text-muted-foreground">
                      Display player reviews and ratings on your profile
                    </p>
                  </div>
                  <Switch
                    checked={formData.showReviews}
                    onCheckedChange={(checked) => handleInputChange('showReviews', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Session History</Label>
                    <p className="text-sm text-muted-foreground">
                      Display total number of sessions run on your profile
                    </p>
                  </div>
                  <Switch
                    checked={formData.showSessionHistory}
                    onCheckedChange={(checked) => handleInputChange('showSessionHistory', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Accept Event Sign-ups</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically confirm players who sign up for your events
                    </p>
                  </div>
                  <Switch
                    checked={formData.autoAcceptEvents}
                    onCheckedChange={(checked) => handleInputChange('autoAcceptEvents', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <Separator />
              </>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activity Status</Label>
                <p className="text-sm text-muted-foreground">
                  Show when you are online and active on the platform
                </p>
              </div>
              <Switch
                checked={formData.activityStatus}
                onCheckedChange={(checked) => handleInputChange('activityStatus', checked)}
                disabled={!isEditing}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Direct Messages</Label>
                <p className="text-sm text-muted-foreground">
                  {user.type === 'dm'
                    ? 'Let players send you messages before booking'
                    : 'Allow DMs to contact you directly'}
                </p>
              </div>
              <Switch
                checked={formData.allowDirectMessages}
                onCheckedChange={(checked) => handleInputChange('allowDirectMessages', checked)}
                disabled={!isEditing}
              />
            </div>

            {user.type === 'player' && (
              <>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Booking History</Label>
                    <p className="text-sm text-muted-foreground">
                      Let DMs see how many sessions you have attended
                    </p>
                  </div>
                  <Switch
                    checked={formData.showBookingHistory}
                    onCheckedChange={(checked) => handleInputChange('showBookingHistory', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button type="button" variant="destructive">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Bar for Unsaved Changes */}
      {isEditing && hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-sm font-medium">You have unsaved changes</p>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="button" onClick={handleSaveClick}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Account Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to update the following account information:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Fields being updated:</p>
              <ul className="text-sm space-y-1">
                {getChangedFields().map((field, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {field}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>Confirm & Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
