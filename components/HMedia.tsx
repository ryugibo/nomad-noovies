import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import Poster from "../components/Poster";
import Vote from "../components/Vote";
import { RootStackParamList } from "../navigation/Root";

const Title = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  font-size: 8px;
`;
const HMovie = styled(View)`
  padding: 0px 30px;
  flex-direction: row;
`;
const HColumn = styled(View)`
  margin-left: 15px;
  width: 80%;
`;
const Overview = styled(Text)`
  color: ${(props) => props.theme.textColor};
  width: 80%;
`;
const ReleaseDate = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin-vertical: 10px;
`;

interface HMediaProps {
  posterPath: string;
  title: string;
  overview: string;
  releaseDate?: string;
  vote?: number;
  fullData: Movie;
}

type RootNavProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  title,
  overview,
  releaseDate,
  vote,
  fullData,
}) => {
  const navigation = useNavigation<RootNavProp>();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{title}</Title>
          {releaseDate ? (
            <ReleaseDate>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </ReleaseDate>
          ) : null}
          {vote ? <Vote vote={vote} /> : null}
          <Overview>
            {overview && overview !== "" && overview.length > 80
              ? `${overview.slice(0, 80)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
