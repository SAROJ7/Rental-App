import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib";
import { LayoutProps } from "@/types";
import React from "react";

const Layout = ({ children }: LayoutProps) => {
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
