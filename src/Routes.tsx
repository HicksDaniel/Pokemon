import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegionPage from "./pages/regionpage/RegionPage.tsx";

import FavoritesPage from "./pages/FavoritesPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import PrimeReactComponent from "./PrimeReactComponent.tsx";
import useStore from "./store.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    HydrateFallback: () => <div>Loading...</div>,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/regions",
        element: <RegionPage />,
        loader: () => useStore.getState().fetchRegionRes(),
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/teams",
        element: <TeamsPage />,
      },
      {
        path: "/reactcomponents",
        element: <PrimeReactComponent />,
      },
    ],
  },
]);
