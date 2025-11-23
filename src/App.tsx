import PrimeReactComponent from "./PrimeReactComponent";
import { useEffect } from "react";
import useStore from "./store";
import Layout from "./Layout";

export default function App() {
  const { authorizeUser, initializeTheme } = useStore();

  useEffect(() => {
    authorizeUser();
    initializeTheme();
  }, []);

  return <Layout />;
}
