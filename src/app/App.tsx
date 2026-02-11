import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/app/components/ui/sonner';
import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
