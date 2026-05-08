import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 * 2 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div
          style={{
            width: '100%',
            maxWidth: 440,
            margin: '0 auto',
            background: 'var(--color-ink)',
            minHeight: '100vh',
            position: 'relative',
            boxShadow: '0 0 80px rgba(0,0,0,0.6)',
          }}
        >
          <RouterProvider router={router} />
        </div>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: 'var(--color-ink-2)',
              border: '1px solid var(--color-line)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
