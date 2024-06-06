"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";
import { useSession  } from 'next-auth/react';
import { Box } from "@radix-ui/themes";
import { auth } from "@/auth";

const NavBar = () => {
  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues/list" },
  ];
  const currentPath = usePathname();
  const { status, data } = useSession(); 

  return (
    <nav className="flex items-center px-5 mb-5 h-14  border-b justify-between">
        <Link href="/">
          <IoBug size={23} />
        </Link>
        <ul className="flex gap-4 text-md">
          {links.map((link) => (
            <li key={link.herf}>
              <Link
                href={link.herf}
                className={classNames({
                  'text-zink-900': currentPath === link.herf,
                  'text-zinc-500' : currentPath !== link.herf,
                  'hover:text-zinc-800 transition-colors': true
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      <Box>
        {status === "authenticated" && 
          <div className="flex gap-4">
            <p>{data.user?.name}</p>
            <Link href="/api/auth/signout">Log out</Link>
          </div>
          }
        {status === "unauthenticated" && <Link href="/api/auth/signin">Sign in</Link>}
      </Box>
    </nav>
  );
};

export default NavBar;
