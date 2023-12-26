import {View, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Avatar, Text, Button} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}: any) => {
  const [storedValue, setStoredValue] = useState({});
  const [location, setlocation] = useState('');
  useLayoutEffect(() => {
    const getValueFromAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('user'); // Replace '@key' with the key you used to store the value
        if (value !== null) {
          setStoredValue(JSON.parse(value)); // Set the retrieved value to the state
        } else {
          console.log('Value not found in AsyncStorage');
        }
      } catch (error: any) {
        console.error(
          'Error retrieving value from AsyncStorage:',
          error.message,
        );
      }
    };

    navigation.setOptions({
      headerShown: true,
      title: '                       My Profile',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#350b11',
        height: 100,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
    getValueFromAsyncStorage();
  }, []);

  const [user, setUser] = useState({
    name: 'Person',
    email: 'person@example.com',
    profileImage:
      'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp', // Replace with your user's profile picture URL
  });

  const handleLogout = async () => {
    Alert.alert('Logged out!', 'Thank you for visiting the MacroStay.');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('tokenExpirationTime');
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded
        source={{uri: user.profileImage}}
        containerStyle={styles.avatarContainer}
      />
      <Text h4 style={styles.text}>
        {storedValue?.username}
      </Text>
      <Text style={styles.text}>{storedValue?.email}</Text>
      <Button
        title="Logout"
        onPress={handleLogout}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color
    padding: 16,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    color: '#333', // Text color
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ff5733', // Button color
  },
});
