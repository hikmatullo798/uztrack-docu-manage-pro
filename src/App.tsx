import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import DocumentAdd from "./pages/DocumentAdd";
import Trucks from "./pages/Trucks";
import TruckAdd from "./pages/TruckAdd";
import RoutePlanner from "./pages/RoutePlanner";
import CriticalAlerts from "./pages/CriticalAlerts";
import Statistics from "./pages/Statistics";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize theme on app start
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.add(savedTheme);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="documents" element={<Documents />} />
            <Route path="documents/add" element={<DocumentAdd />} />
            <Route path="alerts" element={<CriticalAlerts />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="trucks" element={<Trucks />} />
            <Route path="trucks/add" element={<TruckAdd />} />
            <Route path="route-planner" element={<RoutePlanner />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
