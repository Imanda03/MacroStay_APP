import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInWithCredential, signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const getMyObject = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tokenUser');
        if (jsonValue) {
          navigation.navigate('Main');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyObject();
  });

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then(
      async userCredentials => {
        const user = userCredentials.user;
        const uid = user.uid;
        AsyncStorage.setItem(
          'tokenUser',
          await userCredentials.user.getIdToken(uid),
        );
        navigation.navigate('Main');
      },
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
      }}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text style={{color: '#003580', fontSize: 17, fontWeight: '700'}}>
            Sign In
          </Text>
          <Text
            style={{
              color: 'black',
              marginTop: 18,
              fontSize: 18,
              fontWeight: '500',
            }}>
            Sign In to Your Account
          </Text>
        </View>
        <View style={{marginTop: 50}}>
          <View>
            <Text style={{color: 'black', fontSize: 17, fontWeight: '600'}}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter Your Email"
              placeholderTextColor="black"
              style={{
                color: 'black',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{color: 'black', fontSize: 17, fontWeight: '600'}}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter Your Password"
              placeholderTextColor="black"
              style={{
                color: 'black',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
        </View>

        <Pressable
          onPress={() => login()}
          style={{
            width: 200,
            backgroundColor: '#003580',
            padding: 15,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 17}}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
