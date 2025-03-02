import { AuthProvider } from "../context/AuthContext";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const APP_NAME = "AKMovies";
const APP_DEFAULT_TITLE = "Best site to Watch Movies & TV Shows Online for Free | AKMovies";
const APP_DESCRIPTION = "Stream the latest movies and TV shows in HD for free on AKMovies. No sign-up required. Watch online now!";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "AKMovies",
    "free movies",
    "watch movies online",
    "HD streaming",
    "TV shows",
    "online movies",
    "streaming site",
    "latest movies",
    "best streaming site",
    "movie platform",
    "watch TV shows free",
    "akmovie",
    "ankit",
    "ankit kaushik",
  ],
  robots: "index, follow",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://realakmovies.vercel.app/",
    languages: {
      "en-US": "https://realakmovies.vercel.app/en",
      "es-ES": "https://realakmovies.vercel.app/es",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    url: "https://realakmovies.vercel.app/",
    type: "website",
    siteName: APP_NAME,
    images: [
      {
        url: "https://realakmovies.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "AKMovies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    images: ["https://realakmovies.vercel.app/logo.png"],
  },
  verification: {
    google: "IhleRkwS3CAPHzFgSf0ySPwCj7IYM1DdenB4JQzDb28",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://realakmovies.vercel.app/" />
        <link rel="icon" href="https://realakmovies.vercel.app/favicon.ico" sizes="32x32" />
        <meta property="og:locale" content="en_US" />
        <meta name="theme-color" content="#FFFFFF" />

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoOnDemandPlatform",
              "name": APP_NAME,
              "url": "https://realakmovies.vercel.app/",
              "logo": "https://realakmovies.vercel.app/logo.png",
              "sameAs": [
                "https://twitter.com/akmovies",
                "https://www.facebook.com/akmovies",
                "https://www.instagram.com/akmovies",
              ],
              "description": APP_DESCRIPTION,
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://realakmovies.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Online Streaming Platform",
                "addressLocality": "Worldwide",
                "postalCode": "00000",
                "addressCountry": "US",
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@akmovies.com",
              },
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
