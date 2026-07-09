"use client";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Login</button>
      <LoginModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
