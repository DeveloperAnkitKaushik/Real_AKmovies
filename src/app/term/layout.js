export async function generateMetadata({ params }) {
    if (!params) return {};
  
    return {
      title: `Terms and Conditions | Akmovies`,
      description: `Terms and Conditions Page | Akmovies`,
      openGraph: {
        title: `Terms and Conditions - AKmovies`,
        description: `Terms and Conditions Page | Akmovies`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Terms and Conditions - AKmovies`,
        description: `Terms and Conditions Page | Akmovies`,
      },
    };
  }
  
  export default function Layout({ children }) {
    return <>{children}</>;
  }
  