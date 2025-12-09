import { useEffect } from "react";
import useStore from "./store";
import Layout from "./Layout";

export default function App() {
  const { authorizeUser, client, fetchListOfAllPokemon } = useStore();

  useEffect(() => {
    const initializeApp = async () => {
      if (!client) {
        await authorizeUser();
      }
      await fetchListOfAllPokemon();
    };
    initializeApp();
  }, []);

  return <Layout />;
}
