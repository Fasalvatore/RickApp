import React, { Component } from 'react';
import api from '../services/api';
import {
  Container,
  Header,
  Stars,
  Avatarperfil,
  Nameperfil,
  Bioperfil,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  state = {
    episodes: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;
    const response = await api.get(`/users/${user.name}`);

    this.setState({ episodes: response.data.episode });
  }

  render() {
    const { route } = this.props;
    const { user } = route.params;
    const { episodes } = this.state;

    return (
      <Container>
        <Header>
          <Avatarperfil source={{ uri: user.avatar }} />
          <Nameperfil>{user.name}</Nameperfil>
          <Bioperfil>Status: {user.status}</Bioperfil>
          <Bioperfil>Location: {user.location}</Bioperfil>
        </Header>

        <Stars
          data={episodes}
          keyExtractor={episode => episode.id.toString()}
          renderItem={({ item }) => (
            <Starred>
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.episode}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
