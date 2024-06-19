"use client";
import Link from "next/link";
import React from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  to?: string;
  external?: boolean;
}

/**
 * This component easily manages internal and external links and adds the necessary attributes.
 *
 * @param {string} href - The URL of the link.
 * @param {React.ReactNode} children - The content of the link.
 * @param {boolean} external - If the link is external, in this case it will open in a new tab and also add rel="noreferrer noopener nofollow".
 */
function AppLink({ href, children, external, className, ...props }: LinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className={`${className} cursor-pointer`}
      rel={external ? "noreferrer noopener nofollow" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}

export { AppLink };
