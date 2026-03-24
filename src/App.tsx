import { useEffect } from "react";
import { useAuthStore, useDataStore } from "./store";
import Layout from "./Layout";

export default function App() {

  const {authorizeUser, client } = useAuthStore();
  const { fetchListOfAllPokemon } = useDataStore();

  useEffect(() => {
    const initializeApp = async () => {
      if (!client) {
        await authorizeUser();
      }
      await fetchListOfAllPokemon();
    };
    initializeApp();
  }, []);

  return <Layout/>;
};
