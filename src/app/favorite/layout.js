export async function generateMetadata({ params }) {
    if (!params) return {};
  
    return {
      title: `Favorite | Akmovies`,
      description: `Favorite Page | Akmovies`,
      openGraph: {
        title: `Favorite - AKmovies`,
        description: `Favorite Page | Akmovies`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Favorite - AKmovies`,
        description: `Favorite Page | Akmovies`,
      },
    };
  }
  
  export default function Layout({ children }) {
    return <>{children}</>;
  }
  