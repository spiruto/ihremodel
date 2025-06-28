// app/page.tsx

import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Services from "@/components/services/Services";
import WhatsappButton from "@/components/whatsapp-button/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <WhatsappButton />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Imperial Home Remodeling",
            image: "https://www.ihremodel.com/logo.webp",
            telephone: "+12015460083",
            address: {
              "@type": "PostalAddress",
              streetAddress: "420 Godwin Ave",
              addressLocality: "Midland Park",
              addressRegion: "NJ",
              postalCode: "07432",
              addressCountry: "US",
            },
            url: "https://www.ihremodel.com",
          }),
        }}
      />
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
