import { AuthProvider } from "../context/AuthContext";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Best site to Watch Movies & TV Shows Online for Free | AKMovies",
  description: "Stream the latest movies and TV shows in HD for free on AKMovies. No sign-up required. Watch online now!",
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
  alternates: {
    canonical: "https://realakmovies.vercel.app/",
    languages: {
      "en-US": "https://realakmovies.vercel.app/en",
      "es-ES": "https://realakmovies.vercel.app/es"
    }
  },
  openGraph: {
    title: "AKMovies - Free Movies & TV Shows Online",
    description: "Watch the latest movies and TV shows for free on AKMovies. No sign-up needed. HD streaming available.",
    url: "https://realakmovies.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://realakmovies.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "AKMovies Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AKMovies - Free HD Movies & TV Shows",
    description: "Enjoy free HD streaming of movies and TV shows on AKMovies. No sign-up needed!",
    images: ["https://realakmovies.vercel.app/logo.png"]
  },
  verification: {
    google: "IhleRkwS3CAPHzFgSf0ySPwCj7IYM1DdenB4JQzDb28"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://realakmovies.vercel.app/" />
        <link rel="icon" href="https://realakmovies.vercel.app/favicon.ico" sizes="32x32" />
        <meta property="og:locale" content="en_US" />

        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoOnDemandPlatform",
          "name": "AKMovies",
          "url": "https://realakmovies.vercel.app/",
          "logo": "https://realakmovies.vercel.app/logo.png",
          "sameAs": [
            "https://twitter.com/akmovies",
            "https://www.facebook.com/akmovies",
            "https://www.instagram.com/akmovies"
          ],
          "description": "AKMovies is a free online streaming platform for movies and TV shows in HD quality.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://realakmovies.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Online Streaming Platform",
            "addressLocality": "Worldwide",
            "postalCode": "00000",
            "addressCountry": "US"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@akmovies.com"
          }
        })}} />
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
