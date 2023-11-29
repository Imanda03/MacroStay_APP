import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../firebase';
import {doc, setDoc} from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const navigation = useNavigation();

  const register = () => {
    if (email === '' || password === '' || phone === '') {
      Alert.alert('Invalid Details', 'Please enter all your information', [
        {
          text: 'OK',
        },
      ]);
    }

    createUserWithEmailAndPassword(auth, email, password).then(
      async userCredentials => {
        const user = userCredentials.user;
        const uid = user.uid;

        setDoc(doc(db, 'users', `${uid}`), {
          email: user.email,
          phone: phone,
        });
        AsyncStorage.setItem(
          'tokenUser',
          await userCredentials.user.getIdToken(uid),
        );
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
            Register
          </Text>
          <Text
            style={{
              color: 'black',
              marginTop: 18,
              fontSize: 18,
              fontWeight: '500',
            }}>
            Create an Account
          </Text>
        </View>

        <View style={{marginTop: 50}}>
          <View>
            <Text style={{color: 'black', fontSize: 17, fontWeight: '600'}}>
              Phone Number
            </Text>
            <TextInput
              value={phone}
              onChangeText={text => setPhone(text)}
              placeholder="eg 98...."
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
          onPress={() => navigation.goBack('Login')}
          style={{marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 17}}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
