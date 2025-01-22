import Link from "next/link";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: ReactNode;
  link?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  title,
  icon,
  link,
  handleClick,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = `w-full block flex-shrink-0 font-bold bg-primary px-4 py-2 hover:opacity-80
    ${title ? "rounded-md" : "rounded-full"} ${
    disabled ? "pointer-events-none opacity-50" : "opacity-100"
  }
  `;

  const children = (
    <div className="flex items-center justify-center gap-2">
      {title}
      {icon}
    </div>
  );

  return link ? (
    <Link href={link} className={buttonClass}>
      {children}
    </Link>
  ) : (
    <button onClick={handleClick} className={buttonClass} {...props}>
      {children}
    </button>
  );
}
