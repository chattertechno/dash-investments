"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { HiChevronRight } from "react-icons/hi2";

const Sidebar = () => {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Data Management",
      href: "/",
      icon: <HiChevronRight />,
      active: pathname === "/",
    },
    {
      name: "Budget Proposal",
      href: "/proposal",
      icon: <HiChevronRight />,
      active: pathname === "/proposal",
    },
    {
      name: "Add Address",
      href: "/add-address",
      icon: <HiChevronRight />,
      active: pathname === "/add-address",
    },
    {
      name: "Watch List",
      href: "/watchlist",
      icon: <HiChevronRight />,
      active: pathname === "/watchlist",
    },
  ];

  return (
    <aside className="hidden md:block w-[20%] h-[93vh] border-r border-r-blue-400">
      <p className="p-4 pl-8 border-b border-b-gray-300"></p>
      {/* navigation */}
      <div className="p-4 space-y-1">
        {navigation.map(nav => (
          <LinkItem key={nav.href} {...nav} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

const LinkItem = ({
  href,
  name,
  icon,
  active,
}: {
  href: string;
  name: string;
  icon: React.ReactNode;
  active: boolean;
}) => (
    <Link
      className={`flex items-center justify-between p-3  hover:bg-gray-100 ${
        active && "bg-gray-100"
      }`}
      href={href}
    >
      <p className="flex items-center">
        {icon}
        <span className="ml-2">{name}</span>
      </p>
    </Link>
);
