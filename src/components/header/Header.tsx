import Image from "next/image";
import LogoImage from "@/assets/images/logo.webp";
import Link from "next/link";
// app/components/Header.tsx
export default function Header() {
  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex md:justify-between items-center  sm:content-center sm:flex-col align-middle gap-4">
        <Link href="/">
          <Image
            src={LogoImage}
            alt="Imperial Home Remodeling Logo"
            className="h-16 w-22  cursor-pointer"
          />
        </Link>
        {/* <span className="sm:text-xl font-bold text-amber-600">
          Imperial Home Remodeling
        </span> */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a
            href="#home"
            className="text-white hover:text-[#FFD700] transition"
          >
            Home
          </a>
          <a
            href="#services"
            className="text-white hover:text-[#FFD700] transition"
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-white hover:text-[#FFD700] transition"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white hover:text-[#FFD700] transition"
          >
            Contact
          </a>
          <a
            href="https://www.instagram.com/imperialhomeremodeling25/"
            target="_blank"
            className="text-white hover:text-[#FFD700]"
          >
            <span className="material-icons align-middle">photo_camera</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
