import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: '#350b11',
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
      }}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 25,
          padding: 5,
        }}>
        <Ionicons name="bed-outline" size={26} color="white" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
          }}>
          Stays
        </Text>
      </Pressable>

      {/* <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons name="airplane-outline" size={22} color="white" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
          }}>
          Flights
        </Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons name="car-outline" size={22} color="white" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
          }}>
          Car Rental
        </Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Fontisto name="uber" size={22} color="white" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
          }}>
          Taxi
        </Text>
      </Pressable> */}
    </View>
  );
};

export default Header;
