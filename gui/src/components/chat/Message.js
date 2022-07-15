import { Avatar } from "@material-ui/core";
import React from "react";

export default function Message({ timestamp, message, user }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "rgb(40, 40, 40)",
        padding: "20px",
      }}
    >
      <Avatar
        src={user.userPhoto}
        style={{
          borderWidth: "2px",
          borderColor: "#0275d8",
          borderStyle: "outset",
        }}
      />
      <div style={{ marginLeft: "20px" }}>
        {user.userEmail === "nodemailerpopescu@gmail.com" ? (
          <h6>
            Admin
            <span
              style={{ color: "gray", marginLeft: "20px", fontSize: "x-small" }}
            >
              {new Date(timestamp?.toDate()).toLocaleString()}
            </span>
          </h6>
        ) : (
          <h6>
            {user.userEmail}
            <span
              style={{ color: "gray", marginLeft: "20px", fontSize: "x-small" }}
            >
              {new Date(timestamp?.toDate()).toLocaleString()}
            </span>
          </h6>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
}
