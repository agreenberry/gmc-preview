import { useState } from "react";
import { DungeonMaster } from "@/types";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Search,
  MapPin,
  Star,
  DollarSign,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  CalendarCheck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";

interface HomePageProps {
  dms: DungeonMaster[];
  onSelectDM: (dmId: string) => void;
}

// Helper function to check if DM has upcoming events
const hasUpcomingEvents = (dm: DungeonMaster): boolean => {
  if (!dm.events || dm.events.length === 0) return false;
  
  const now = new Date();
  return dm.events.some(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now && event.status === 'open';
  });
};

export function HomePage({ dms, onSelectDM }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSystem, setFilterSystem] =
    useState<string>("all");
  const [filterSessionType, setFilterSessionType] =
    useState<string>("all");
  const [filterStyle, setFilterStyle] = useState<string>("all");
  
  // Advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterDay, setFilterDay] = useState<string>("all");
  const [filterTime, setFilterTime] = useState<string>("all");
  const [filterMinPrice, setFilterMinPrice] = useState<string>("");
  const [filterMaxPrice, setFilterMaxPrice] = useState<string>("");
  const [selectedGameSystems, setSelectedGameSystems] = useState<string[]>([]);

  const allGameSystems = [
    "D&D 1e",
    "D&D 2e",
    "D&D 3e",
    "D&D 3.5e",
    "D&D 4e",
    "D&D 5e",
    "Pathfinder 1e",
    "Pathfinder 2e",
    "DaggerHeart",
  ];

  const toggleGameSystem = (system: string) => {
    setSelectedGameSystems(prev =>
      prev.includes(system)
        ? prev.filter(s => s !== system)
        : [...prev, system]
    );
  };

  const filteredDMs = dms.filter((dm) => {
    const matchesSearch =
      dm.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      dm.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dm.location && dm.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSystem =
      filterSystem === "all" ||
      dm.gameSystems.includes(filterSystem);
    
    const matchesSessionType =
      filterSessionType === "all" ||
      dm.sessionTypes.includes(filterSessionType as any);
    
    const matchesStyle =
      filterStyle === "all" ||
      dm.campaignStyle.includes(filterStyle);

    // Advanced filters
    const matchesLocation =
      !filterLocation ||
      (dm.location && dm.location.toLowerCase().includes(filterLocation.toLowerCase()));

    const matchesSelectedSystems =
      selectedGameSystems.length === 0 ||
      selectedGameSystems.some(system => dm.gameSystems.includes(system));

    // Price range filter
    const campaignPrice = dm.pricing.campaign;
    const matchesMinPrice =
      !filterMinPrice || campaignPrice >= Number(filterMinPrice);
    const matchesMaxPrice =
      !filterMaxPrice || campaignPrice <= Number(filterMaxPrice);

    // Day filter (simplified - in production would check actual availability)
    const matchesDay = filterDay === "all";

    // Time filter (simplified - in production would check actual availability)
    const matchesTime = filterTime === "all";

    return (
      matchesSearch &&
      matchesSystem &&
      matchesSessionType &&
      matchesStyle &&
      matchesLocation &&
      matchesSelectedSystems &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesDay &&
      matchesTime
    );
  });

  const hasActiveFilters =
    filterSystem !== "all" ||
    filterSessionType !== "all" ||
    filterStyle !== "all" ||
    filterLocation !== "" ||
    filterDay !== "all" ||
    filterTime !== "all" ||
    filterMinPrice !== "" ||
    filterMaxPrice !== "" ||
    selectedGameSystems.length > 0;

  const clearAllFilters = () => {
    setFilterSystem("all");
    setFilterSessionType("all");
    setFilterStyle("all");
    setFilterLocation("");
    setFilterDay("all");
    setFilterTime("all");
    setFilterMinPrice("");
    setFilterMaxPrice("");
    setSelectedGameSystems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 dice-pattern opacity-30" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl medieval-heading">
              Find Your Perfect Game Master
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with experienced DMs for unforgettable D&D
              campaigns and one-shots
            </p>

            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by game or location..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-10"
                />
              </div>
              <Button size="lg">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-muted/50">
        <div className="container py-6">
          <div className="flex flex-wrap gap-4">
            <Select
              value={filterSystem}
              onValueChange={setFilterSystem}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Game System" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                <SelectItem value="D&D 5e">D&D 5e</SelectItem>
                <SelectItem value="Pathfinder 2e">
                  Pathfinder 2e
                </SelectItem>
                <SelectItem value="Call of Cthulhu">
                  Call of Cthulhu
                </SelectItem>
                <SelectItem value="World of Darkness">
                  World of Darkness
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterSessionType}
              onValueChange={setFilterSessionType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Session Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="in-person">
                  In-Person
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterStyle}
              onValueChange={setFilterStyle}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Campaign Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="Roleplay-heavy">
                  Roleplay-heavy
                </SelectItem>
                <SelectItem value="Combat-focused">
                  Combat-focused
                </SelectItem>
                <SelectItem value="Story-driven">
                  Story-driven
                </SelectItem>
                <SelectItem value="Horror">Horror</SelectItem>
                <SelectItem value="Beginner-friendly">
                  Beginner-friendly
                </SelectItem>
              </SelectContent>
            </Select>

            {(filterSystem !== "all" ||
              filterSessionType !== "all" ||
              filterStyle !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setFilterSystem("all");
                  setFilterSessionType("all");
                  setFilterStyle("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="border-b bg-muted/50">
        <div className="container py-6">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="mb-4"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showAdvancedFilters ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide More Options
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                More Options
              </>
            )}
          </Button>

          {showAdvancedFilters && (
            <div className="space-y-6">
              {/* Filter inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    <MapPin className="inline h-3 w-3 mr-1" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, State..."
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day" className="text-sm font-medium">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    Day of Week
                  </Label>
                  <Select
                    value={filterDay}
                    onValueChange={setFilterDay}
                  >
                    <SelectTrigger id="day">
                      <SelectValue placeholder="Any day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Days</SelectItem>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">
                    Time of Day
                  </Label>
                  <Select
                    value={filterTime}
                    onValueChange={setFilterTime}
                  >
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Times</SelectItem>
                      <SelectItem value="morning">Morning (6am-12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm-6pm)</SelectItem>
                      <SelectItem value="evening">Evening (6pm-12am)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minPrice" className="text-sm font-medium">
                    <DollarSign className="inline h-3 w-3 mr-1" />
                    Min Price
                  </Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="0"
                    value={filterMinPrice}
                    onChange={(e) => setFilterMinPrice(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPrice" className="text-sm font-medium">
                    Max Price
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="100"
                    value={filterMaxPrice}
                    onChange={(e) => setFilterMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Game Systems Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Additional Game Systems</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {allGameSystems.map(system => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox
                        id={`system-${system}`}
                        checked={selectedGameSystems.includes(system)}
                        onCheckedChange={() => toggleGameSystem(system)}
                      />
                      <Label
                        htmlFor={`system-${system}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {system}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active filters indicator */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {filteredDMs.length} DM{filteredDMs.length !== 1 ? "s" : ""} match your filters
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* DM Grid */}
      <section className="container py-12">
        <div className="mb-6">
          <h2 className="text-2xl">
            Available Game Masters
          </h2>
          <p className="text-muted-foreground">
            {filteredDMs.length} DM
            {filteredDMs.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDMs.map((dm) => (
            <Card
              key={dm.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={dm.avatar}
                      alt={dm.name}
                    />
                    <AvatarFallback>
                      {dm.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    {hasUpcomingEvents(dm) && (
                      <Badge variant="default" className="flex items-center gap-1 w-fit mb-2">
                        <CalendarCheck className="h-3 w-3" />
                        <span className="text-xs">Hosting Event</span>
                      </Badge>
                    )}
                    <CardTitle className="truncate">
                      {dm.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{dm.rating}</span>
                      <span className="text-xs">
                        ({dm.reviewCount} reviews)
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {dm.bio}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {dm.experience}
                    </span>
                  </div>

                  {dm.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {dm.location}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      ${dm.pricing.campaign}/session
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dm.gameSystems.slice(0, 2).map((system) => (
                    <Badge key={system} variant="secondary">
                      {system}
                    </Badge>
                  ))}
                  {dm.gameSystems.length > 2 && (
                    <Badge variant="secondary">
                      +{dm.gameSystems.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {dm.campaignStyle.slice(0, 2).map((style) => (
                    <Badge key={style} variant="outline">
                      {style}
                    </Badge>
                  ))}
                  {dm.campaignStyle.length > 2 && (
                    <Badge variant="outline">
                      +{dm.campaignStyle.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => onSelectDM(dm.id)}
                >
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDMs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No DMs found matching your criteria. Try adjusting
              your filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}