import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Aminities from '../components/Aminities';
import Entypo from 'react-native-vector-icons/Entypo';

const RoomScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedRoom, setSelectedRoom] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `            Available Rooms`,
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
  return (
    <>
      <ScrollView>
        {route.params.rooms.map((room, index: number) => (
          <Pressable
            key={index}
            style={{marginTop: 10, backgroundColor: 'white', padding: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#007FFF', fontSize: 17, fontWeight: '500'}}>
                {room.name}
              </Text>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#007FFF"
              />
            </View>
            <Text style={{marginTop: 3, color: 'black', fontSize: 16}}>
              Pay at the property
            </Text>
            <Text style={{color: 'green', fontSize: 16}}>
              Free cancellation Available
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'red',
                  textDecorationLine: 'line-through',
                }}>
                {route.params.oldPrice}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                {route.params.newPrice}
              </Text>
            </View>
            <Aminities />

            {selectedRoom.includes(room.name) ? (
              <Pressable
                style={{
                  backgroundColor: '#F0F8FF',
                  borderColor: '#318CE7',
                  borderWidth: 2,
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setSelectedRoom(
                    selectedRoom.filter(item => item !== room.name),
                  );
                }}>
                <Text
                  style={{
                    alignItems: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: '#318CE7',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  SELECTED
                </Text>
                <Entypo
                  name="circle-with-cross"
                  size={24}
                  color="red"
                  onPress={() => setSelectedRoom([])}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setSelectedRoom(room.name)}
                style={{
                  borderColor: '#007FFF',
                  borderWidth: 2,
                  borderRadius: 6,
                  padding: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#007FFF',
                  }}>
                  SELECT
                </Text>
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {selectedRoom.length > 0 ? (
        <Pressable
          onPress={() =>
            navigation.navigate('User', {
              oldPrice: route.params.oldPrice,
              newPrice: route.params.newPrice,
              name: route.params.name,
              children: route.params.children,
              adults: route.params.adults,
              startDate: route.params.startDate,
              endDate: route.params.endDate,
              rating: route.params.rating,
            })
          }
          style={{
            backgroundColor: '#007FFF',
            padding: 8,
            marginBottom: 30,
            borderRadius: 3,
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}>
            RESERVE
          </Text>
        </Pressable>
      ) : null}
    </>
  );
};

export default RoomScreen;
