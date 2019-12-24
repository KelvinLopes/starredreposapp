import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator, Text, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconInfo from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  DeleteButton,
  DeleteButtonText,
  Error,
  Footer,
  FooterText,
  NumberPerfil,
  NoList,
  NoListText,
  TextError,
  InfoButton,
  NumberPerfilContent,
  TextNameApp,
  Modal,
  ButtonHiddenModalInfo,
  TextModalInfo,
  TextDescriptionModalInfo,
  ContainerModal,
  TextHiddenModalInfo,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    checkError: true,
    sendErrorMessage: '',
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = await this.state;
    if (prevState.users !== this.setState.users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    this.setState({ loading: true });

    try {
      const { newUser, users } = this.state;
      const alreadyUserLogin = users.find(usr => usr.login === newUser);
      const alreadyUserName = users.find(usr => usr.name === newUser);

      if (alreadyUserLogin || alreadyUserName) {
        throw 'Você já salvou esse perfil.';
      }

      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
        profile: response.data.html_url,
      };
      if (newUser !== response.data.login || newUser === '') {
        throw 'Digite um perfil do Github.';
      }
      this.setState({
        users: [...users, data],
        newUser: '',
        sendErrorMessage: '',
        checkError: true,
      });
      Alert.alert(
        'Parabéns',
        `O perfil ${newUser} foi salvo em sua lista.`,

        [{ text: 'Fechar', onDismiss: () => {} }]
      );
    } catch (error) {
      this.timeMessageError();
      let textMessage = '';
      if (error !== 'Você já salvou esse perfil.')
        textMessage = 'Digite um perfil do Github.';
      if (
        error !== 'O usário não encontrado na base do Github' &&
        error !== 'Você já salvou esse perfil.'
      )
        textMessage = 'Digite um perfil do Github.';
      else textMessage = error;

      this.setState({
        checkError: false,
        newUser: '',
        sendErrorMessage: textMessage,
      });
    } finally {
      this.setState({ loading: false, checkError: false });
    }
    Keyboard.dismiss();
  };

  timeMessageError = () => {
    setTimeout(() => {
      this.setState({ sendErrorMessage: '' });
    }, 2500);
  };

  confirmExcluidUsers = users => {
    Alert.alert(
      `Deseja realmente excluir o perfil de ${users}`,
      'A ação não pode ser desfeita.',
      [
        {
          text: 'Não',
          onDismiss: () => {},
          style: 'cancel',
        },
        { text: 'sim', onPress: () => this.handleDeleteUser(users) },
      ],
      { cancelable: false }
    );
  };

  handleDeleteUser = async users => {
    Alert.alert(
      'Confirmação de exclusão',
      `O perfil de ${users} foi removido de sua lista.`,
      [
        {
          text: 'Entendi',
          onDismiss: () => {},
        },
      ]
    );

    this.setState({ users: this.state.users.filter(us => us.login !== users) });
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    navigation.navigate('User', { user });
  };
  // Auxilia na otimização do carregamento das informações ao fechar e abrir o app

  componentWillUnmount() {
    this.setState({
      loading: false,
      newUser: '',
      checkError: false,
      sendErrorMessage: '',
    });
  }

  render() {
    const {
      newUser,
      users,
      loading,
      checkError,
      sendErrorMessage,
    } = this.state;

    return (
      <Container>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
        >
          <ContainerModal>
            <TextModalInfo>Como usar?</TextModalInfo>
            <TextDescriptionModalInfo>
              Para adiconar perfils a sua lista, digite um nome de login de seu
              amigo(a) dev e toque no botão: +
            </TextDescriptionModalInfo>

            <ButtonHiddenModalInfo>
              <TextHiddenModalInfo
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                Fechar
              </TextHiddenModalInfo>
            </ButtonHiddenModalInfo>
          </ContainerModal>
        </Modal>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite aqui o nome de usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
            type="text"
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={25} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        {checkError ? (
          <></>
        ) : (
          <Error>
            <TextError> {sendErrorMessage} </TextError>
          </Error>
        )}
        {users.length ? (
          <List
            data={users}
            keyExtractor={user => user.login}
            renderItem={({ item }) => (
              <User>
                <Avatar source={{ uri: item.avatar }} />
                <Name>{item.name}</Name>
                <Bio>{item.bio}</Bio>

                <ProfileButton onPress={() => this.handleNavigate(item)}>
                  <ProfileButtonText>Ver perfil</ProfileButtonText>
                </ProfileButton>
                <DeleteButton
                  onPress={() => this.confirmExcluidUsers(item.login)}
                >
                  <DeleteButtonText>Remover perfil</DeleteButtonText>
                </DeleteButton>
              </User>
            )}
          />
        ) : (
          <NoList>
            <Icon name="event-note" size={210} color="#999" />
            <NoListText> Sua lista de perfis aparecerão aqui</NoListText>
          </NoList>
        )}
        <Footer>
          <>
            <FooterText>
              <IconInfo name="star" size={40} color="#fff" />
            </FooterText>
            <TextNameApp>Repos</TextNameApp>
          </>
          <InfoButton>
            <IconInfo
              name="information-outline"
              size={40}
              color="#fff"
              /* onPress={() => this.showInfo()} */
              onPress={() => {
                this.setModalVisible(true);
              }}
            />
          </InfoButton>
          {users.length < 1 ? (
            <></>
          ) : (
            <>
              <NumberPerfilContent>
                <Icon name="playlist-add-check" size={40} color="#fff" />
              </NumberPerfilContent>
              <NumberPerfil>
                <Text>{users.length}</Text>
              </NumberPerfil>
            </>
          )}
        </Footer>
      </Container>
    );
  }
}
