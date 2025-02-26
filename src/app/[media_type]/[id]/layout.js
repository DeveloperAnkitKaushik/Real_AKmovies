export async function generateMetadata({ params }) {
    if (!params) return {};
    const { media_type, id } = params;
    const res = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();
  
    return {
      title: `Watch ${data.title || data.name} on Akmovies`,
      description: `Watch ${data.title || data.name} online. ${data.overview}`,
      openGraph: {
        title: `${data.title || data.name} - Watch Online in HD`,
        description: `Stream ${data.title || data.name} online in HD quality for free.`,
        images: [`https://image.tmdb.org/t/p/original/${data.backdrop_path}`],
        url: `https://realakmovies.vercel.app/${media_type}/${id}`,
        type: "video.movie",
      },
      twitter: {
        card: "summary_large_image",
        title: `${data.title || data.name} - Watch Free`,
        description: `Enjoy streaming ${data.title || data.name} in high quality.`,
        images: [`https://image.tmdb.org/t/p/original/${data.poster_path}`],
      },
    };
  }
  
  export default function Layout({ children }) {
    return <>{children}</>;
  }
  