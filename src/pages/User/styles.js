import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background: rgba(1, 1, 1, 0.8);
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #009aaa;
`;

export const Avatar = styled.Image.attrs({
  borderColor: '#009aaa',
  borderStyle: 'solid',
  borderWidth: 5,
})`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const Name = styled.Text`
  font-size: 10px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #009aaa;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #9999;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #009aaa;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #f5f5f5;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #abc;
  margin-top: 2px;
  font-weight: bold;
`;

export const NoStarred = styled.View`
  top: 20px;
  justify-content: center;
  align-items: center;
`;

export const NoStarredText = styled.Text`
  color: #999;
  font-style: italic;
  font-family: Roboto;
  text-align: center;
`;
