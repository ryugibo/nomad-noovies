import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const VoteText = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-size: 10px;
`;

interface IVote {
  vote: number;
}

const Vote: React.FC<IVote> = ({ vote }) => {
  return <VoteText>{vote > 0 ? `⭐${vote}/10` : "Coming soon"}</VoteText>;
};

export default Vote;
