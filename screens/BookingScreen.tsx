import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UseQueryResult, useMutation, useQuery} from '@tanstack/react-query';
import {BookingData, fetchBookingData} from '../api/auth';

const BookingScreen = () => {
  const [userId, setUserId] = useState<number>(0);
  const [booking, setBooking] = useState<any>({});
  const navigation = useNavigation();

  const {data, error, isLoading}: UseQueryResult<any, Error> = useQuery({
    queryKey: ['bookingData'],
    queryFn: fetchBookingData,
  });
  useLayoutEffect(() => {
    const getValueFromAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('user'); // Replace '@key' with the key you used to store the value
        if (value !== null) {
          const data = JSON.parse(value); // Set the retrieved value to the state
          setUserId(data.id);
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
      title: '                             Bookings',
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
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>No Data</Text>;
  }

  return (
    <View>
      {data
        ?.filter((value: any) => value.userId === userId)
        .map((item: any, index: number) => (
          <Pressable
            key={index}
            style={{backgroundColor: 'white', marginTop: 10}}>
            <View
              style={{
                marginHorizontal: 12,
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View>
                <Text
                  style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
                  {item.hotelName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 10,
                    gap: 80,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                    {item.roomName}
                  </Text>
                  <Text style={{color: 'black', fontSize: 16}}>
                    Total cost: {item.price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 10,
                    gap: 80,
                  }}>
                  {/* <Text style={{color: 'black', fontSize: 16}}>
                    Total cost: {item.checkInDate}
                  </Text> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 7,
                  }}>
                  <MaterialCommunityIcons
                    name="star-circle"
                    color="green"
                    size={24}
                  />
                  <Text style={{color: 'black'}}>{item.rating}</Text>
                  <View
                    style={{
                      backgroundColor: '#855a5a',
                      paddingVertical: 3,
                      borderRadius: 5,
                      width: 100,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        color: 'white',
                      }}>
                      Genius Level
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

export default BookingScreen;
