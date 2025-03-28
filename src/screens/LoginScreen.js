import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login, signUp } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Login failed', 'Please enter a username or email.');
      return;
    }
    if (login(email)) {
      navigation.replace('Kanban');
    } else {
      Alert.alert('Login failed');
    }
  };

  const handleSignUp = () => {
    if (!email) {
      Alert.alert('Sign Up failed', 'Please enter a username or email.');
      return;
    }
    if (signUp(email, email)) {
      navigation.replace('Kanban');
    } else {
      Alert.alert('Sign Up failed', 'User already exists');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock Login/Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Sign Up" onPress={handleSignUp} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20, 
    marginBottom: 15, 
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 4
  }
});




