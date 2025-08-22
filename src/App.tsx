
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import WorkflowRunner from "@/pages/WorkflowRunner";
import Dashboard from "@/pages/Dashboard";
import ExecutionDashboard from "@/pages/ExecutionDashboard";
import Auth from "@/pages/Auth";
import EmailConfirm from "@/pages/EmailConfirm";
import OAuthCallbackPage from "@/pages/OAuthCallback";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { useParams } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Simple redirect component for legacy routes
const WorkflowRedirect = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/workflow/${id}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Main VC analyst workflow route */}
              <Route path="/workflow/:id" element={<WorkflowRunner />} />
              {/* Legacy redirects */}
              <Route path="/search/:id" element={<WorkflowRedirect />} />
              <Route path="/flows/:id" element={<WorkflowRedirect />} />
              {/* Admin routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/executions" element={<ExecutionDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/confirm" element={<EmailConfirm />} />
              <Route path="/oauth/callback/:service" element={<OAuthCallbackPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
