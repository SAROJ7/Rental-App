"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from "@/lib";
import { LayoutProps } from "@/types";
import React, { useEffect, useState } from "react";
import { useGetAuth } from "@/queries/auth.query";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({ children }: LayoutProps) => {
  const { data: authUser, isLoading: authLoading } = useGetAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser?.data) {
      const userRole = authUser.data.userRole.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser?.data, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;

  if (!authUser?.data?.userRole) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100">
        <Navbar />
        <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <Sidebar
              userType={
                authUser?.data?.userRole?.toLowerCase() as "manager" | "tenant"
              }
            />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
