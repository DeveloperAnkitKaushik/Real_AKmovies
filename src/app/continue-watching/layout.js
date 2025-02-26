export async function generateMetadata({ params }) {
    if (!params) return {};
  
    return {
      title: `Continue Watching | Akmovies`,
      description: `Continue Watching Page | Akmovies`,
      openGraph: {
        title: `Continue Watching - AKmovies`,
        description: `Continue Watching Page | Akmovies`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Continue Watching - AKmovies`,
        description: `Continue Watching Page | Akmovies`,
      },
    };
  }
  
  export default function Layout({ children }) {
    return <>{children}</>;
  }
  