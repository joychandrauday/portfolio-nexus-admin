"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { FiSidebar } from "react-icons/fi";
import { TbLayoutBottombar, TbLayoutSidebarRight } from "react-icons/tb";
import { MdOutlineViewSidebar } from "react-icons/md";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShinyButton } from "../magicui/shiny-button";
import { signOut, useSession } from "next-auth/react";
export interface Session {
  data: {

    user: {
      name: string;
      email: string;
      image: string;
    };
  }
}
// interface NavbarProps {
//   session: Session | null;
// }
const Navbar: React.FC = () => {
  const session = useSession() as unknown as Session;
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const tabList = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skill", path: "/skill" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "SignIn", path: "/signin" },
  ];

  const currentIndex = tabList.findIndex((tab) => tab.path === pathname);
  const prevIndex = (currentIndex - 1 + tabList.length) % tabList.length;
  const nextIndex = (currentIndex + 1) % tabList.length;

  return (
    <div
      className={`fixed w-full md:justify-around z-50 flex justify-between border-b px-8 py-3 border-gray-500 transition-all duration-300 ${scrolling ? "backdrop-blur-md bg-opacity-75 " : "bg-transparent"
        }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-4 w-1/3">
        <Link href="/">
          <Image src="https://i.ibb.co/K0NmH2J/favicon.png" width={30} height={30} alt="Logo" priority />
        </Link>

        {/* Navigation Arrows */}
        <div className="hidden lg:flex gap-3 text-2xl">
          <Link href={tabList[prevIndex].path}>
            <FaLongArrowAltLeft />
          </Link>
          <Link href={tabList[nextIndex].path}>
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="flex items-center justify-center px-4 w-1/3">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold border px-4 border-gray-600 rounded-md backdrop-blur-3xl bg-gray-800 bg-opacity-40 text-white mx-auto">
          <IoMdSearch />
          Joy Chandra Uday
          <span className="animate-pulse font-bold text-xl text-yellow-400">_</span>
        </Link>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center justify-end gap-4 w-1/3">
        {/* Theme Toggle */}
        <ShinyButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-lg">
          {theme === "dark" ? "☀️" : "🌙"}
        </ShinyButton>

        {/* Sidebar Buttons */}
        <div className="hidden lg:flex gap-2 text-2xl">
          <FiSidebar />
          <TbLayoutBottombar />
          <TbLayoutSidebarRight />
          <MdOutlineViewSidebar />
        </div>

        {/* User Dropdown */}
        {session?.data ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="btn btn-ghost btn-circle avatar">
              <Image src={session.data.user.image || "https://i.ibb.co/K0NmH2J/favicon.png"} width={40} height={40} alt="User Avatar" className="rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuItem className="font-bold">
                Welcome,<br /> <h1 className="">{session.data.user?.name ?? 'Unknown'}</h1>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold">
                <a href='/dashboard'> Dashboard </a>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login" className="btn btn-outline">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};



export default Navbar;
