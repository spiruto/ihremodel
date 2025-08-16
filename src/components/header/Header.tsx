'use client'
import Image from "next/image";
import LogoImage from "@/assets/images/logo.webp";
import Link from "next/link";
import { fireEvent } from "@/config/mixpanel.config";
// app/components/Header.tsx
export default function Header() {
  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-col justify-between items-center  content-center  align-middle gap-4">
        <Link href="/">
          <Image
            src={LogoImage}
            alt="Imperial Home Remodeling Logo"
            className=" md:flex h-16 w-22  cursor-pointer"
          />
        </Link>
        {/* <span className="sm:text-xl font-bold text-amber-600">
          Imperial Home Remodeling
        </span> */}
        <nav className="flex space-x-2 md:space-x-6 items-center gap-2">
          <a
            href="#home"
            className="hidden md:flex text-white hover:text-[#FFD700] transition"
          >
            Home
          </a>
          <a
            href="#services"
            className="text-white hover:text-[#FFD700] transition"
            onClick={()=>{fireEvent("Clicked Services Button")}}
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-white hover:text-[#FFD700] transition"
            onClick={() => { fireEvent("Clicked Projects Button") }}

          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white hover:text-[#FFD700] transition"
            onClick={() => { fireEvent("Clicked Contact Button") }}

          >
            Contact
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61577134175534"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#FFD700]"
            onClick={() => { fireEvent("Clicked Facebook Button") }}

          >
            <span className="material-icons align-middle text-xl">
              facebook
            </span>
          </a>
          <a
            href="https://www.instagram.com/imperialhomeremodeling25/"
            target="_blank"
            className="text-white hover:text-[#FFD700]"
            onClick={() => { fireEvent("Clicked Instagram Button") }}

          >
            <span className="material-icons align-middle text-xl">
              photo_camera
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
