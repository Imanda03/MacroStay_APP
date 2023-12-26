import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import LoadingScreen from './LoadingScreen';

interface LoginFormData {
  email: string;
  password: string;
}

const loginUser = async ({email, password}: LoginFormData): Promise<any> => {
  try {
    const response = await axios.post(
      'http://192.168.68.138:8000/api/auth/login',
      {email, password},
    );

    const userData = response.data;
    return userData;
  } catch (error: any) {
    console.error('Login Failed', error?.response?.data?.message);
  }
};

const LoginScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const mutation = useMutation<any, Error, LoginFormData, unknown>({
    mutationFn: loginUser,
    onSuccess: async (data: any) => {
      console.log('login successful', data);
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem(
        'tokenExpirationTime',
        expirationTime.toString(),
      );
    },
    onError: (error: any) => {
      console.error('login error', error.data);
    },
  });

  useEffect(() => {
    const getMyObject = async () => {
      const timeout = expirationTime - Date.now();
      try {
        const jsonValue = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        if (jsonValue && user) {
          navigation.navigate('Main');
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setTimeout(async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('tokenExpiration');
        console.log('Token and user data removed after expiration');
      }, timeout);
    };

    getMyObject();
  }, [navigation]);

  const login = () => {
    if (email === '' || password === '') {
      Alert.alert('Invalid Details', 'Please enter all your information', [
        {
          text: 'OK',
        },
      ]);
    } else {
      mutation.mutate({email, password});
      navigation.navigate('Main');
    }
  };
  if (loading) {
    return <LoadingScreen />;
  }

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
          onPress={login}
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
