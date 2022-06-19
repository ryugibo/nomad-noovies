const API_KEY = "3c983d1e60d94e03820760af3fae791e";

const BASE_URL = "https://api.themoviedb.org/3";

const PARAMS = "region=KR&language=ko-KR";

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&${PARAMS}`).then(
    (res) => res.json()
  );

const upcoming = () =>
  fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&${PARAMS}`).then((res) =>
    res.json()
  );

const nowPlaying = () =>
  fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&${PARAMS}`).then(
    (res) => res.json()
  );
