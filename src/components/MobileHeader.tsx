"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Drawer from "./Drawer";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="app-topbar">
        <div className="logo" style={{ margin: 0, padding: 0 }}>
          <div className="logo-mark">S</div>
          <div className="logo-text">SwastikFit</div>
        </div>
        <button className="hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </header>
      {/* Drawer closes itself on link tap, overlay click, and Escape. */}
      <Drawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
