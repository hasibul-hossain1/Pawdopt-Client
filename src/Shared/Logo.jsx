import React from "react";

function Logo() {
  return (
    <a href="/" className="flex justify-start text-primary items-center gap-2 font-bold text-3xl">
      <img src="/logo.png" alt="Pawdopt Logo" className="h-8 w-auto" />
      <h1 className="hidden md:inline">Pawdopt</h1>
    </a>
  );
}

export default Logo;
