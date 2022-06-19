import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv = () => {
  const { data: dataToday, isLoading: isLoadingToday } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { data: dataTop, isLoading: isLoadingTop } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const { data: dataTrending, isLoading: isLoadingTrending } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );
  const loading = isLoadingToday || isLoadingTop || isLoadingTrending;
  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <FlatList
        data={dataTrending.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            mediaTitle={item.name}
            vote={item.vote_average}
          />
        )}
      />
      <FlatList
        data={dataToday.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            mediaTitle={item.name}
            vote={item.vote_average}
          />
        )}
      />
      <FlatList
        data={dataTop.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            mediaTitle={item.name}
            vote={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};

export default Tv;
