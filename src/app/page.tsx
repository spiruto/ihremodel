// app/page.tsx

import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Services from "@/components/services/Services";
import WhatsappButton from "@/components/whatsapp-button/WhatsAppButton";
import WhyChooseUs from "@/components/why-choose-us/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Projects />
<WhyChooseUs/>
      <Contact />
      <Footer />
      <WhatsappButton />
    </>
  );
}
export const metadata = {
  title: "Imperial Home Remodeling | Kitchen, Bathroom & Home Renovation",
  description:
    "Professional remodeling services for kitchens, bathrooms, and full home transformations. Get a free quote today.",
  keywords:
    "home remodeling, kitchen renovation, bathroom remodeling, carpentry, Costa Rica remodeling, Imperial Home Remodeling",
  robots: "index, follow",
  openGraph: {
    title: "Imperial Home Remodeling",
    description: "Transforming houses into dream homes.",
    url: "https://www.ihremodel.com",
    siteName: "Imperial Home Remodeling",
    images: [
      {
        url: "https://ihremodel.com/hero-img.jpg", // Replace with real image
        width: 1200,
        height: 630,
        alt: "Imperial Home Remodeling Hero Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Home Remodeling",
    description: "Transforming houses into dream homes.",
    images: ["https://ihremodel.com/hero-img.jpg"],
  },
};
