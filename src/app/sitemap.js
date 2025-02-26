import { MetadataRoute } from "next";

export default async function sitemap() {
  const baseUrl = "https://realakmovies.vercel.app"; // Update if using a custom domain

  // Static routes
  const staticRoutes = [
    `${baseUrl}/`,
    `${baseUrl}/movies`,
    `${baseUrl}/tv-shows`,
    `${baseUrl}/terms`,
  ];

  let dynamicRoutes = [];

  try {
    // Fetch popular movies
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    if (!movieRes.ok) throw new Error("Failed to fetch movies");
    const movieData = await movieRes.json();

    // Fetch popular TV shows
    const tvRes = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    if (!tvRes.ok) throw new Error("Failed to fetch TV shows");
    const tvData = await tvRes.json();

    // Generate dynamic movie & TV show URLs
    const movieUrls = movieData.results.map(movie => ({
      url: `${baseUrl}/movie/${movie.id}`,
      lastModified: new Date().toISOString(),
      metadata: {
        "@context": "https://schema.org",
        "@type": "Movie",
        "name": movie.title,
        "url": `${baseUrl}/movie/${movie.id}`,
        "description": movie.overview,
        "image": `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        "datePublished": movie.release_date,
      }
    }));

    const tvUrls = tvData.results.map(tv => ({
      url: `${baseUrl}/tv/${tv.id}`,
      lastModified: new Date().toISOString(),
      metadata: {
        "@context": "https://schema.org",
        "@type": "TVSeries",
        "name": tv.name,
        "url": `${baseUrl}/tv/${tv.id}`,
        "description": tv.overview,
        "image": `https://image.tmdb.org/t/p/w500/${tv.poster_path}`,
        "datePublished": tv.first_air_date,
      }
    }));

    dynamicRoutes = [...movieUrls, ...tvUrls];
  } catch (error) {
    console.error("Error fetching dynamic sitemap data:", error.message);
  }

  return [
    ...staticRoutes.map(url => ({ url, lastModified: new Date().toISOString() })),
    ...dynamicRoutes,
  ];
}
