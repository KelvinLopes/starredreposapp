import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  NoStarred,
  NoStarredText,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: true,
  };

  async componentDidMount() {
    this.loadStarredRepos();
  }

  loadStarredRepos = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(
      `/users/${user.login}/starred?page=${page}`,
      {
        params: { page },
      }
    );

    this.setState({
      stars: page >= 1 ? [...stars, ...response.data] : response.data,
      page,
      loading: true,
      refreshing: false,
    });
  };

  loadMore = () => {
    const { page } = this.state;

    const pageNumber = page + 1;

    this.loadStarredRepos(pageNumber);

    this.setState({ loading: false });
  };

  refreshList = async () => {
    this.setState(
      { refreshing: true, page: 1, stars: [] },
      this.loadStarredRepos
    );
  };

  handleNavigate = async repository => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  // Auxilia na otimização do fechar e abrir do app
  componentWillUnmount() {
    this.setState({ loading: false, refreshing: false });
  }

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? <></> : <ActivityIndicator color="fff" />}
        {stars.length > 0 ? (
          <Stars
            data={this.state.stars}
            keyExtractor={star => String(star.id)}
            refreshing={this.state.refreshing}
            onRefresh={this.refreshList}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title onPress={() => this.handleNavigate(item)}>
                    {item.name}
                  </Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        ) : (
          <NoStarred>
            <Icon name="star-off" size={210} color="#999" />
            <NoStarredText>
              {user.name} ainda não têm repositórios marcados com estrelas
            </NoStarredText>
          </NoStarred>
        )}
      </Container>
    );
  }
}
