import React, { useEffect, useState } from "react";
import SidebarChannel from "./SidebarChannel";
import { db } from "../../firebase";
import { useAuthentication } from "../../context/AuthenticationContext";
import { BiAddToQueue } from "react-icons/bi";

export default function Sidebar() {
  const { currentUser } = useAuthentication();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            channel: doc.data(),
          }))
        )
      );
  }, []);

  const handleChannel = () => {
    const channelName = prompt("Introdu numele canalului");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "90vh",
        background: "white",
        overflowY: "scroll",
        flex: "0.3",
        paddingRight: "5px",
        paddingBottom: "15px",
      }}
    >
      <div>
        <div>
          {currentUser.uid === "7pDZzLHJy9fRj8UNO3JXutQ28qj2" && (
            <div className="d-flex mt-4">
              <div><BiAddToQueue style={{ fontSize: "20px", marginLeft:"40px", cursor:"pointer"}}  onClick={handleChannel} /></div> <p style={{marginLeft:"18px", fontStyle:"italic"}}>Adaugă o cameră de chat</p>
            </div>
          )}
        </div>
        <div>
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
