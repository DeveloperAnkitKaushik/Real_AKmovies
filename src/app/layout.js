import { AuthProvider } from "../context/AuthContext";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Best Movies and TV shows watching platform | Welcome to AKmovies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header/>
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
