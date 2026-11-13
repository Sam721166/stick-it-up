import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stickitupx.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stick It Up — Stickers Library for UI",
    template: "%s | Stick It Up",
  },
  description:
    "Stick It Up is an open-source UI sticker library for React and Next.js. 65+ interactive stickers with 3D vinyl hover peel physics, metallic chrome emblems, and pixel art decals. Free for personal & commercial use.",
  applicationName: "Stick It Up",
  keywords: [
    "stick it up",
    "stick-it-up",
    "stickitup",
    "stickitupx",
    "stickitupx.com",
    "ui sticker",
    "ui stickers",
    "ui stickers library",
    "ui sticker components",
    "react stickers",
    "stickers for react",
    "react sticker component",
    "react sticker library",
    "vinyl peel sticker react",
    "vinyl peel effect",
    "peelable sticker react",
    "interactive stickers web",
    "animated stickers react",
    "svg stickers react",
    "nextjs stickers",
    "next.js stickers",
    "next.js component library",
    "tailwind stickers",
    "react 19 stickers",
    "react 18 stickers",
    "typescript stickers",
    "holographic stickers web",
    "chrome badges react",
    "metallic emblems css",
    "pixel art stickers",
    "vector decals web",
    "retro stickers",
    "mascot stickers",
    "free open source react components",
    "interactive web animations",
    "developer portfolio stickers",
  ],
  authors: [{ name: "Samiran De", url: "https://github.com/Sam721166" }],
  creator: "Samiran De",
  publisher: "Stick It Up",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },
  openGraph: {
    title: "Stick It Up — Stickers Library for UI",
    description:
      "Open-source library of animated, interactive UI stickers for React & Next.js with realistic 3D vinyl hover peel physics. Free for commercial & personal use.",
    url: siteUrl,
    siteName: "Stick It Up",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Stick It Up — Free Interactive React Stickers & Vinyl Decals for Web",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stick It Up — Stickers Library for UI",
    description:
      "Open-source library of animated, interactive UI stickers for React & Next.js with realistic 3D vinyl hover peel physics.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@samirande_",
    site: "@samirande_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/stickers/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "5jVvqETr6i6dRLzcat_zbKVRFIlvpYRjngLkLVX2n1c",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Stick It Up",
      alternateName: [
        "stickitup",
        "stickitupx",
        "stickitupx.com",
        "stick-it-up",
        "Stick It Up UI",
        "UI Stickers",
      ],
      description:
        "Open-source library of interactive vector, chrome, and pixel art sticker components for React and Next.js.",
      publisher: {
        "@type": "Person",
        name: "Samiran De",
        url: "https://github.com/Sam721166",
        sameAs: [
          "https://x.com/samirande_",
          "https://github.com/Sam721166",
          "https://samworks.vercel.app/",
        ],
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/stickers?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "stick-it-up",
      alternateName: ["Stick It Up", "stickitupx"],
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      softwareVersion: "0.3.0",
      license: "https://opensource.org/licenses/MIT",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      description:
        "Handcrafted vector, holographic, and retro pixel art sticker components for React and Next.js with 3D vinyl hover peel physics.",
      url: siteUrl,
      downloadUrl: "https://www.npmjs.com/package/stick-it-up",
      sameAs: [
        "https://github.com/Sam721166/stick-it-up",
        "https://www.npmjs.com/package/stick-it-up",
      ],
      author: {
        "@type": "Person",
        name: "Samiran De",
        url: "https://github.com/Sam721166",
      },
      featureList: [
        "65+ Handcrafted Vector, Chrome, and Pixel Art Sticker Components",
        "Realistic 3D Vinyl Hover Peel Physics with Physical Spring Motion",
        "React 18 and React 19 Full Compatibility",
        "Zero-configuration Tailwind CSS Support",
        "Dual ESM and CommonJS Output with Strict TypeScript Types",
        "Pure SVG Support with Standalone HTML <img> Compatibility",
        "Zero CDN network requests with inline vector rendering",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Stick It Up (stickitupx.com)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stick It Up (stickitupx.com) is a free, open-source UI sticker component library for React and Next.js featuring handcrafted vector, holographic, and retro pixel art stickers with realistic 3D vinyl hover peel physics.",
          },
        },
        {
          "@type": "Question",
          name: "How do I install Stick It Up in React or Next.js?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Install it via npm by running 'npm i stick-it-up'. Then import any sticker component, such as 'import { FlameSticker } from \"stick-it-up\"', and render it in your JSX with '<FlameSticker size={96} peel />'.",
          },
        },
        {
          "@type": "Question",
          name: "Are the UI stickers free for personal and commercial use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Stick It Up is licensed under the MIT License and is 100% free for both personal and commercial web projects with no attribution required.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the stickers as raw SVGs without React?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, every sticker in the catalog can be downloaded as an optimized standalone SVG or copied for use in standard HTML <img> tags.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S3DJKR57QZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S3DJKR57QZ');
          `}
        </Script>
        {/* Google Tag Manager (GTM) */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WT7V99F8"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-WT7V99F8');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Geist+Pixel&family=Instrument+Serif&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Patrick+Hand&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WT7V99F8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
