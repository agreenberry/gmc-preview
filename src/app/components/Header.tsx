import { Button } from "@/app/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  User,
  Calendar,
  LogOut,
  Clock,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Link, useLocation } from "react-router";
import logoImg from "@/assets/Logo-gold-helmet.png";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userType: "player" | "dm";
  userName: string;
  userAvatar: string;
}

export function Header({
  currentView,
  onNavigate,
  userType,
  userName,
  userAvatar,
}: HeaderProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={logoImg}
              alt="GMC Logo"
              className="h-14 w-14 [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
              style={{
                maskImage: "radial-gradient(circle at center, black 70%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 70%, transparent 70%)",
              }}
            />
            <span className="text-xl/5 pt-1 font-bold medieval-heading text-center">
              Game Masters 
              <br />
              Collective
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Button
              variant={
                pathname === "/dashboard"
                  ? "default"
                  : "ghost"
              }
              asChild
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button
              variant={
                pathname === "/browse" ? "default" : "ghost"
              }
              asChild
            >
              <Link to="/browse">Find GMs</Link>
            </Button>
            <Button
              variant={
                pathname === "/events" ? "default" : "ghost"
              }
              asChild
            >
              <Link to="/events">
                <Sparkles className="mr-2 h-4 w-4" />
                Events
              </Link>
            </Button>
            {userType === "dm" && (
              <>
                <Button
                  variant={
                    pathname === "/dm-dashboard"
                      ? "default"
                      : "ghost"
                  }
                  asChild
                >
                  <Link to="/dm-dashboard">GM Dashboard</Link>
                </Button>
                <Button
                  variant={
                    pathname === "/availability"
                      ? "default"
                      : "ghost"
                  }
                  asChild
                >
                  <Link to="/availability">Availability</Link>
                </Button>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userType === "dm" ? "Game Master" : "Player"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userType === "dm" && (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/dm-dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      DM Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/availability">
                      <Clock className="mr-2 h-4 w-4" />
                      Availability
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link to="/bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account">
                  <User className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}