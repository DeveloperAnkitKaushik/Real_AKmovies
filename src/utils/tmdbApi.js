import apiConfig from "./apiConfig";

export const category = {
    movie: "movie",
    tv: "tv",
};

export const movieType = {
    upcoming: "upcoming",
    popular: "popular",
    top_rated: "top_rated",
};

export const tvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
};

const fetchFromAPI = async (endpoint, params = {}) => {
    const url = new URL(`${apiConfig.baseUrl}${endpoint}`);
    params.api_key = apiConfig.apiKey;
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    } catch (error) {
        console.error("API Fetch Error:", error);
        throw error;
    }
};

const tmdbApi = {
    getMoviesList: (type, params = {}) => fetchFromAPI(`movie/${movieType[type]}`, params),
    getTvList: (type, params = {}) => fetchFromAPI(`tv/${tvType[type]}`, params),
    getVideos: (cate, id) => fetchFromAPI(`${category[cate]}/${id}/videos`),
    search: (cate, params = {}) => fetchFromAPI(`search/${category[cate]}`, params),
    detail: (cate, id, params = {}) => fetchFromAPI(`${category[cate]}/${id}`, params),
    credits: (cate, id) => fetchFromAPI(`${category[cate]}/${id}/credits`),
    similar: (cate, id) => fetchFromAPI(`${category[cate]}/${id}/similar`),
};

export default tmdbApi;