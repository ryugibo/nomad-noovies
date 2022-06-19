import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { makeImgPath } from "../utils";

const PosterImage = styled(Image)`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(120, 120, 120, 1);
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <PosterImage source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
