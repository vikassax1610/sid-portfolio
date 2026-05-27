import "./globals.css";

export const metadata = {
  title: "Sidhant Sharma — Slot Game Artist & Visual Designer",
  description:
    "Premium slot game art by Sidhant Sharma: symbols, characters, backgrounds, UI frames, and complete game skins. 5+ years experience, 50+ happy clients worldwide.",
  keywords: "slot game art, slot art, game artist, slot symbols, game characters, slot machine art, casino game design, Sidhant Sharma",
  openGraph: {
    title: "Sidhant Sharma — Slot Game Artist & Visual Designer",
    description: "High-quality slot game art that captivates players and enhances gameplay.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Premium Typography: Plus Jakarta Sans · Space Grotesk · Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
