import { useState } from "react";
import { User } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { User as UserIcon, Mail, CreditCard, FileText, Scroll } from "lucide-react";
import { toast } from "sonner";
import { DocumentsSection } from "@/app/components/DocumentsSection";
import { PlayerProfilePreview } from "@/app/components/PlayerProfilePreview";
import { PaymentSettings } from "@/app/components/PaymentSettings";
import { AccountDetailsSection } from "@/app/components/AccountDetailsSection";
import { DMProfileSection } from "@/app/components/DMProfileSection";
import { PlayerProfileSection } from "@/app/components/PlayerProfileSection";

interface AccountPageProps {
  user: User;
}

export function AccountPage({ user }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState<
    | "player-profile"
    | "dm-profile"
    | "account"
    | "payment-settings"
    | "documents"
    | "notifications"
  >("player-profile");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account settings updated!");
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 medieval-heading">
          Account Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile, account details, and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={
                    activeTab === "player-profile"
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveTab("player-profile")}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Player Profile
                </Button>
                {user.type === "dm" && (
                  <Button
                    variant={
                      activeTab === "dm-profile"
                        ? "default"
                        : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setActiveTab("dm-profile")}
                  >
                    <Scroll className="mr-2 h-4 w-4" />
                    GM Profile
                  </Button>
                )}
                <Button
                  variant={
                    activeTab === "account"
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveTab("account")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Account Details
                </Button>
                <Button
                  variant={
                    activeTab === "payment-settings"
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveTab("payment-settings")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Settings
                </Button>
                <Button
                  variant={
                    activeTab === "documents"
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveTab("documents")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
                <Button
                  variant={
                    activeTab === "notifications"
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  Notifications
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Profile Preview */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">
                Profile Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold">{user.name}</h3>
                <Badge
                  variant={
                    user.type === "dm" ? "default" : "secondary"
                  }
                  className="mt-1"
                >
                  {user.type === "dm"
                    ? "Game Master"
                    : "Player"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "player-profile" && (
            <PlayerProfileSection user={user} onSave={handleSaveProfile} />
          )}

          {activeTab === "dm-profile" && user.type === "dm" && (
            <DMProfileSection user={user} onSave={handleSaveProfile} />
          )}

          {activeTab === "account" && (
            <AccountDetailsSection
              user={user}
              onSave={handleSaveAccount}
            />
          )}
          {activeTab === "payment-settings" && (
            <PaymentSettings user={user} />
          )}
          {activeTab === "documents" && (
            <DocumentsSection user={user} />
          )}
          {activeTab === "notifications" && (
            <NotificationsSection />
          )}
        </div>
      </div>
    </div>
  );
}

// Notifications Section Component
function NotificationsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Manage how you receive updates via email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Booking Confirmations</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when a booking is confirmed
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Booking Requests</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for new booking requests
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Messages</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for new messages from DMs or
                players
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded 24 hours before upcoming sessions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Review Requests</Label>
              <p className="text-sm text-muted-foreground">
                Get prompted to leave reviews after sessions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marketing & Updates</CardTitle>
          <CardDescription>
            Stay informed about Game Masters Collective news
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Product Updates</Label>
              <p className="text-sm text-muted-foreground">
                News about new features and improvements
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tips & Guides</Label>
              <p className="text-sm text-muted-foreground">
                Helpful content for DMs and players
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Promotional content and special offers
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}