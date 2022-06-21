import React, { useState } from "react";
import { Dimensions, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled(FlatList<Movie>)`
  margin-top: 20px;
`
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;
const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: isLoadingNowPlaying,
    data: nowPlayingData,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: isLoadingTrending,
    data: trendingData,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const {
    isLoading: isLoadingUpcoming,
    data: upcomingData,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);

  const loading = isLoadingNowPlaying || isLoadingTrending || isLoadingUpcoming;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                movieTitle={movie.title}
                overview={movie.overview}
                voteAverage={movie.vote_average}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? <HList title="Trending Movies" data={trendingData.results} /> : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          title={item.title}
          overview={item.overview}
          releaseDate={item.release_date}
          vote={item.vote_average}
          fullData={item}
        />
      )}
    />
  ) : null;
};

export default Movies;
