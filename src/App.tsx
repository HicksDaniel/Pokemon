import { useEffect } from "react";
import useStore from "./store";
import Layout from "./Layout";

export default function App() {
  const { authorizeUser, client } = useStore();

  useEffect(() => {
    if (!client) {
      authorizeUser();
    }
  }, [client]);

  return <Layout />;
}
