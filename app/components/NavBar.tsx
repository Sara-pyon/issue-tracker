"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import Skeleton from "./Skelton";

const NavBar = () => {
  return (
    <nav className="px-5 mb-5 border-b">
      <Container>
        <Flex justify="between" height="60px" align="center">
          <Flex gap="4">
            <Link href="/">
              <IoBug size={23} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues/list?order=desc&orderBy=createdAt" },
  ];
  const currentPath = usePathname();

  return(
    <ul className="flex gap-4 text-md">
      {links.map((link) => (
        <li key={link.herf}>
          <Link
            href={link.herf}
            className={classNames({
              "nav-link": true,
              "nav-link-active": currentPath === link.herf,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data } = useSession();

  if(status === "loading") return <Skeleton width="2rem" height="2rem" />

  return(
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar src={data.user?.image!} fallback='?' radius="full" className="cursor-pointer"/>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{data.user?.email}</DropdownMenu.Label>
            <Link href='/api/auth/signout' className="nav-link">
              <DropdownMenu.Item>
                Log out
              </DropdownMenu.Item>
            </Link>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin" className="nav-link">Log in</Link>
      )}
    </Box>
  )
}

export default NavBar;
