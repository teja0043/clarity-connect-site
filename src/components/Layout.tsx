import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { EmergencyButton } from "@/components/EmergencyButton";
import { ThemeProvider } from "next-themes";

export default function Layout() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            {/* Top Header */}
            <header className="h-16 border-b border-border bg-card flex items-center px-4 sticky top-0 z-40 backdrop-blur-sm bg-card/80">
              <SidebarTrigger />
              <div className="flex-1 flex items-center justify-between ml-4">
                <h1 className="text-xl font-semibold text-primary">MindEase</h1>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    Your Campus Mental Wellness Hub
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
            
            {/* Emergency Help Button - Always visible */}
            <EmergencyButton />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}