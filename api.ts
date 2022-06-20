const API_KEY = "3c983d1e60d94e03820760af3fae791e";

const BASE_URL = "https://api.themoviedb.org/3";

const PARAMS = "region=KR&language=ko-KR";

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&${PARAMS}`).then(
      (res) => res.json()
    ),
  upcoming: () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&${PARAMS}`).then(
      (res) => res.json()
    ),
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&${PARAMS}`).then(
      (res) => res.json()
    ),
  search: async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    console.log(keyword);
    return await fetch(
      `${BASE_URL}/search/movie?query=${keyword}&api_key=${API_KEY}&${PARAMS}`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&${PARAMS}`).then(
      (res) => res.json()
    ),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&${PARAMS}`).then(
      (res) => res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&${PARAMS}`).then((res) =>
      res.json()
    ),
  search: async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    return await fetch(
      `${BASE_URL}/search/tv?query=${keyword}&api_key=${API_KEY}&${PARAMS}`
    ).then((res) => res.json());
  },
};
