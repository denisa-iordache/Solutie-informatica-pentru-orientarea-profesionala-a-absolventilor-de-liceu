import React, { useEffect, useState } from "react";
import { FcCollaboration } from "react-icons/fc";
import Sidebar from "./Sidebar";

export default function ChatHeader({ channelName }) {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });
  return (
    <>
      {matches ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: "2px solid rgba(0, 0, 0, 0.15)",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "5px",
          }}
        >
          <h3
            className="d-flex flex-row"
            style={{
              color: "rgb(93, 93, 93)",
              fontSize: "30px",
              padding: "10px",
              alignItems: "center",
            }}
          >
            <FcCollaboration /> {channelName}
          </h3>
        </div>
      ) : (
        <>
          <Sidebar />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderBottom: "2px solid rgba(0, 0, 0, 0.15)",
              borderTop: "2px solid rgba(0, 0, 0, 0.15)",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              borderRadius: "10px",
              height: "80px",
            }}
          >
            <h3
              className="d-flex flex-row"
              style={{
                color: "rgb(93, 93, 93)",
                fontSize: "22px",
                padding: "10px",
                alignItems: "center",
              }}
            >
              <FcCollaboration /> {channelName}
            </h3>
          </div>
        </>
      )}
    </>
  );
}
