import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { styles } from './styles';

export default class MainScreen extends Component {
  state = {
    characterName: '',
    characterId: '',
    selectedCharacter: null,
    searchedCharacters: [],
    detailsVisible: false,
    selectedCharacterDetails: {},
  };

  fetchCharacter = async () => {
    const { characterName } = this.state;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
      if (response.data.results.length > 0) {
        const character = response.data.results[0];
        this.setState(prevState => ({
          selectedCharacter: character,
          searchedCharacters: [character, ...prevState.searchedCharacters],
          characterName: '',
        }));
      } else {
        this.setState({ selectedCharacter: null });
        alert('Personagem não encontrado!');
      }
    } catch (error) {
      console.error('Error fetching character:', error);
      alert('Erro ao buscar personagem!');
    }
  };

  fetchCharacterById = async () => {
    const { characterId } = this.state;
    if (!isNaN(characterId)) {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
        if (response.data) {
          const character = response.data;
          this.setState(prevState => ({
            selectedCharacter: character,
            searchedCharacters: [character, ...prevState.searchedCharacters],
            characterId: '',
          }));
        } else {
          this.setState({ selectedCharacter: null });
          alert('Personagem não encontrado!');
        }
      } catch (error) {
        console.error('Error fetching character by id:', error);
        alert('Erro ao buscar personagem pelo ID!');
      }
    } else {
      alert('ID do personagem inválido! Por favor, insira um número válido.');
    }
  };

  fetchCharacterDetails = async characterId => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
      this.setState({ selectedCharacterDetails: response.data, detailsVisible: true });
    } catch (error) {
      console.error('Error fetching character details:', error);
      alert('Erro ao buscar detalhes do personagem!');
    }
  };

  handleCloseDetails = () => {
    this.setState({ detailsVisible: false });
  };

  handleDeleteCharacter = characterId => {
    this.setState(prevState => ({
      searchedCharacters: prevState.searchedCharacters.filter(character => character.id !== characterId),
    }));
  };

  render() {
    const { characterName, characterId, selectedCharacter, searchedCharacters, detailsVisible, selectedCharacterDetails } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do personagem"
          value={characterName}
          onChangeText={text => this.setState({ characterName: text })}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.fetchCharacter}>
          <Text style={styles.buttonText}>Salvar por Nome</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Digite o ID do personagem"
          value={characterId}
          onChangeText={text => this.setState({ characterId: text })}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={this.fetchCharacterById}>
          <Text style={styles.buttonText}>Salvar por ID</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Cards:</Text>
        <FlatList
          data={searchedCharacters}
          renderItem={({ item }) => (
            <View style={styles.characterContainer}>
              <Image source={{ uri: item.image }} style={styles.characterImage} />
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{item.name}</Text>
                <Text>Status: {item.status}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => this.fetchCharacterDetails(item.id)}
                >
                  <Text style={styles.buttonText}>Detalhes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => this.handleDeleteCharacter(item.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />

        {detailsVisible && (
          <View style={styles.characterDetails}>
            <Text>ID: {selectedCharacterDetails.id}</Text>
            <Text>Name: {selectedCharacterDetails.name}</Text>
            <Text>Status: {selectedCharacterDetails.status}</Text>
            <Text>Species: {selectedCharacterDetails.species}</Text>
            <Text>Type: {selectedCharacterDetails.type}</Text>
            <Text>Gender: {selectedCharacterDetails.gender}</Text>
            <Text>Origin: {selectedCharacterDetails.origin.name}</Text>
            <TouchableOpacity style={styles.button} onPress={this.handleCloseDetails}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
