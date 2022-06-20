import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { View, Text, ScrollView, TextInput } from "react-native";

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
  const onChangeText = (text: string) => setKeyword(text);
  console.log(keyword);
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor={theme.textInputPlaceholderColor}
        returnKeyType="search"
        onChangeText={onChangeText}
      />
    </Container>
  );
};
export default Search;
