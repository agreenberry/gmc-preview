import { User } from '@/types';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Edit } from 'lucide-react';
import { mockDMs } from '@/data/mock/mockData';
import { DMProfilePage } from './DMProfilePage';

interface DMProfilePreviewProps {
  user: User;
  onBackToEdit: () => void;
}

export function DMProfilePreview({ user, onBackToEdit }: DMProfilePreviewProps) {
  // Find the corresponding DM data from mockDMs
  const dmData = mockDMs.find(dm => dm.id === user.id || dm.name === user.name);

  if (!dmData) {
    // Fallback if DM data not found
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">DM Profile Preview</h2>
            <p className="text-sm text-muted-foreground">This is how players see your DM profile</p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Complete your DM profile settings to see a preview.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg border-2 border-dashed">
        <div>
          <h3 className="font-semibold">Preview Mode</h3>
          <p className="text-sm text-muted-foreground">
            This is how players see your DM profile when they view it
          </p>
        </div>
      </div>

      {/* Actual DM Profile View */}
      <DMProfilePage 
        dm={dmData} 
        onBack={onBackToEdit}
        isPreview={true}
      />
    </div>
  );
}