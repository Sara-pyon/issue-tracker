"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";

const NavBar = () => {
  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];

  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <nav className="flex items-center gap-7 px-5 mb-5 h-14  border-b ">
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
    </nav>
  );
};

export default NavBar;
