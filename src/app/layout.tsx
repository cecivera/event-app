import type { Metadata } from "next";
import "../tokens/tokens.css";
import "../tokens/typography.css";
import "../tokens/adl.css";

export const metadata: Metadata = {
  title: "Event App",
  description: "White-label event app (adiClub): component prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&family=Barlow+Condensed:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: "#f5f5f5" }}>{children}</body>
    </html>
  );
}
