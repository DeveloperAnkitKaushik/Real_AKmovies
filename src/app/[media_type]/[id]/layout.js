export async function generateMetadata({ params }) {
  if (!params) return {};
  const { media_type, id } = params;

  // Fetch Movie/TV Show Data
  const res = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();

  // Generate Meta Data
  const title = `Watch ${data.title || data.name} Online in HD - AKMovies`;
  const description = `Stream ${data.title || data.name} online for free in HD quality. Watch without sign-up. Available on AKMovies.`;
  const url = `https://realakmovies.vercel.app/${media_type}/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url, // ✅ Canonical URL added for SEO
    },
    openGraph: {
      title,
      description,
      url,
      type: "video.movie",
      images: [
        {
          url: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
          width: 1200,
          height: 630,
          alt: `${data.title || data.name} Cover Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://image.tmdb.org/t/p/original/${data.poster_path}`],
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Movie",
      "name": data.title || data.name,
      "url": url,
      "image": `https://image.tmdb.org/t/p/original/${data.poster_path}`,
      "description": data.overview,
      "datePublished": data.release_date || data.first_air_date,
      "genre": data.genres?.map((genre) => genre.name),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.vote_average,
        "reviewCount": data.vote_count,
      },
    },
  };
}

export default function Layout({ children }) {
  return <>{children}</>;
}
