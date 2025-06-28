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
      </head>
      <body className="bg-gray-50 text-gray-800 font-[Poppins]">
        {children}
      </body>
  
    </html>
  );
}
