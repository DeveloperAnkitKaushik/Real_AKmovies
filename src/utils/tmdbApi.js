import axiosClient from './axiosClient';

export const category = {
    movie: 'movie',
    tv: 'tv',
};

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
};

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
};

const tmdbApi = {
    // Fetch movie list by type (popular, upcoming, top-rated)
    getMoviesList: (type, params = {}) => {
        const url = `movie/${movieType[type]}`;
        return axiosClient.get(url, { params });
    },

    // Fetch TV list by type (popular, top-rated, on the air)
    getTvList: (type, params = {}) => {
        const url = `tv/${tvType[type]}`;
        return axiosClient.get(url, { params });
    },

    // Fetch videos for a movie or TV show
    getVideos: (cate, id) => {
        const url = `${category[cate]}/${id}/videos`;
        return axiosClient.get(url);
    },

    // Search for movies or TV shows
    search: (cate, params = {}) => {
        const url = `search/${category[cate]}`;
        return axiosClient.get(url, { params });
    },

    // Fetch details for a movie or TV show
    detail: (cate, id, params = {}) => {
        const url = `${category[cate]}/${id}`;
        return axiosClient.get(url, { params });
    },

    // Fetch credits (cast and crew) for a movie or TV show
    credits: (cate, id) => {
        const url = `${category[cate]}/${id}/credits`;
        return axiosClient.get(url);
    },

    // Fetch similar movies or TV shows
    similar: (cate, id) => {
        const url = `${category[cate]}/${id}/similar`;
        return axiosClient.get(url);
    },
};

export default tmdbApi;
