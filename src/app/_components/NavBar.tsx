"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NavbarBreadcrumb from "./NavBarBreadcrumb";
import Image from "next/image";
import Logo from "./Logo";

function AuthButton() {
  const session = useSession();

  if (session) {
    return (
      <Button size={"sm"} onClick={() => signOut()}>
        Sign out
      </Button>
    );
  } else {
    return (
      <Button size={"sm"} onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }
}

type Props = {};

function NavBar({}: Props) {
  const session = useSession();
  return (
    <div className="py-2 px-4 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>
            {session?.data?.user?.name?.[0] ?? ""}
          </AvatarFallback>
        </Avatar>
        <AuthButton />
      </div>
    </div>
  );
}

export default NavBar;
