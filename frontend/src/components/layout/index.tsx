import React from "react";
import { AppSidebar } from "./sidebar";
import { SidebarProvider } from "../ui/sidebar";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
