import { User } from '@/types';
import { Card, CardContent } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { Button } from '@/app/components/ui/button';
import { MapPin, Edit } from 'lucide-react';

interface PlayerProfilePreviewProps {
  user: User;
  onBackToEdit: () => void;
}

export function PlayerProfilePreview({ user, onBackToEdit }: PlayerProfilePreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg border-2 border-dashed">
        <div>
          <h3 className="font-semibold">Preview Mode</h3>
          <p className="text-sm text-muted-foreground">
            This is how GMs and other players see your profile when they view it
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <Badge variant="secondary">Player</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <p className="text-muted-foreground">
                Enthusiastic TTRPG player looking for engaging campaigns and one-shots. 
                I love roleplay and story-driven adventures!
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Experience Level</h4>
              <Badge variant="outline">Intermediate</Badge>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Favorite Systems</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">D&D 5e</Badge>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold mb-2">Preferred Play Style</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Roleplay</Badge>
                <Badge variant="secondary">Story</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This is a preview of your public player profile. 
          Your actual profile may show additional information based on your privacy settings.
        </p>
      </div>
    </div>
  );
}
