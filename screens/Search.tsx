import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { View, Text, ScrollView, TextInput } from "react-native";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";

const Container = styled(ScrollView)``;

const SearchBar = styled(TextInput)`
  background-color: ${(props) => props.theme.textInputBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 15px;
  border-radius: 30px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const theme = useTheme();
  const [keyword, setKeyword] = useState("");
  const {
    isLoading: isLoadingMovies,
    data: dataMovies,
    refetch: searchMovies,
  } = useQuery(["searchMovies", keyword], moviesApi.search, { enabled: false });
  const {
    isLoading: isLoadingTv,
    data: dataTv,
    refetch: searchTv,
  } = useQuery(["searchTvs", keyword], tvApi.search, { enabled: false });
  const onChangeText = (text: string) => setKeyword(text);
  const onSubmit = () => {
    if (keyword === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor={theme.textInputPlaceholderColor}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
};
export default Search;
