import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { db } from "../../firebase";
import { useAuthentication } from "../../context/AuthenticationContext";
import Message from "./Message";
import firebase from "firebase/compat/app";
import Picker from "emoji-picker-react";

export default function Chat() {
  const { currentUser } = useAuthentication();
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        user: {
          userId: currentUser.uid,
          userEmail: currentUser.email,
          userPhoto: currentUser.photoURL,
        },
        messsage: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setInput("");
  };

  return (
    <>
      {channelName ? (
        <div className="chat">
          <ChatHeader channelName={channelName} />

          <div className="chat_messages">
            {messages.map((message) => (
              <Message
                timestamp={message.timestamp}
                message={message.messsage}
                user={message.user}
              />
            ))}
          </div>
          <div className="chat_input">
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Scrie pe canalul ${channelName} aici...`}
              />
              <button
                onClick={sendMessage}
                disabled={!channelId}
                className="chat_inputButton"
                type="submit"
              >
                send
              </button>
            </form>
            <div className="chat_inputIcons">
              <img
                className="emoji-icon"
                src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                onClick={() => setShowPicker((val) => !val)}
              />
              {showPicker && (
                <Picker
                  pickerStyle={{
                    width: "33%",
                    position: "absolute",
                    bottom: "120px",
                    right: "20px",
                  }}
                  onEmojiClick={onEmojiClick}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="chat">
          <img
            className="d-block w-100 h-100"
            src="undraw_online_chat_re_c4lx.svg"
            alt="Forth slide"
          />
        </div>
      )}
    </>
  );
}
