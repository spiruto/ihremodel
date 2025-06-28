import Image from "next/image";
import LogoImage from "@/assets/images/logo.webp";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Our Services */}
        <div className="col-span-1 text-center sm:order-2 md:order-1 ">
          <h4 className="text-white font-semibold mb-2">Our Services</h4>
          <ul className="space-y-1">
            <li>› Home Remodeling</li>
            <li>› Residential Construction</li>
            <li>› Commercial Construction</li>
            <li>› Interior Renovations</li>
            <li>› Exterior Renovations</li>
            <li>› Roofing</li>
          </ul>
        </div>
        {/*  Logo and Business Info */}
        <div className="col-span-1 text-center align-middle justify-center content-center flex flex-col sm:order-1 md:order-2 ">
          <Image
            src={LogoImage}
            alt="Imperial Home Remodeling Logo"
            className="h-16 w-auto mx-auto md:mx-0 mb-3 self-center"
          />
          <p className="text-amber-500 font-semibold mb-1">
            Imperial Home Remodeling
          </p>
          <p className="mb-1">420 Godwin Ave, Midland Park, NJ 07432, USA</p>
          <p className="mb-1">
            Phones:{" "}
            <a className="hover:text-amber-400" href="tel:+12015460083">
              (201) 546-0083
            </a>{" "}
            |{" "}
            <a className="hover:text-amber-400" href="tel:+12144679319">
              (214) 467-9319
            </a>
          </p>
          <p className="text-green-500">Insured & Licensed</p>
        </div>
        {/* Quick Links */}
        <div className="col-span-1 text-center sm:order-3 md:order-3 ">
          <h4 className="text-white font-semibold mb-2">Social Media</h4>
          <ul className="space-y-1 align-middle">
            <li>
              <span className="material-icons">facebook</span>
            </li>
            <li>
              <span className="material-icons">photo_camera</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="text-center mt-8 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
}
