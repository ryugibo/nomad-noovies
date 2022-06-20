import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Poster from "../components/Poster";
import Vote from "../components/Vote";
import { RootStackParamList } from "../navigation/Root";

const Movie = styled(View)`
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
  mediaTitle: string;
  vote: number;
}

type RootNavProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const VMedia: React.FC<VMediaProps> = ({ posterPath, mediaTitle, vote }) => {
  const navigation = useNavigation<RootNavProp>();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {mediaTitle.slice(0, 13)}
          {mediaTitle.length > 13 ? "..." : ""}
        </Title>
        <Vote vote={vote} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
