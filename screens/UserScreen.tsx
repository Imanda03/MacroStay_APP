import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const UserScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `            User Details`,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 100,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
  }, []);

  const finalStep = () => {
    if (!firstName || !lastName || !email || !phoneNo) {
      Alert.alert('Invalid Details', 'Please enter all your information', [
        {
          text: 'OK',
        },
      ]);
    }
    if (firstName && lastName && email && phoneNo) {
      navigation.navigate('Confirmation', {
        oldPrice: route.params.oldPrice,
        newPrice: route.params.newPrice,
        name: route.params.name,
        children: route.params.children,
        adults: route.params.adults,
        startDate: route.params.startDate,
        endDate: route.params.endDate,
        rating: route.params.rating,
        personName: firstName,
      });
    }
  };
  return (
    <>
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'column', gap: 10}}>
          <Text style={{color: 'black'}}>FIrst Name</Text>
          <TextInput
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={{
              color: 'black',
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
          <Text style={{color: 'black'}}>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={{
              color: 'black',
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
          <Text style={{color: 'black'}}>Email</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              color: 'black',
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
          <Text style={{color: 'black'}}>Phone Number</Text>
          <TextInput
            value={phoneNo}
            onChangeText={text => setPhoneNo(text)}
            style={{
              color: 'black',
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: 'white',
          marginTop: 'auto',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 40,
          padding: 10,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 12,
              marginTop: 4,
              gap: 8,
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 20,
                textDecorationLine: 'line-through',
              }}>
              {route.params.oldPrice * route.params.adults}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
              }}>
              Rs. {route.params.newPrice * route.params.adults}
            </Text>
          </View>

          <Text style={{color: 'black'}}>
            You Saved {route.params.oldPrice - route.params.newPrice} rupees
          </Text>
        </View>

        <Pressable
          onPress={() => finalStep()}
          style={{backgroundColor: '#007FFF', padding: 10, borderRadius: 5}}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 15}}>
            Final Step
          </Text>
        </Pressable>
      </Pressable>
    </>
  );
};

export default UserScreen;
