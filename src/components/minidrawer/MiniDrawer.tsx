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
  const { selectedRegion, toggleTheme } = useStore();

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <nav
      onMouseLeave={() => setIsCollapsed(true)}
      className={`mini-drawer-nav ${isCollapsed ? "collapsed" : "expanded"}`}
    >
      <div></div>
      <Button
        className="drawer-toggle-button mb-[50px]"
        icon="pi pi-bars"
        onClick={() => setIsCollapsed((prev) => !prev)}
      />

      <Button
        className={`drawer-theme-button ${isCollapsed ? "collapsed" : "expanded"}`}
        icon="pi pi-sun"
        onClick={() => toggleTheme()}
      />

      <div className={`selectedRegion ${isCollapsed ? "collapsed" : "expanded"}`}>
        {selectedRegion}
      </div>

      <Menu
        className={`${isCollapsed ? "collapsed" : "expanded"}`}
        pt={{
          label: {
            className: isCollapsed ? "collapsed" : "expanded",
          },
        }}
        model={MenuItemsAndIcons}
      />
    </nav>
  );
}
