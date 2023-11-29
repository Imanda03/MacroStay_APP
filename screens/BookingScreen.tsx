import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();
  const bookings = useSelector(state => state.booking.booking);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '                             Bookings',
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
    <View>
      {bookings.length > 0 &&
        bookings.map(item => (
          <Pressable style={{backgroundColor: 'white', marginTop: 10}}>
            <View
              style={{
                marginHorizontal: 12,
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
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
                      backgroundColor: '#003580',
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
