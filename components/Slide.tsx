import React from "react";
import styled, { useTheme } from "styled-components/native";
import { StyleSheet, View, Image, Text, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

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
const Vote = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  movieTitle: string;
  overview: string;
  voteAverage: number;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  movieTitle,
  overview,
  voteAverage,
}) => {
  const theme = useTheme();
  return (
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
            {voteAverage > 0 && <Vote>⭐{voteAverage}/10</Vote>}
          </Column>
        </Wrapper>
      </BlurView>
    </SlideView>
  );
};

export default Slide;
