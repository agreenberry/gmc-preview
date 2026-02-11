import { Outlet, useLocation } from 'react-router';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { mockDMUser } from '@/data/mock/mockData';

export function RootLayout() {
  const location = useLocation();
  const isFullWidthPage = location.pathname === '/' || location.pathname === '/browse' || location.pathname === '/account-setup';
  // Using DM user by default - in production this would come from Firebase auth
  const currentUser = mockDMUser;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        currentView="home"
        onNavigate={() => {}}
        userType={currentUser.type}
        userName={currentUser.name}
        userAvatar={currentUser.avatar}
      />

      <main className={isFullWidthPage ? 'flex-1' : 'flex-1 px-4 sm:px-6 lg:px-8'}>
        <Outlet />
      </main>

      <Footer onNavigate={() => {}} />
    </div>
  );
}
