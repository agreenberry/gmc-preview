import { useState } from 'react';
import { User } from '@/types';
import { MapPin, Pencil, X, Save } from 'lucide-react';
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
import { PlayerProfilePreview } from '@/app/components/PlayerProfilePreview';

interface PlayerProfileSectionProps {
  user: User;
  onSave: (e: React.FormEvent) => void;
}

interface PlayerFormData {
  displayName: string;
  bio: string;
  location: string;
  experience: string;
  favoriteSystems: string[];
  preferredStyles: string[];
}

export function PlayerProfileSection({ user, onSave }: PlayerProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Initial form data
  const initialFormData: PlayerFormData = {
    displayName: user.name,
    bio: '',
    location: 'San Francisco, CA',
    experience: 'intermediate',
    favoriteSystems: ['D&D 5e'],
    preferredStyles: ['Roleplay', 'Story'],
  };

  const [originalData, setOriginalData] = useState<PlayerFormData>(initialFormData);
  const [formData, setFormData] = useState<PlayerFormData>(initialFormData);

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(originalData) !== JSON.stringify(formData);

  const handleInputChange = (field: keyof PlayerFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: 'favoriteSystems' | 'preferredStyles', value: string, checked: boolean) => {
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
    toast.success('Player profile updated successfully!');
  };

  // Get list of changed fields for confirmation dialog
  const getChangedFields = () => {
    const changes: string[] = [];
    (Object.keys(formData) as Array<keyof PlayerFormData>).forEach((key) => {
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
        <h2 className="text-2xl font-bold">Player Profile</h2>
          <Button onClick={handleEdit} variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        <PlayerProfilePreview user={user} onBackToEdit={() => {}} />
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
              This information will be visible to DMs and other players
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
                This is how you'll appear to others on Game Masters Collective
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell DMs about yourself, your experience with TTRPGs, and what you're looking for..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">
                Share your TTRPG interests and experience
              </p>
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

        {/* Player-Specific Profile Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Player Preferences</CardTitle>
            <CardDescription>Help DMs understand what you're looking for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Experience Level */}
            <div className="space-y-2">
              <Label htmlFor="player-experience">Your Experience Level</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger id="player-experience">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New to TTRPGs</SelectItem>
                  <SelectItem value="beginner">Beginner (1-2 campaigns)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (Several campaigns)</SelectItem>
                  <SelectItem value="veteran">Veteran Player</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Favorite Game Systems */}
            <div className="space-y-3">
              <Label>Favorite Game Systems</Label>
              <p className="text-xs text-muted-foreground">What systems do you enjoy or want to try?</p>
              <div className="grid grid-cols-2 gap-3">
                {['D&D 5e', 'Pathfinder 2e', 'Call of Cthulhu', 'Vampire: The Masquerade', 'Starfinder', 'Dungeon World'].map(
                  (system) => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox
                        id={`player-system-${system}`}
                        checked={formData.favoriteSystems.includes(system)}
                        onCheckedChange={(checked) => handleCheckboxChange('favoriteSystems', system, checked as boolean)}
                      />
                      <Label htmlFor={`player-system-${system}`} className="font-normal cursor-pointer">
                        {system}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <Separator />

            {/* Preferred Play Style */}
            <div className="space-y-3">
              <Label>Preferred Play Style</Label>
              <p className="text-xs text-muted-foreground">What aspects of gaming do you enjoy most?</p>
              <div className="grid grid-cols-2 gap-3">
                {['Roleplay', 'Combat', 'Exploration', 'Story', 'Puzzles', 'Social Interaction'].map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={`player-style-${style}`}
                      checked={formData.preferredStyles.includes(style)}
                      onCheckedChange={(checked) => handleCheckboxChange('preferredStyles', style, checked as boolean)}
                    />
                    <Label htmlFor={`player-style-${style}`} className="font-normal cursor-pointer">
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {user.type === 'player' && (
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle>Become a DM</CardTitle>
              <CardDescription>Ready to run your own games?</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Switch to a DM account to start accepting bookings and running sessions for players. You'll get access
                to the DM Dashboard and can set your own rates and availability.
              </p>
              <Button variant="outline">Apply to Become a DM</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sticky Bar for Unsaved Changes */}
      
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasChanges && <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
              {hasChanges && <p className="text-sm font-medium">You have unsaved changes</p>}
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="button" onClick={handleSaveClick} disabled={!hasChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      

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
