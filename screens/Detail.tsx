import React, { useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, Text } from "react-native";

const Container = styled(ScrollView)`
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

const Detail = ({
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
