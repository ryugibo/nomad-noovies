import React from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListTitle = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HListSeparator}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          title={item.title ?? item.name}
          vote={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
