import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import Vote from "../components/Vote";

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
  mediaTitle: string;
  overview: string;
  releaseDate?: string;
  vote?: number;
}
const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  mediaTitle,
  overview,
  releaseDate,
  vote,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{mediaTitle}</Title>
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
