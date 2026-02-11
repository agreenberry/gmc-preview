import { useState } from 'react';
import { DMAvailability, Location, RecurringSchedule, TimeSlot, DateOverride } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Calendar } from '@/app/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { MapPin, Globe, Plus, Trash2, Edit, Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface AvailabilityPageProps {
  availability: DMAvailability;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function AvailabilityPage({ availability: initialAvailability }: AvailabilityPageProps) {
  const [availability, setAvailability] = useState<DMAvailability>(initialAvailability);
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isBlockDateOpen, setIsBlockDateOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Availability Settings</h1>
        <p className="text-muted-foreground">
          Manage your locations, schedules, and availability calendar
        </p>
      </div>

      <Tabs defaultValue="locations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="schedules">Recurring Schedules</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        {/* LOCATIONS TAB */}
        <TabsContent value="locations" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Add the locations where you run sessions (physical venues or online platforms)
            </p>
            <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent>
                <AddLocationDialog
                  onAdd={(location) => {
                    setAvailability(prev => ({
                      ...prev,
                      locations: [...prev.locations, location]
                    }));
                    setIsAddLocationOpen(false);
                    toast.success('Location added successfully');
                  }}
                  onCancel={() => setIsAddLocationOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availability.locations.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No locations added yet. Add your first location to get started.
                </CardContent>
              </Card>
            ) : (
              availability.locations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onEdit={(loc) => setEditingLocation(loc)}
                  onDelete={(id) => {
                    setAvailability(prev => ({
                      ...prev,
                      locations: prev.locations.filter(l => l.id !== id),
                      recurringSchedules: prev.recurringSchedules.filter(s => s.locationId !== id)
                    }));
                    toast.success('Location deleted');
                  }}
                  onToggleActive={(id) => {
                    setAvailability(prev => ({
                      ...prev,
                      locations: prev.locations.map(l =>
                        l.id === id ? { ...l, isActive: !l.isActive } : l
                      )
                    }));
                  }}
                />
              ))
            )}
          </div>
        </TabsContent>

        {/* RECURRING SCHEDULES TAB */}
        <TabsContent value="schedules" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Set up your weekly recurring availability for each location
            </p>
            <Dialog open={isAddScheduleOpen} onOpenChange={setIsAddScheduleOpen}>
              <DialogTrigger asChild>
                <Button disabled={availability.locations.length === 0}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <AddScheduleDialog
                  locations={availability.locations.filter(l => l.isActive)}
                  onAdd={(schedule) => {
                    setAvailability(prev => ({
                      ...prev,
                      recurringSchedules: [...prev.recurringSchedules, schedule]
                    }));
                    setIsAddScheduleOpen(false);
                    toast.success('Schedule added successfully');
                  }}
                  onCancel={() => setIsAddScheduleOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {availability.locations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Add locations first before setting up schedules
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {availability.locations.filter(l => l.isActive).map((location) => (
                <LocationScheduleCard
                  key={location.id}
                  location={location}
                  schedules={availability.recurringSchedules.filter(s => s.locationId === location.id)}
                  onDeleteSchedule={(id) => {
                    setAvailability(prev => ({
                      ...prev,
                      recurringSchedules: prev.recurringSchedules.filter(s => s.id !== id)
                    }));
                    toast.success('Schedule deleted');
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* CALENDAR TAB */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Block specific dates or add one-off availability
            </p>
            <Dialog open={isBlockDateOpen} onOpenChange={setIsBlockDateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Block Dates
                </Button>
              </DialogTrigger>
              <DialogContent>
                <BlockDateDialog
                  onBlock={(override) => {
                    setAvailability(prev => ({
                      ...prev,
                      dateOverrides: [...prev.dateOverrides, override]
                    }));
                    setIsBlockDateOpen(false);
                    toast.success('Date blocked successfully');
                  }}
                  onCancel={() => setIsBlockDateOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <CalendarView
            availability={availability}
            onDeleteOverride={(id) => {
              setAvailability(prev => ({
                ...prev,
                dateOverrides: prev.dateOverrides.filter(o => o.id !== id)
              }));
              toast.success('Override removed');
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Edit Location Dialog */}
      {editingLocation && (
        <Dialog open={!!editingLocation} onOpenChange={() => setEditingLocation(null)}>
          <DialogContent>
            <EditLocationDialog
              location={editingLocation}
              onSave={(updated) => {
                setAvailability(prev => ({
                  ...prev,
                  locations: prev.locations.map(l =>
                    l.id === updated.id ? updated : l
                  )
                }));
                setEditingLocation(null);
                toast.success('Location updated');
              }}
              onCancel={() => setEditingLocation(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Location Card Component
function LocationCard({ 
  location, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: { 
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {location.type === 'physical' ? (
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            ) : (
              <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
            )}
            <div>
              <CardTitle className="text-lg">{location.name}</CardTitle>
              <CardDescription className="mt-1">{location.details}</CardDescription>
            </div>
          </div>
          <Badge variant={location.isActive ? 'default' : 'secondary'}>
            {location.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleActive(location.id)}
          >
            {location.isActive ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(location)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(location.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Add Location Dialog
function AddLocationDialog({ onAdd, onCancel }: { onAdd: (location: Location) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'physical' | 'online'>('physical');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (!name || !details) {
      toast.error('Please fill in all fields');
      return;
    }

    onAdd({
      id: `loc-${Date.now()}`,
      name,
      type,
      details,
      isActive: true
    });

    setName('');
    setDetails('');
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogDescription>
          Add a physical venue or online platform where you run sessions
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="type">Location Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as 'physical' | 'online')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physical">Physical Venue</SelectItem>
              <SelectItem value="online">Online Platform</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder={type === 'physical' ? 'e.g., My Home, Dragon\'s Lair Game Store' : 'e.g., Roll20, Foundry VTT'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="details">
            {type === 'physical' ? 'Address' : 'Platform Details'}
          </Label>
          <Input
            id="details"
            placeholder={type === 'physical' ? 'e.g., 123 Main St, Seattle, WA' : 'e.g., Discord + Foundry VTT'}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Location</Button>
      </DialogFooter>
    </>
  );
}

// Edit Location Dialog
function EditLocationDialog({ 
  location, 
  onSave, 
  onCancel 
}: { 
  location: Location;
  onSave: (location: Location) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(location.name);
  const [type, setType] = useState<'physical' | 'online'>(location.type);
  const [details, setDetails] = useState(location.details);

  const handleSubmit = () => {
    if (!name || !details) {
      toast.error('Please fill in all fields');
      return;
    }

    onSave({
      ...location,
      name,
      type,
      details
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Location</DialogTitle>
        <DialogDescription>
          Update location information
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="type">Location Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as 'physical' | 'online')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physical">Physical Venue</SelectItem>
              <SelectItem value="online">Online Platform</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="details">
            {type === 'physical' ? 'Address' : 'Platform Details'}
          </Label>
          <Input
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </DialogFooter>
    </>
  );
}

// Add Schedule Dialog
function AddScheduleDialog({ 
  locations, 
  onAdd, 
  onCancel 
}: { 
  locations: Location[];
  onAdd: (schedule: RecurringSchedule) => void;
  onCancel: () => void;
}) {
  const [locationId, setLocationId] = useState(locations[0]?.id || '');
  const [dayOfWeek, setDayOfWeek] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(1);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '18:00', endTime: '22:00' }]);

  const handleSubmit = () => {
    if (!locationId) {
      toast.error('Please select a location');
      return;
    }

    onAdd({
      id: `schedule-${Date.now()}`,
      locationId,
      dayOfWeek,
      timeSlots
    });
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '18:00', endTime: '22:00' }]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: 'startTime' | 'endTime', value: string) => {
    setTimeSlots(timeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    ));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Recurring Schedule</DialogTitle>
        <DialogDescription>
          Set up when you're available at a specific location
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label>Location</Label>
          <Select value={locationId} onValueChange={setLocationId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Day of Week</Label>
          <Select value={dayOfWeek.toString()} onValueChange={(v) => setDayOfWeek(parseInt(v) as 0 | 1 | 2 | 3 | 4 | 5 | 6)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DAYS_OF_WEEK.map((day, index) => (
                <SelectItem key={day} value={index.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Time Slots</Label>
            <Button size="sm" variant="outline" onClick={addTimeSlot}>
              <Plus className="h-4 w-4 mr-1" />
              Add Slot
            </Button>
          </div>
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                type="time"
                value={slot.startTime}
                onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
              />
              {timeSlots.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeTimeSlot(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Schedule</Button>
      </DialogFooter>
    </>
  );
}

// Location Schedule Card
function LocationScheduleCard({ 
  location, 
  schedules, 
  onDeleteSchedule 
}: { 
  location: Location;
  schedules: RecurringSchedule[];
  onDeleteSchedule: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {location.type === 'physical' ? (
            <MapPin className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Globe className="h-5 w-5 text-muted-foreground" />
          )}
          <CardTitle>{location.name}</CardTitle>
        </div>
        <CardDescription>{location.details}</CardDescription>
      </CardHeader>
      <CardContent>
        {schedules.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recurring schedules set for this location</p>
        ) : (
          <div className="space-y-2">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{DAYS_OF_WEEK[schedule.dayOfWeek]}</Badge>
                  <div className="flex flex-wrap gap-2">
                    {schedule.timeSlots.map((slot, index) => (
                      <span key={index} className="text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {slot.startTime} - {slot.endTime}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteSchedule(schedule.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Block Date Dialog
function BlockDateDialog({ onBlock, onCancel }: { onBlock: (override: DateOverride) => void; onCancel: () => void }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    onBlock({
      id: `override-${Date.now()}`,
      date: format(selectedDate, 'yyyy-MM-dd'),
      type: 'blocked',
      reason
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Block Date</DialogTitle>
        <DialogDescription>
          Mark a date as unavailable (e.g., vacation, personal time)
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason">Reason (optional)</Label>
          <Textarea
            id="reason"
            placeholder="e.g., On vacation, Personal commitment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Block Date</Button>
      </DialogFooter>
    </>
  );
}

// Calendar View Component
function CalendarView({ 
  availability, 
  onDeleteOverride 
}: { 
  availability: DMAvailability;
  onDeleteOverride: (id: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const blockedDates = availability.dateOverrides
    .filter(o => o.type === 'blocked')
    .map(o => new Date(o.date));

  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const overridesForDate = availability.dateOverrides.filter(o => o.date === selectedDateStr);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>View your blocked dates</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              blocked: blockedDates
            }}
            modifiersStyles={{
              blocked: {
                textDecoration: 'line-through',
                color: 'var(--muted-foreground)',
                opacity: 0.5
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </CardTitle>
          <CardDescription>Overrides for this date</CardDescription>
        </CardHeader>
        <CardContent>
          {overridesForDate.length === 0 ? (
            <p className="text-sm text-muted-foreground">No overrides for this date</p>
          ) : (
            <div className="space-y-3">
              {overridesForDate.map((override) => (
                <div key={override.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-md">
                  <div>
                    <Badge variant={override.type === 'blocked' ? 'destructive' : 'default'}>
                      {override.type === 'blocked' ? 'Blocked' : 'Available'}
                    </Badge>
                    {override.reason && (
                      <p className="text-sm text-muted-foreground mt-1">{override.reason}</p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteOverride(override.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
