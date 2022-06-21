import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components/native";
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Share,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie, moviesApi, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

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
const Data = styled(View)`
  padding: 0px 20px;
`;
const Overview = styled(Text)`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;
const VideoBtn = styled(TouchableOpacity)`
  flex-direction: row;
`;
const BtnText = styled(Text)`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const theme = useTheme();
  const isMovie = "title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail,
    {
      enabled: "title" in params,
    }
  );
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title: "title" in params ? params.title : params.name,
      });
    } else {
      await Share.share({
        title: "title" in params ? params.title : params.name,
        url: homepage,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color={theme.textColor} size={24} />
    </TouchableOpacity>
  );
  useEffect(() => {
    setOptions({
      title: "title" in params ? "Movie" : "TV Show",
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYTLink = async (key: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${key}`;
    // await Linking.openURL(baseUrl);
    let browserPackage: string | undefined;
    if (Platform.OS === "android") {
      const tabsSupportingBrowsers =
        await WebBrowser.getCustomTabsSupportingBrowsersAsync();
      browserPackage = tabsSupportingBrowsers?.preferredBrowserPackage;
    }
    await WebBrowser.openBrowserAsync(baseUrl, { browserPackage });
  };
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
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color={theme.textColor} size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};
export default Detail;
