import { useState } from "react";
import { Button } from "primereact/button";
import type { MenuItem } from "primereact/menuitem";
import "primeicons/primeicons.css";
import useStore from "../../store";
import { Menu } from "primereact/menu";
import "./minidrawer.css";
import { Badge } from "primereact/badge";

const MenuItemsAndIcons: MenuItem[] = [
  { label: "About", icon: "pi pi-info-circle", url: "/about" },
  { label: "Home", icon: "pi pi-home", url: "/home" },
  { label: "Regions", icon: "pi pi-map", url: "/regions" },
  { label: "Favorites", icon: "pi pi-heart", url: "/favorites" },
  { label: "Teams", icon: "pi pi-users", url: "/teams" },
  { label: "Themes", icon: "pi pi-palette", url: "/reactcomponents" },
];

export default function MiniDrawer() {
  const { selectedRegion } = useStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const drawerWidth = isCollapsed ? "70px" : "240px";

  return (
    <nav
      className="
        flex absolute flex-col h-full bg-blue-300 left-0 p-2
        overflow-hidden
        transition-[width] duration-[1100ms] ease-in-out
      "
      style={{ width: drawerWidth }}
    >
      {/* The toggle bars button */}
      <Button
        className="absolute min-w-[50px] z-10"
        icon="pi pi-bars"
        onClick={() => setIsCollapsed((prev) => !prev)}
      />

      {/* The second button (sun icon) that slides in/out */}
      <Button
        className={`
          absolute inset-0 min-w-[50px] z-0 translate-y-[-100%]
          transition-all duration-1100 ease-in-out
          ${isCollapsed ? "opacity-50  pointer-events-none" : "opacity-100 translate-x-[350%]  pointer-events-auto"}
        `}
        icon="pi pi-sun"
        onClick={() => setIsCollapsed((prev) => !prev)}
      />

      <div className="flex justify-center items-center h-[50px]">{selectedRegion}</div>

      <Menu
        pt={{
          root: {
            style: {
              width: `100%`,
              transition: "width 1s ease",
            },
          },
          label: {
            style: {
              opacity: isCollapsed ? 0 : 1,
            },
          },
        }}
        model={MenuItemsAndIcons}
      />
    </nav>
  );
}
