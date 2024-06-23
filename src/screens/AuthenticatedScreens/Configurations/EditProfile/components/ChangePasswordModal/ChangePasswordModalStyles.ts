import styled from "styled-components/native";

export const ContainerModal = styled.View`
  padding: 16px;
`;

export const HeaderModal = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleModal = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
`;

export const XButtonModal = styled.Pressable`
  padding: 8px;
  margin: -8px;
`;

export const ContentModal = styled.View`
  margin-top: 16px;
`;

export const ContentTextModal = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  text-align: center;
`;
