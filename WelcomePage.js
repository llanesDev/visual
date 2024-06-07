import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

function WelcomePage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  }

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  }

  const handleFormSubmit = () => {
    // Navegar a la página de opciones
    navigation.navigate('Opciones');
  }

  const handleForgotPassword = () => {
    // Aquí puedes agregar la lógica para recuperar la contraseña
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Universidad Autónoma de Baja California</Text>
      <Image source={require('./paginas/img/logo-uabc.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.subtitle}>Sistema de Inventario</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Image source={require('./paginas/img/logo-small.png')} style={styles.footerLogo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9EAB8F',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4D9FFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  footerLogo: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
});

export default WelcomePage;
