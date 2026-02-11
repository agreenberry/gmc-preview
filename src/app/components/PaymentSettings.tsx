import { useState } from 'react';
import { Plus, Trash2, DollarSign, MapPin, Globe, Home, Users, Clock, Percent } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Location, LocationPricing } from '../../types';
import { toast } from 'sonner';

interface PaymentSettingsProps {
  user?: any;
  onSave?: () => void;
}

export function PaymentSettings({ user, onSave }: PaymentSettingsProps) {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Online Sessions',
      type: 'online',
      details: 'Discord + Foundry VTT',
      isActive: true,
      pricing: {
        oneShot: 50,
        campaign: 40,
        perPlayer: 15,
        perHour: 25,
        bulkDiscounts: {
          enabled: true,
          fiveToNine: 10,
          tenPlus: 20,
        },
      },
    },
    {
      id: '2',
      name: 'Game Store - Downtown',
      type: 'physical',
      details: '123 Main St, San Francisco, CA',
      isActive: true,
      pricing: {
        oneShot: 60,
        campaign: 45,
        perPlayer: 18,
        perHour: 30,
        bulkDiscounts: {
          enabled: true,
          fiveToNine: 10,
          tenPlus: 15,
        },
      },
    },
  ]);

  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    type: 'online',
    isActive: true,
  });

  const addLocation = () => {
    if (!newLocation.name || !newLocation.details) {
      toast.error('Please fill in all location details');
      return;
    }

    const location: Location = {
      id: Date.now().toString(),
      name: newLocation.name,
      type: newLocation.type || 'online',
      details: newLocation.details,
      isActive: true,
      pricing: {
        oneShot: 50,
        campaign: 40,
        perPlayer: 15,
        perHour: 25,
        bulkDiscounts: {
          enabled: true,
          fiveToNine: 10,
          tenPlus: 20,
        },
      },
    };

    setLocations([...locations, location]);
    setNewLocation({ type: 'online', isActive: true });
    setShowAddLocation(false);
    toast.success('Location added successfully');
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id));
    toast.success('Location removed');
  };

  const updateLocationPricing = (
    locationId: string,
    field: keyof LocationPricing,
    value: any
  ) => {
    setLocations(
      locations.map((loc) =>
        loc.id === locationId
          ? {
              ...loc,
              pricing: {
                ...loc.pricing!,
                [field]: value,
              },
            }
          : loc
      )
    );
  };

  const updateBulkDiscount = (
    locationId: string,
    field: 'enabled' | 'fiveToNine' | 'tenPlus',
    value: any
  ) => {
    setLocations(
      locations.map((loc) =>
        loc.id === locationId
          ? {
              ...loc,
              pricing: {
                ...loc.pricing!,
                bulkDiscounts: {
                  ...loc.pricing!.bulkDiscounts!,
                  [field]: value,
                },
              },
            }
          : loc
      )
    );
  };

  const handleSave = () => {
    toast.success('Payment settings saved successfully!');
    onSave?.();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <DollarSign className="inline h-5 w-5 mr-1" />
            Payment Settings
          </CardTitle>
          <CardDescription>
            Configure pricing for each of your locations. Set per-session rates, per-player charges, hourly rates, and bulk discounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Locations List */}
          {locations.map((location, index) => (
            <div key={location.id}>
              {index > 0 && <Separator className="my-6" />}
              
              <div className="space-y-4">
                {/* Location Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {location.type === 'online' ? (
                      <Globe className="h-5 w-5 text-primary mt-1" />
                    ) : (
                      <Home className="h-5 w-5 text-primary mt-1" />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location.details}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                        {location.type === 'online' ? 'Online' : 'In-Person'}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLocation(location.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Pricing Settings */}
                <div className="pl-8 space-y-4">
                  {/* Session-Based Pricing */}
                  <div className="space-y-3">
                    <Label className="text-base">Session-Based Pricing</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`oneshot-${location.id}`}>
                          One-Shot (per session)
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id={`oneshot-${location.id}`}
                            type="number"
                            className="pl-7"
                            value={location.pricing?.oneShot || 0}
                            onChange={(e) =>
                              updateLocationPricing(
                                location.id,
                                'oneShot',
                                Number(e.target.value)
                              )
                            }
                            min="0"
                            step="5"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`campaign-${location.id}`}>
                          Campaign (per session)
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id={`campaign-${location.id}`}
                            type="number"
                            className="pl-7"
                            value={location.pricing?.campaign || 0}
                            onChange={(e) =>
                              updateLocationPricing(
                                location.id,
                                'campaign',
                                Number(e.target.value)
                              )
                            }
                            min="0"
                            step="5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Alternative Pricing Models */}
                  <div className="space-y-3">
                    <Label className="text-base">Alternative Pricing Models</Label>
                    <p className="text-sm text-muted-foreground">
                      Optional: Set per-player or per-hour rates as alternatives to session-based pricing
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`per-player-${location.id}`}>
                          <Users className="inline h-3 w-3 mr-1" />
                          Per Player/Head
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id={`per-player-${location.id}`}
                            type="number"
                            className="pl-7"
                            value={location.pricing?.perPlayer || ''}
                            onChange={(e) =>
                              updateLocationPricing(
                                location.id,
                                'perPlayer',
                                e.target.value ? Number(e.target.value) : undefined
                              )
                            }
                            placeholder="Optional"
                            min="0"
                            step="1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Charge per player attending
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`per-hour-${location.id}`}>
                          <Clock className="inline h-3 w-3 mr-1" />
                          Per Hour
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id={`per-hour-${location.id}`}
                            type="number"
                            className="pl-7"
                            value={location.pricing?.perHour || ''}
                            onChange={(e) =>
                              updateLocationPricing(
                                location.id,
                                'perHour',
                                e.target.value ? Number(e.target.value) : undefined
                              )
                            }
                            placeholder="Optional"
                            min="0"
                            step="5"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Hourly rate for flexible sessions
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Bulk Discounts */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">
                        <Percent className="inline h-4 w-4 mr-1" />
                        Bulk Session Discounts
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`enable-bulk-${location.id}`}
                          checked={location.pricing?.bulkDiscounts?.enabled}
                          onCheckedChange={(checked) =>
                            updateBulkDiscount(location.id, 'enabled', checked)
                          }
                        />
                        <Label
                          htmlFor={`enable-bulk-${location.id}`}
                          className="font-normal cursor-pointer"
                        >
                          Enable
                        </Label>
                      </div>
                    </div>

                    {location.pricing?.bulkDiscounts?.enabled && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`discount-5-${location.id}`}>
                              5-9 Sessions Discount
                            </Label>
                            <div className="relative">
                              <Input
                                id={`discount-5-${location.id}`}
                                type="number"
                                className="pr-8"
                                value={location.pricing?.bulkDiscounts?.fiveToNine || 0}
                                onChange={(e) =>
                                  updateBulkDiscount(
                                    location.id,
                                    'fiveToNine',
                                    Number(e.target.value)
                                  )
                                }
                                min="0"
                                max="100"
                                step="5"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                %
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`discount-10-${location.id}`}>
                              10+ Sessions Discount
                            </Label>
                            <div className="relative">
                              <Input
                                id={`discount-10-${location.id}`}
                                type="number"
                                className="pr-8"
                                value={location.pricing?.bulkDiscounts?.tenPlus || 0}
                                onChange={(e) =>
                                  updateBulkDiscount(
                                    location.id,
                                    'tenPlus',
                                    Number(e.target.value)
                                  )
                                }
                                min="0"
                                max="100"
                                step="5"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                          <p className="text-sm text-blue-900 dark:text-blue-100">
                            <strong>Example:</strong> With ${location.pricing?.campaign}/session and {location.pricing?.bulkDiscounts?.tenPlus}% discount for 10 sessions, 
                            a player would pay ${((location.pricing?.campaign || 0) * 10 * (1 - (location.pricing?.bulkDiscounts?.tenPlus || 0) / 100)).toFixed(0)} instead of ${((location.pricing?.campaign || 0) * 10).toFixed(0)}, 
                            saving ${((location.pricing?.campaign || 0) * 10 * ((location.pricing?.bulkDiscounts?.tenPlus || 0) / 100)).toFixed(0)}.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Separator className="my-6" />

          {/* Add New Location */}
          {!showAddLocation ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddLocation(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          ) : (
            <div className="space-y-4 p-4 border border-dashed rounded-lg">
              <h4 className="font-semibold">Add New Location</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-location-type">Location Type</Label>
                  <Select
                    value={newLocation.type}
                    onValueChange={(value: 'online' | 'physical') =>
                      setNewLocation({ ...newLocation, type: value })
                    }
                  >
                    <SelectTrigger id="new-location-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">
                        <Globe className="inline h-4 w-4 mr-2" />
                        Online
                      </SelectItem>
                      <SelectItem value="physical">
                        <Home className="inline h-4 w-4 mr-2" />
                        In-Person
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-location-name">Location Name</Label>
                  <Input
                    id="new-location-name"
                    placeholder={
                      newLocation.type === 'online'
                        ? 'e.g., Online Sessions'
                        : 'e.g., Downtown Game Store'
                    }
                    value={newLocation.name || ''}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-location-details">
                    {newLocation.type === 'online' ? 'Platform Details' : 'Address'}
                  </Label>
                  <Input
                    id="new-location-details"
                    placeholder={
                      newLocation.type === 'online'
                        ? 'e.g., Discord + Roll20'
                        : 'e.g., 123 Main St, City, State'
                    }
                    value={newLocation.details || ''}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, details: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" onClick={addLocation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddLocation(false);
                      setNewLocation({ type: 'online', isActive: true });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <p className="text-sm font-semibold">Pricing Tips:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Session-based pricing is most common for D&D games</li>
              <li>Per-player rates work well for larger groups</li>
              <li>Hourly rates are useful for flexible or shorter sessions</li>
              <li>Campaign rates are typically lower than one-shots due to commitment</li>
              <li>Bulk discounts encourage long-term campaign bookings</li>
            </ul>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>
              Save Payment Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}