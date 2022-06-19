import styled from "styled-components/native";
import { StyleSheet, View, Image, Text, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";

const SlideView = styled(View)`
  flex: 1;
`;
const BgImg = styled(Image)``;
const Poster = styled(Image)`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
const Title = styled(Text)<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : "black")};
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
const Overview = styled(Text)<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : "black")};
`;
const Vote = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  title: string;
  overview: string;
  voteAverage: number;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  title,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <SlideView>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster source={{ uri: makeImgPath(posterPath) }} />
          <Column>
            <Title isDark={isDark}>{title}</Title>
            <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
            {voteAverage > 0 && <Vote isDark={isDark}>⭐{voteAverage}/10</Vote>}
          </Column>
        </Wrapper>
      </BlurView>
    </SlideView>
  );
};

export default Slide;
