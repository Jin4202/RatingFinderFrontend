import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav class="navbar navbar-light bg-light">
      <Link to ="/">
        <span class="navbar-brand mb-0 h1">Navbar</span>
      </Link>
    </nav>
  );
}
