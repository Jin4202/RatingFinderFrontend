import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Home(props) {
    const {user} = useContext(AuthContext);
    console.log('user', user)
  return <h1>Hello {user ? user : "Guest"}</h1>;
}
