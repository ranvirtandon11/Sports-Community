import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = async() => {
  const auth = getAuth();
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log('User:', user);
      navigation.navigate('SportsScreen');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error:', errorCode, errorMessage);
    });
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.additionalOptions}>
        <Text style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('RegisterScreen')}>
          Don't have an account? Register
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  additionalOptions: {
    marginTop: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default LoginScreen;