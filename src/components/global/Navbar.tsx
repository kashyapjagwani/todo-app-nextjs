import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <div className="bg-dark p-12 flex items-center justify-center gap-2">
        <Image src="/logo.svg" alt="Todo App Logo" width={40} height={40} />
        <h1 className="text-4xl font-bold" aria-label="Todo App">
          <span className="text-primary">Todo</span>{" "}
          <span className="text-secondary">App</span>
        </h1>
      </div>
    </nav>
  );
}
