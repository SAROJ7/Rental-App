"use client";

import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib";
import { useGetAuth } from "@/queries/auth.query";
import { LayoutProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: LayoutProps) => {
  const { data: authUser, isLoading: authLoading } = useGetAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser?.data) {
      const userRole = authUser.data.userRole.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/search")) ||
        (userRole === "manager" && pathname === "/landing")
      ) {
        router.push("/managers/properties", { scroll: false });
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser?.data, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;
  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={`h-full flex w-flux flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
