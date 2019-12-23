import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator, Text, Alert, Modal } from 'react-native';
import { Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconInfo from 'react-native-vector-icons/MaterialCommunityIcons';


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
