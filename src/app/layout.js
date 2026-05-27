import "./globals.css";

export const metadata = {
  title: "SlotArt Artist — Premium Slot Game Art & Design",
  description:
    "Specializing in high-quality slot game art: symbols, characters, backgrounds, UI frames, and complete game skins. 5+ years experience, 50+ happy clients worldwide.",
  keywords: "slot game art, slot art, game artist, slot symbols, game characters, slot machine art, casino game design",
  openGraph: {
    title: "SlotArt Artist — Premium Slot Game Art & Design",
    description: "High-quality slot game art that captivates players and enhances gameplay.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts loaded via link tag to avoid PostCSS @import ordering conflict */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
