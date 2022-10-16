import React from "react";
import { AiOutlineLaptop } from "react-icons/ai";

export default function Footer() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center rounded-top"
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        height: "100px",
      }}
    >
      <div
        className="d-flex "
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <AiOutlineLaptop className="mr-1" /> SOLUȚIE INFORMATICĂ PENTRU
        ORIENTAREA PROFESIONALĂ A ABSOLVENȚILOR DE LICEU
      </div>
      <div>© 2022, Iordache Denisa-Maria</div>
    </div>
  );
}
