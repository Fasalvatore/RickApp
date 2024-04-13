import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Container, Input } from './styles';

export default function Main() {
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (newUser === '') {
      navigation.navigate('login');
    }
  };

  return (

    <Container>

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Nome"
        onChangeText={text => setNewUser(text)}
        style={{margin: 10}}
      />
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Telefone"
        onChangeText={text => setNewUser(text)}
        style={{margin: 10}}
      />
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="CPF"
        onChangeText={text => setNewUser(text)}
        style={{margin: 10}}
      />
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="E-mail"
        onChangeText={text => setNewUser(text)}
        style={{margin: 10}}
      />
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Curso"
        onChangeText={text => setNewUser(text)}
        style={{margin: 10}}
      />

      <TouchableOpacity style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 5,margin: 10 }} onPress={handleLogin}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
      </TouchableOpacity>
    </Container>
  );
}
