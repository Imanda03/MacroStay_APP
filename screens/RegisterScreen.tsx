import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  city: string;
}

const registerUser = async ({
  username,
  email,
  password,
  city,
}: RegisterFormData): Promise<any> => {
  try {
    const response = await axios.post(
      'http://192.168.68.138:8000/api/auth/register',
      {
        username,
        email,
        password,
        city,
      },
    );
    const userData = response.data;
    return userData;
  } catch (error: any) {
    console.error('Registration Failed', error.response.data.message);
  }
};

const RegisterScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const mutation = useMutation<any, Error, RegisterFormData, unknown>({
    mutationFn: registerUser,
    onSuccess: (data: any) => {
      console.log('Registration successful', data.message);
      navigation.navigate('Login');
    },
    onError: (error: any) => {
      console.error('Registration error', error.data);
    },
  });

  const register = () => {
    if (email === '' || password === '' || city === '' || username === '') {
      Alert.alert('Invalid Details', 'Please enter all your information', [
        {
          text: 'OK',
        },
      ]);
    } else {
      mutation.mutate({username, email, password, city});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', padding: 10}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{color: 'black', fontSize: 17, fontWeight: '600'}}>
              Full Name
            </Text>
            <TextInput
              value={username}
              onChangeText={text => setUsername(text)}
              placeholder="Jogn Willam"
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
          <View>
            <Text style={{color: 'black', fontSize: 17, fontWeight: '600'}}>
              City
            </Text>
            <TextInput
              value={city}
              onChangeText={text => setCity(text)}
              placeholder="Kathmandu"
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

          <Pressable
            onPress={() => register()}
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
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{marginTop: 20}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 17}}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
