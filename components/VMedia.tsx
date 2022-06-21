import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Movie, TV } from "../api";
import Poster from "../components/Poster";
import Vote from "../components/Vote";
import { RootStackParamList } from "../navigation/Root";

const Container = styled(View)`
  align-items: center;
`;
const Title = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  font-size: 8px;
`;

interface VMediaProps {
  posterPath: string;
  title: string;
  vote: number;
  fullData: Movie | TV;
}

type RootNavProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  title,
  vote,
  fullData,
}) => {
  const navigation = useNavigation<RootNavProp>();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {title.slice(0, 13)}
          {title.length > 13 ? "..." : ""}
        </Title>
        <Vote vote={vote} />
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
