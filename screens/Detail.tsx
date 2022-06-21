import React, { useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Container = styled(ScrollView)`
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

type RootStackParamList = {
  Detail: { title: string };
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { title },
  },
}) => {
  useEffect(() => {
    setOptions({ title });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};
export default Detail;
