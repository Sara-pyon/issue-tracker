"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues/list" },
  ];
  const currentPath = usePathname();
  const { status, data } = useSession();

  return (
    <nav className="px-5 mb-5 border-b">
      <Container>
        <Flex justify="between" py="3" align="center">
          <Flex gap="4">
            <Link href="/">
              <IoBug size={23} />
            </Link>
            <ul className="flex gap-4 text-md">
              {links.map((link) => (
                <li key={link.herf}>
                  <Link
                    href={link.herf}
                    className={classNames({
                      "text-zink-900": currentPath === link.herf,
                      "text-zinc-500": currentPath !== link.herf,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar src={data.user?.image!} fallback='?' radius="full" className="cursor-pointer"/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{data.user?.email}</DropdownMenu.Label>
                  <Link href='/api/auth/signout'>
                    <DropdownMenu.Item>
                      Log out
                    </DropdownMenu.Item>
                  </Link>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
