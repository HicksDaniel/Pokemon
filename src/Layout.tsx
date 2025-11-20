import React from "react";

import type { LayoutProps } from "./types";

export default function Layout({
  children,
}: LayoutProps = {}): React.ReactElement {
  // Initialize data when the app loads

  const drawerWidth = "240px";
  const content = children || <Outlet />;

  return (
    <div style={{ display: "flex", flexFlow: "row nowrap" }}>
      <MiniDrawer drawerWidth={drawerWidth} />
      <div style={{ width: `calc(90% - ${drawerWidth})` }}>{content}</div>
    </div>
  );
}
