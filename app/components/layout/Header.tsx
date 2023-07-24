"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <MobileHeader />

      <div className="hidden md:flex text-white bg-blue-500 p-4 px-6 justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="assets/dash-logo.svg"
            alt="dash logo"
            width={30}
            height={30}
          />
          <h1 className="text-2xl font-semibold">Read Investment Data</h1>
        </div>
        {/* button  */}
        <div>
          <button
            className="border border-white rounded-md px-4 py-2"
            onClick={() => router.refresh()}
          >
            Refresh
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;

const MobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Data Management",
      path: "/",
      active: pathname === "/",
    },
    {
      name: "Add Address",
      path: "/add-address",
      active: pathname === "/add-address",
    },
    {
      name: "Proposal",
      path: "/proposal",
      active: pathname === "/proposal",
    },
    {
      name: "Watchlist",
      path: "/watchlist",
      active: pathname === "/watchlist",
    },
  ];

  return (
    <div className="md:hidden text-white bg-blue-500 p-4 px-6 flex items-center justify-between">
      {/* button  */}
      <>
        <button onClick={() => setShowMenu(true)}>
          <Image
            src="assets/hamburger-menu.svg"
            alt="dash logo"
            width={30}
            height={30}
          />
        </button>
      </>
      {/* title  */}
      <h1 className="text-xl font-semibold">Read Investment Data</h1>
      {/* logo */}
      <>
        <Image
          src="assets/dash-logo.svg"
          alt="dash logo"
          width={30}
          height={30}
        />
      </>
      {/* menu  */}
      {showMenu && (
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500 p-4 px-6">
          {/* close btn  */}
          <button className="mb-4" onClick={() => setShowMenu(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* menu items  */}
          <ul className="flex flex-col gap-4">
            {navigation.map(nav => (
              <li
                className={`${
                  nav.active ? "text-white" : "text-blue-200"
                } text-xl`}
                onClick={() => setShowMenu(false)}
                key={nav.path}
              >
                <Link href={nav.path}>{nav.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
