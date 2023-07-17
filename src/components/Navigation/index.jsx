import React from "react";
import { NavLink } from "react-router-dom";
import "styles/components/navigation.scss";

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/content">Content</NavLink>
    </nav>
  );
}
