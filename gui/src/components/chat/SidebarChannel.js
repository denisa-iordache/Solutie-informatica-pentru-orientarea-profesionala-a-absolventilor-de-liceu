import React from "react";
import "./SidebarChannel.css";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";
import { FcCollaboration } from "react-icons/fc";

export default function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        )
      }
    >
      <h4>
        <span style={{ fontSize: "30px", padding: "16px" }}>
          <FcCollaboration />
        </span>
        {channelName}
      </h4>
    </div>
  );
}
