import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/app/components/RootLayout';
import { LandingPage } from '@/app/components/LandingPage';
import { BrowseRoute } from '@/app/components/BrowseRoute';
import { DMProfileRoute } from '@/app/components/DMProfileRoute';
import { Dashboard } from '@/app/components/Dashboard';
import { DMDashboard } from '@/app/components/DMDashboard';
import { UserBookingsPage } from '@/app/components/UserBookingsPage';
import { AccountPage } from '@/app/components/AccountPage';
import { AvailabilityPage } from '@/app/components/AvailabilityPage';
import { EventsPage } from '@/app/components/EventsPage';
import { ContactPage } from '@/app/components/ContactPage';
import { PaymentHistoryPage } from '@/app/components/PaymentHistoryPage';
import { CompletedSessionsPage } from '@/app/components/CompletedSessionsPage';
import { AboutPage } from '@/app/components/AboutPage';
import { TermsPage } from '@/app/components/TermsPage';
import { PrivacyPage } from '@/app/components/PrivacyPage';
import { HelpPage } from '@/app/components/HelpPage';
import { NotFoundPage } from '@/app/components/NotFoundPage';
import { AccountSetupPage } from '@/app/components/AccountSetupPage';
import { mockDMs, mockDMUser, mockDMAvailability } from '@/data/mock/mockData';
import { User } from '@/types';
import { Navigate } from 'react-router';
import { toast } from 'sonner';

// Mock user - in production this would come from Firebase auth
let currentUser = mockDMUser;

const getCurrentUser = () => currentUser;

const updateUser = (updates: Partial<User>) => {
  currentUser = { ...currentUser, ...updates };
};

// Account setup completion handler
const handleAccountSetupComplete = (data: { username: string; displayName: string; password: string }) => {
  // In production, this would update Firebase Auth and Firestore
  updateUser({
    username: data.username,
    displayName: data.displayName,
    needsSetup: false,
  });
  console.log('Account setup completed:', data);
  toast.success('Welcome to Game Masters Collective!', {
    description: 'Your account has been successfully set up.',
  });
};

// Protected route wrapper - requires authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  
  if (!user) {
    return <NotFoundPage />;
  }
  
  // Check if user needs to complete account setup
  // Allow access to account-setup page even if setup is needed
  if (user.needsSetup && window.location.pathname !== '/account-setup') {
    return <Navigate to="/account-setup" replace />;
  }
  
  return <>{children}</>;
}

// DM-only route wrapper - requires DM role
function DMRoute({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  
  if (!user || user.type !== 'dm') {
    return <NotFoundPage />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage dms={mockDMs} />,
      },
      {
        path: 'browse',
        element: <BrowseRoute />,
      },
      {
        path: 'dm/:id',
        element: <DMProfileRoute />,
      },
      {
        path: 'events',
        element: <EventsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
      // Protected routes (require authentication)
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard user={getCurrentUser()!} onNavigate={() => {}} />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute>
            <UserBookingsPage 
              bookings={getCurrentUser()!.bookings} 
              userName={getCurrentUser()!.name} 
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'sessions/completed',
        element: (
          <ProtectedRoute>
            <CompletedSessionsPage 
              user={getCurrentUser()!} 
              bookings={getCurrentUser()!.bookings} 
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payments',
        element: (
          <ProtectedRoute>
            <PaymentHistoryPage user={getCurrentUser()!} />
          </ProtectedRoute>
        ),
      },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <AccountPage user={getCurrentUser()!} />
          </ProtectedRoute>
        ),
      },
      // DM-only routes
      {
        path: 'dm-dashboard',
        element: (
          <DMRoute>
            <DMDashboard bookings={getCurrentUser()!.bookings} />
          </DMRoute>
        ),
      },
      {
        path: 'availability',
        element: (
          <DMRoute>
            <AvailabilityPage availability={mockDMAvailability} />
          </DMRoute>
        ),
      },
      // Account setup
      {
        path: 'account-setup',
        element: (
          <ProtectedRoute>
            <AccountSetupPage 
              user={getCurrentUser()!} 
              onComplete={handleAccountSetupComplete} 
            />
          </ProtectedRoute>
        ),
      },
      // 404 catch-all
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);