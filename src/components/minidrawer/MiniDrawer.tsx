import { useState } from "react";
import { Button } from "primereact/button";
import type { MenuItem } from "primereact/menuitem";
import "primeicons/primeicons.css";
import { useDataStore, useThemeStore, useAuthStore } from "../../store";
import { Menu } from "primereact/menu";
import "./minidrawer.css";
import { Badge } from "primereact/badge";
import { useNavigate } from "react-router-dom";
import { clearCache, fetchCacheAll } from "../../utils/request-helpers";

export default function MiniDrawer() {
    const selectedRegion = useDataStore((state) => state.selectedRegion);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const navigate = useNavigate();
    const client = useAuthStore((state) => state.client);

    const [isCollapsed, setIsCollapsed] = useState(false);

    const MenuItemsAndIcons: MenuItem[] = [
        { label: "About", icon: "pi pi-info-circle", command: () => navigate("/about") },
        { label: "Home", icon: "pi pi-home", command: () => navigate("/home") },
        { label: "Regions", icon: "pi pi-map", command: () => navigate("/regions") },
        { label: "Favorites", icon: "pi pi-heart", command: () => navigate("/favorites") },
        { label: "Teams", icon: "pi pi-users", command: () => navigate("/teams") },
        { label: "Themes", icon: "pi pi-palette", command: () => navigate("/reactcomponents") },
    ];

    return (
        <nav className={`mini-drawer-nav ${isCollapsed ? "collapsed" : "expanded"}`}>
            <div className="button-container">
                <Button
                    className="drawer-toggle-button"
                    icon="pi pi-bars"
                    onClick={() => setIsCollapsed((prev) => !prev)}
                />

                <Button
                    className="drawer-theme-button"
                    icon="pi pi-sun"
                    onClick={() => toggleTheme()}
                />
            </div>

            <Badge value={selectedRegion} className="selectedRegion" />

            <Menu model={MenuItemsAndIcons} />

            <Button label="GetCache" onClick={() => fetchCacheAll(client)} />
            <Button label="ClearCache" onClick={() => clearCache(client)} />
           </nav>
    );
}