import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
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
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = isLoadingToday || isLoadingTop || isLoadingTrending;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={dataTrending.results} />
      <HList title="Airing Today" data={dataToday.results} />
      <HList title="Top Rated TV" data={dataTop.results} />
    </ScrollView>
  );
};

export default Tv;
