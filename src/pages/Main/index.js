import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator, Text, Alert, Modal } from 'react-native';
import { Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconInfo from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';


export default class Main extends Component {

 static navigationOptions = {
  title: 'Usuários',
};

state = {
  newUser : '',
  users : [],
  loading : false,
  checkError : false,
  sendErrorMessage : '',
}

async componentDidMount() {
  const users = await AsyncStorage.getAllKeys('users');
  if(users) {
    this.setState({ users: JSON.parse(users) });
  }
}

async componentDidUpdate(){
  const { users } = this.state;
  if(prevState.users !== this.setState.users) {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }
}

handleAddUser = async () => {
  this.setState({ loading: true });

  try {
    const { newUser, user } = this.state;
    const alreadyUserLogin = users.find(us => us.login === newUser );
    const { alreadyUserName } = users.find(us => us.name === newUser);

    if(alreadyUserLogin || alreadyUserName ) {
      throw new Error ('Você já salvou esse perfil.');
    }

    const response = await api.get(`users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar,
    }

    if(newUser !== response.data.login || newUser === '') {
      throw new Error('Digite um perfil do Github');
    }

    this.setState({
      users: [...users, data],
      checkError: true,
      sendErrorMessage: '',
      newUser: '',
    });

    Alert.alert(
      'Parabéns',
      `O perfil de ${newUser} foi adicionado em sua lista.`,
      [{ text: 'Fechar', onDismiss: () => {} }]
    );

  }catch(error) {
    this.timeMessageError();
    let textMessage = '';
    if (error !== 'Você já salvou esse perfil.')
    textMessage = 'Digite um perfil do Github.'
    else textMessage = error;

    this.setState({
      checkError: false,
      newUser: '',
      sendErrorMessage: textMessage,
    })

  }finally {
    this.setState({ loading: false, checkError: false });
  }
  Keyboard.dismiss();
}

timeMessageError = () => {
  setTimeout(() => {
    this.setState({ sendErrorMessage: '' });
  }, 2500);
};
//Auxilia na otimização do carregamento das informações ao fechar e abrir o app

componentWillMount(){
  this.setState({
    loading: false,
    newUser: '',
    checkError: false,
    sendErrorMessage: '',
  })
}






  render(){
    return (
      <Text> Hello Word! </Text>
    );
  }
}
