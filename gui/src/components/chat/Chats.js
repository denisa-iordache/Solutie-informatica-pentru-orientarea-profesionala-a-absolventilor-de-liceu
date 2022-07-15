import React, {useState, useEffect} from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useAuthentication } from "../../context/AuthenticationContext";
import Header from "../Header";
import LoginPage from "../LoginPage";

export default function Chats() {
  const { currentUser } = useAuthentication();
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  return (
    <>
      {currentUser ? (
        <>
          <Header />
          {matches ? (
            <div className="d-flex">
              <Sidebar />
              <Chat/>
            </div>
          ) : (
            <div>
              <Chat/>
            </div>
          )}
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
