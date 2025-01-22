import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./globals.css";
import { AppSidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
