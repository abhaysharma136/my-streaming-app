import React from "react";
import { Link } from "react-router-dom";

export default function LogoComponent() {
  return (
    <Link to="/">
      {/* <img src="" alt="onstream logo" /> */}
      <h1 className="text-lg font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
        OnStream
      </h1>
    </Link>
  );
}
