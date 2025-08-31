// app/[locale]/layout.tsx
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

// ---- Site config (edit as needed) ----
const SITE_NAME = "Imperial Home Remodeling";
const DEFAULT_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ihremodel.com";
const DEFAULT_LOCALES = ["en", "es"] as const;
const CONTACT = {
  phone: "+12015460083",
  phoneAlt: "+12144679319",
  email: process.env.MAIL_USER || "mail@ihremodel.com",
  address: {
    streetAddress: "420 Godwin Ave",
    addressLocality: "Midland Park",
    addressRegion: "NJ",
    postalCode: "07432",
    addressCountry: "US",
  },
};
const SOCIAL = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
  tiktok: "https://www.tiktok.com/",
};

// Per-locale copy (fast + no data-fetch here)
function getLocaleCopy(locale: string) {
  const isEs = locale === "es";
  return {
    title: isEs
      ? "Remodelación de Hogar | Cocinas, Baños, Techos, Ventanas | Imperial Home Remodeling"
      : "Home Improvement & Remodeling | Kitchens, Baths, Roofing, Windows | Imperial Home Remodeling",
    description: isEs
      ? "Remodeladores con licencia para cocinas, baños, techos, ventanas y revestimiento. Cotizaciones gratis. Atendemos NJ y PA. Trabajo de calidad, instalaciones rápidas y excelentes reseñas."
      : "Licensed remodelers for kitchens, baths, roofing, windows & siding. Free quotes. Serving NJ & PA. Quality work, fast installs, great reviews.",
    ogTitle: isEs
      ? "Imperial Home Remodeling — Expertos en Remodelación"
      : "Imperial Home Remodeling — Expert Home Remodeling",
    ogDescription: isEs
      ? "Cocinas y baños, techos, ventanas y revestimiento. Cotizaciones gratis. Atendemos NJ y PA."
      : "Kitchen & bath remodels, roofing, windows, siding. Free quotes. Serving NJ & PA.",
  };
}

// Viewport (Core Web Vitals + theme color)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e", // var(--brand-teal) fallback
  colorScheme: "light",
};

// Metadata base (important for absolute URLs in OG/Twitter)
const metadataBase = new URL(DEFAULT_URL);

// Shared icons (update paths if needed)
const icons = {
  icon: [
    { url: "/favicon.ico" },
    { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0f766e" }],
};

// Generate rich metadata per locale and route
export async function generateMetadata({
  params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound();

  const copy = getLocaleCopy(locale);

  // i18n alternates
  const languages: Record<string, string> = {};
  for (const l of DEFAULT_LOCALES) {
    languages[l] = l === routing.defaultLocale ? `${DEFAULT_URL}/` : `${DEFAULT_URL}/${l}`;
  }

  // Canonical per locale (homepage pattern; subpages will inherit)
  const canonical = locale === routing.defaultLocale ? `${DEFAULT_URL}/` : `${DEFAULT_URL}/${locale}`;

  const titleTemplate = `%s | ${SITE_NAME}`;

  return {
    metadataBase,
    title: {
      default: copy.title,
      template: titleTemplate,
    },
    description: copy.description,
    applicationName: SITE_NAME,
    generator: "Next.js",
    keywords: [
      "home remodeling",
      "kitchen remodeling",
      "bathroom remodeling",
      "roofing",
      "windows",
      "siding",
      "exterior painting",
      "NJ",
      "PA",
      "New Jersey",
      "Pennsylvania",
      "free quote",
    ],
    authors: [{ name: SITE_NAME, url: DEFAULT_URL }],
    openGraph: {
      type: "website",
      url: canonical,
      title: copy.ogTitle,
      description: copy.ogDescription,
      siteName: SITE_NAME,
      images: [
        {
          url: "/og/og-default.jpg",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      locale,
      alternateLocale: DEFAULT_LOCALES.filter((l) => l !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle,
      description: copy.ogDescription,
      images: ["/og/og-default.jpg"],
    },
    alternates: {
      canonical,
      languages: {
        "x-default": DEFAULT_URL,
        ...languages,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons,
    category: "home_improvement",
  };
}
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
// Root layout (keeps Crisp + adds JSON-LD)
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // ---- JSON-LD (Organization + WebSite) ----
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: DEFAULT_URL,
    logo: `${DEFAULT_URL}/logo.webp`,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin, SOCIAL.tiktok].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.phone,
        contactType: "customer service",
        areaServed: ["US-NJ", "US-PA"],
        availableLanguage: ["English", "Spanish"],
      },
    ],
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_NAME,
    image: [`${DEFAULT_URL}/og/og-default.jpg`],
    url: DEFAULT_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.streetAddress,
      addressLocality: CONTACT.address.addressLocality,
      addressRegion: CONTACT.address.addressRegion,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.addressCountry,
    },
    areaServed: [{ "@type": "State", name: "New Jersey" }, { "@type": "State", name: "Pennsylvania" }],
    priceRange: "$$",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
    ],
  };

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: DEFAULT_URL,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${DEFAULT_URL}/search?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnects for faster 3rd-party (safe) */}
        <link rel="preconnect" href="https://client.crisp.chat" crossOrigin="" />
        {/* Crisp */}
        <Script id="crisp-chat" strategy="afterInteractive">
          {`
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "73607393-c3ae-4b7d-a2ee-0609f7e1843b";
            (function () {
              var d = document;
              var s = d.createElement("script");
              s.src = "https://client.crisp.chat/l.js";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>

        {/* Structured Data */}
        <Script id="ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <Script id="ld-local-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
        <Script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }} />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
