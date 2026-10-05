import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bryan Develops | Websites & Custom Software — South Bend, IN",
  description:
    "Custom websites and software by Bryan Arambula in South Bend, Indiana. Website design, web applications, integrations, and ongoing support for businesses nationwide.",
  keywords: [
    "web design south bend",
    "custom software development",
    "web developer indiana",
    "small business website",
    "custom web apps",
    "Bryan Develops",
  ],
  openGraph: {
    title: "Bryan Develops | Websites & Custom Software",
    description:
      "Websites, business applications, and integrations built by Bryan Arambula. Based in South Bend, Indiana, working with businesses nationwide.",
    type: "website",
    locale: "en_US",
    siteName: "Bryan Develops",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bryan Develops",
  url: "https://bryandevelops.com",
  description:
    "Website design and custom software development for businesses in South Bend and nationwide.",
  areaServed: [
    { "@type": "City", name: "South Bend", containedInPlace: { "@type": "State", name: "Indiana" } },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: [
    "Web Design",
    "Custom Software Development",
    "Web Development",
    "Branding",
  ],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "South Bend",
    addressRegion: "IN",
    addressCountry: "US",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
