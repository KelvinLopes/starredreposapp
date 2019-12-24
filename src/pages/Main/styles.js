import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background: rgba(1, 1, 1, 0.9);
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#248eff',
})`
  flex: 1;
  height: 40px;
  border-radius: 4px;
  padding: 0 15px;
  color: #5eba7d;
  font-size: 14px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #248eff;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #248eff;
  border-radius: 50px;
  bottom: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
  height: 50px;
  width: 50px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image.attrs({
  borderColor: '#009aaa',
  borderStyle: 'solid',
  borderWidth: 5,
})`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #248eff;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  line-height: 18px;
  color: #009aaa;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #248eff;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const Error = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
`;

export const TextError = styled.Text`
  color: rgba(178, 34, 34, 0.8);
  font-size: 14px;
  font-weight: bold;
`;

export const DeleteButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #009aaa;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const DeleteButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const Footer = styled.View.attrs({
  borderTop: 1,
  borderTopColor: '#248eff',
  borderStyle: 'solid',
  borderWidth: 1,
})`
  height: 50px;
  bottom: 0;
  background: #011;
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const FooterText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const FooterTextInfo = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  justify-content: center;
`;

export const Info = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #f9f7f8;
`;

export const InfoButton = styled(RectButton)`
  margin-top: 4px;
  left: -16px;
  align-self: stretch;
  border-radius: 300px;
  color: #ddd;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const NumberPerfilContent = styled.Text`
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  left: 36px;
  padding: 12px;
`;

export const NumberPerfil = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #f9f7f8;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

export const NoList = styled.View`
  top: 20px;
  justify-content: center;
  align-items: center;
`;

export const NoListText = styled.Text`
  color: #999;
  font-style: italic;
  font-family: Roboto;
  color: #248eff;
`;

export const TextNameApp = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #f9f7f8;
  align-items: center;
  justify-content: space-between;
  top: 5px;
  right: 40px;
  padding: 12px;
`;

export const Modal = styled.Modal`
  flex: 1;
  padding: 30px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(1, 1, 1, 0.8);
`;

export const ContainerModal = styled.View`
  padding: 30px;
  width: 320px;
  height: 320px;
  margin: 0 auto;
  top: 150px;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background: rgba(1, 1, 1, 1);
  z-index: 5;
  border-radius: 6px;
`;

export const ButtonHiddenModalInfo = styled(RectButton)`
  margin-top: 10px;
  top: 50px;
  align-self: center;
  border-radius: 4px;
  background: #248eff;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 300px;
`;

export const TextModalInfo = styled.Text`
  color: #999;
  font-style: italic;
  font-family: Roboto;
  color: #009aaa;
  bottom: 60px;
  font-size: 20px;
`;

export const TextDescriptionModalInfo = styled.Text`
  font-style: normal;
  font-family: Roboto;
  color: #009aaa;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const TextHiddenModalInfo = styled.Text`
  font-style: normal;
  font-family: Roboto;
  color: #fff;
  font-size: 18px;
  width: 360px;
  text-align: center;
`;
