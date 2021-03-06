import React from "react";
import styled, { useTheme } from "styled-components/native";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import Vote from "./Vote";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Root";
import { Movie } from "../api";

const SlideView = styled(View)`
  flex: 1;
`;
const BgImg = styled(Image)``;
const Title = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled(View)`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
const Column = styled(View)`
  width: 60%;
  margin-left: 15px;
`;
const Overview = styled(Text)`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  movieTitle: string;
  overview: string;
  voteAverage: number;
  fullData: Movie;
}

type RootNavProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  movieTitle,
  overview,
  voteAverage,
  fullData,
}) => {
  const theme = useTheme();
  const navigation = useNavigation<RootNavProp>();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <SlideView>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          tint={theme.blurTint}
          intensity={80}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title>{movieTitle}</Title>
              <Overview>{overview.slice(0, 90)}...</Overview>
              <View style={{ marginTop: 10 }}>
                <Vote vote={voteAverage} />
              </View>
            </Column>
          </Wrapper>
        </BlurView>
      </SlideView>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
