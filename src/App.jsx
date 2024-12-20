import { useMemo } from "react";
import AppRouter from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function App() {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          suspense: false, // Jika tidak menggunakan React Suspense
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
