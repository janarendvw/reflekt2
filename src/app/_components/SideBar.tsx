import Link from "next/link";
import React from "react";

type Props = {};

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Reflections",
    href: "/reflections",
  },
  {
    name: "Action points",
    href: "/action-points",
  },
];

async function SideBar({}: Props) {
  return (
    <div className="flex flex-col items-center p-2 gap-2">
      {links.map((link) => (
        <Link
          className="flex py-1 px-4 justify-start w-full hover:bg-accent rounded"
          key={link.href}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
