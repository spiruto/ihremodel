import Image from "next/image";
import LogoImage from "@/assets/images/logo.webp";
// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <Image
          src={LogoImage}
          alt="Imperial Home Remodeling"
          className="h-22 w-30 mx-auto mb-2"
        />
        <p className="text-lg font-semibold text-[#ffd900cb]">
          Imperial Home Remodeling
        </p>
        <p>420 Godwin Ave, Midland Park, NJ 07432, USA</p>
        <p>
          Phones:{" "}
          <a className="hover:text-amber-400" href="tel:+12015460083">
            (201) 546-0083
          </a>
          {" | "}
          <a className="hover:text-amber-400" href="tel:+12144679319">
            (214) 467-9319
          </a>
        </p>
        <p className="text-green-700">Insured & Licensed</p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
