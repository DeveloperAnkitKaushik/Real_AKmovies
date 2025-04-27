export async function GET(req, context) {
    const params = await context.params;
    const { path } = params;
    const searchParams = req.nextUrl.searchParams.toString();
  
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/${path.join("/")}?${
      searchParams ? `${searchParams}&` : ""
    }api_key=${apiKey}`;
  
    try {
      const response = await fetch(tmdbUrl, {
        cache: "no-store",
      });
  
      if (!response.ok) {
        console.error("TMDB Fetch Error:", response.status);
        return new Response(JSON.stringify({ error: "TMDB fetch failed" }), { status: response.status });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error("Proxy error:", error);
      return new Response(JSON.stringify({ error: "Proxy failed" }), { status: 500 });
    }
  }
  