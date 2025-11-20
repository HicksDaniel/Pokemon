import PrimeReactComponent from "./PrimeReactComponent";
import { useEffect } from "react";
import useStore from "./store";

export default function App() {
  const { authorizeUser } = useStore();

  useEffect(() => {
    authorizeUser();
    console.log("oh, here I am");
  }, []);
  return <PrimeReactComponent />;
}
