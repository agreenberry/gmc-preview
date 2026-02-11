import { useState } from 'react';
import { User } from '@/types';
import { DollarSign, MapPin, Pencil, X, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Checkbox } from '@/app/components/ui/checkbox';
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
import { DMProfilePreview } from '@/app/components/DMProfilePreview';

interface DMProfileSectionProps {
  user: User;
  onSave: (e: React.FormEvent) => void;
}

interface DMFormData {
  displayName: string;
  bio: string;
  location: string;
  experience: string;
  gameSystems: string[];
  campaignStyles: string[];
  onlineSessions: boolean;
  inPersonSessions: boolean;
  oneshotPrice: number;
  campaignPrice: number;
  discount5to9: number;
  discount10plus: number;
  bulkDiscountsEnabled: boolean;
}

export function DMProfileSection({ user, onSave }: DMProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Initial form data
  const initialFormData: DMFormData = {
    displayName: user.name,
    bio: 'Veteran DM with 8+ years of experience running epic campaigns and memorable one-shots.',
    location: 'San Francisco, CA',
    experience: 'veteran',
    gameSystems: ['D&D 5e'],
    campaignStyles: ['Roleplay-Heavy', 'Story-Driven'],
    onlineSessions: true,
    inPersonSessions: true,
    oneshotPrice: 50,
    campaignPrice: 40,
    discount5to9: 10,
    discount10plus: 20,
    bulkDiscountsEnabled: true,
  };

  const [originalData, setOriginalData] = useState<DMFormData>(initialFormData);
  const [formData, setFormData] = useState<DMFormData>(initialFormData);

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(originalData) !== JSON.stringify(formData);

  const handleInputChange = (field: keyof DMFormData, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: 'gameSystems' | 'campaignStyles', value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
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
    toast.success('DM profile updated successfully!');
  };

  // Get list of changed fields for confirmation dialog
  const getChangedFields = () => {
    const changes: string[] = [];
    (Object.keys(formData) as Array<keyof DMFormData>).forEach((key) => {
      if (JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])) {
        // Convert camelCase to readable format
        const readable = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        changes.push(readable);
      }
    });
    return changes;
  };

  // If not editing, show the preview with an edit button
  if (!isEditing) {
    return (
      <div className="space-y-4">
                <div className="flex justify-between">
                <h2 className="text-2xl font-bold">GM Profile</h2>
          <Button onClick={handleEdit} variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        <DMProfilePreview user={user} onBackToEdit={() => {}} />
      </div>
    );
  }

  // Otherwise show the edit form
  return (
    <>
      <div className="space-y-6 relative pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Public Profile Information</CardTitle>
            <CardDescription>
              This information will be visible to players browsing for DMs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Button type="button" variant="outline">
                    Upload New Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max size 5MB.</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                placeholder="The name shown on your profile"
              />
              <p className="text-xs text-muted-foreground">
                This is how you will appear to others on Game Masters Collective
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell players about your DMing style, experience, and what makes your games special..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">Help players understand your style and expertise</p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                <MapPin className="inline h-3 w-3 mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State or Region"
              />
              <p className="text-xs text-muted-foreground">Helps players find DMs in their area</p>
            </div>
          </CardContent>
        </Card>

        {/* DM-Specific Profile Fields */}
        <Card>
          <CardHeader>
            <CardTitle>DM Experience & Style</CardTitle>
            <CardDescription>Help players find the right DM for their gaming style</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Experience Level */}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger id="experience">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (Less than 1 year)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                  <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                  <SelectItem value="veteran">Veteran (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Game Systems */}
            <div className="space-y-3">
              <Label>Game Systems You Run *</Label>
              <p className="text-xs text-muted-foreground">Select all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {['D&D 5e', 'Pathfinder 2e', 'Call of Cthulhu', 'Vampire: The Masquerade', 'Starfinder', 'Dungeon World', 'FATE', 'Other'].map(
                  (system) => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox
                        id={`system-${system}`}
                        checked={formData.gameSystems.includes(system)}
                        onCheckedChange={(checked) => handleCheckboxChange('gameSystems', system, checked as boolean)}
                      />
                      <Label htmlFor={`system-${system}`} className="font-normal cursor-pointer">
                        {system}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <Separator />

            {/* Campaign Style */}
            <div className="space-y-3">
              <Label>Campaign Style *</Label>
              <p className="text-xs text-muted-foreground">What is your focus in sessions?</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Roleplay-Heavy',
                  'Combat-Focused',
                  'Exploration',
                  'Story-Driven',
                  'Sandbox',
                  'Mystery/Investigation',
                  'Horror',
                  'Comedy',
                ].map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={`style-${style}`}
                      checked={formData.campaignStyles.includes(style)}
                      onCheckedChange={(checked) => handleCheckboxChange('campaignStyles', style, checked as boolean)}
                    />
                    <Label htmlFor={`style-${style}`} className="font-normal cursor-pointer">
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Session Types */}
            <div className="space-y-3">
              <Label>Session Types Offered *</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="online"
                    checked={formData.onlineSessions}
                    onCheckedChange={(checked) => handleInputChange('onlineSessions', checked as boolean)}
                  />
                  <Label htmlFor="online" className="font-normal cursor-pointer">
                    Online Sessions (Roll20, Foundry, Discord, etc.)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-person"
                    checked={formData.inPersonSessions}
                    onCheckedChange={(checked) => handleInputChange('inPersonSessions', checked as boolean)}
                  />
                  <Label htmlFor="in-person" className="font-normal cursor-pointer">
                    In-Person Sessions
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <DollarSign className="inline h-5 w-5 mr-1" />
              Pricing
            </CardTitle>
            <CardDescription>Set your rates for different session types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="oneshot-price">One-Shot Price (per session)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="oneshot-price"
                    type="number"
                    className="pl-7"
                    value={formData.oneshotPrice}
                    onChange={(e) => handleInputChange('oneshotPrice', Number(e.target.value))}
                    min="0"
                    step="5"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Price for a single session (3-4 hours)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-price">Campaign Price (per session)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="campaign-price"
                    type="number"
                    className="pl-7"
                    value={formData.campaignPrice}
                    onChange={(e) => handleInputChange('campaignPrice', Number(e.target.value))}
                    min="0"
                    step="5"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Per-session rate for ongoing campaigns</p>
              </div>
            </div>

            <Separator />

            {/* Bulk Session Discounts */}
            <div className="space-y-4">
              <div>
                <Label>Bulk Session Discounts</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Offer discounts to players who book multiple campaign sessions at once
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-5">Discount for 5-9 Sessions</Label>
                  <div className="relative">
                    <Input
                      id="discount-5"
                      type="number"
                      className="pr-8"
                      value={formData.discount5to9}
                      onChange={(e) => handleInputChange('discount5to9', Number(e.target.value))}
                      min="0"
                      max="100"
                      step="5"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Discount applied when booking 5-9 sessions</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount-10">Discount for 10+ Sessions</Label>
                  <div className="relative">
                    <Input
                      id="discount-10"
                      type="number"
                      className="pr-8"
                      value={formData.discount10plus}
                      onChange={(e) => handleInputChange('discount10plus', Number(e.target.value))}
                      min="0"
                      max="100"
                      step="5"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Discount applied when booking 10+ sessions</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Example:</strong> With a ${formData.campaignPrice} campaign rate and{' '}
                  {formData.discount10plus}% discount for 10 sessions, a player booking 10 sessions would pay $
                  {(formData.campaignPrice * 10 * (1 - formData.discount10plus / 100)).toFixed(0)} instead of $
                  {formData.campaignPrice * 10}, saving ${(formData.campaignPrice * 10 * (formData.discount10plus / 100)).toFixed(0)}.
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="enable-bulk-discounts"
                  checked={formData.bulkDiscountsEnabled}
                  onCheckedChange={(checked) => handleInputChange('bulkDiscountsEnabled', checked as boolean)}
                />
                <div>
                  <Label htmlFor="enable-bulk-discounts" className="font-normal cursor-pointer">
                    Enable bulk session discounts
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Uncheck to disable bulk discounts and accept single session bookings only
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Pricing Tips:</strong> Campaign rates are typically lower than one-shots due to the
                commitment. Consider your experience level and local market rates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Bar for Unsaved Changes */}
      {hasChanges && (
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
            <AlertDialogTitle>Confirm Profile Changes</AlertDialogTitle>
            <AlertDialogDescription>You are about to update the following profile information:</AlertDialogDescription>
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
