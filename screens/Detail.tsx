import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components/native";
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie, moviesApi, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled(ScrollView)`
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;
const Header = styled(View)`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled(Image)``;
const Column = styled(View)`
  flex-direction: row;
  width: 80%;
`;
const Title = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled(Text)`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0px 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const { isLoading: isLoadingMovies, data: dataMovies } = useQuery(
    ["movies", params.id],
    moviesApi.detail,
    {
      enabled: "title" in params,
    }
  );
  const { isLoading: isLoadingTv, data: dataTv } = useQuery(
    ["tv", params.id],
    tvApi.detail,
    {
      enabled: "name" in params,
    }
  );
  console.log("movies", dataMovies);
  console.log("tv", dataTv);
  const theme = useTheme();
  useEffect(() => {
    setOptions({ title: "title" in params ? "Movie" : "TV Show" });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || null) }}
        />
        <LinearGradient
          colors={["transparent", theme.mainBgColor]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{"title" in params ? params.title : params.name}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
};
export default Detail;
