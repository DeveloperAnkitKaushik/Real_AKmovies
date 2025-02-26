import { AuthProvider } from "../context/AuthContext";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "AKMovies - Watch Movies & TV Shows Online for Free",
  description: "Stream the latest movies and TV shows in HD for free on AKMovies. No sign-up required. Watch online now!",
  keywords: "AKMovies, free movies, watch movies online, HD streaming, TV shows, online movies, streaming site",
  robots: "index, follow",  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://realakmovies.vercel.app/" />
        <meta name="google-site-verification" content="IhleRkwS3CAPHzFgSf0ySPwCj7IYM1DdenB4JQzDb28" />
        <meta property="og:title" content="AKMovies - Free Movies & TV Shows Online" />
        <meta property="og:description" content="Watch the latest movies and TV shows for free on AKMovies. No sign-up needed. HD streaming available." />
        <meta property="og:url" content="https://realakmovies.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://realakmovies.vercel.app/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKMovies - Free HD Movies & TV Shows" />
        <meta name="twitter:description" content="Enjoy free HD streaming of movies and TV shows on AKMovies. No sign-up needed!" />
        <meta name="twitter:image" content="https://realakmovies.vercel.app/logo.png" />

        {/* Structured Data (JSON-LD) for Google Search */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MovieRentalStore",
            "name": "AKMovies",
            "url": "https://realakmovies.vercel.app/",
            "logo": "https://realakmovies.vercel.app/logo.png",
            "sameAs": [
              "https://twitter.com/akmovies",
              "https://www.facebook.com/akmovies",
              "https://www.instagram.com/akmovies"
            ],
            "description": "AKMovies is a free online streaming platform for movies and TV shows in HD quality.",
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
          })}
        </script>
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
