import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import Poster from "../components/Poster";
import Vote from "../components/Vote";

const Movie = styled(View)`
  margin-right: 20px;
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
const VMedia: React.FC<VMediaProps> = ({ posterPath, mediaTitle, vote }) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {mediaTitle.slice(0, 13)}
        {mediaTitle.length > 13 ? "..." : ""}
      </Title>
      <Vote vote={vote} />
    </Movie>
  );
};

export default VMedia;
