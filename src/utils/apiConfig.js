const apiConfig = {
    baseUrl: '/api/tmdb/', // 🔥 Now you call your own Next.js backend
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
};

export default apiConfig;
