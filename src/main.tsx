import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

// CSS order matters: Tailwind first (includes reset), then PrimeReact overrides it
import "./style.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
