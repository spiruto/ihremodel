import "./globals.css";
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Imperial Home Remodeling</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="canonical" href="https://www.ihremodel.com/" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Imperial Home Remodeling" />
        <meta property="og:locale" content="en_US" />
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
      </head>
      <body className="bg-gray-50 text-gray-800 font-[Poppins]">
        {children}
      </body>
    </html>
  );
}
