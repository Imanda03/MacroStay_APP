import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {savedPlaces} from '../SavedReducer';
import notifee from '@notifee/react-native';

async function onDisplayNotification(name: string, place: string) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Macrostay Reservation',
    body: `Thanks ${name} for booking ${place}. Keep in Touch`,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}

const ConfirmationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `            Confirmation`,
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

  const confirmBooking = () => {
    dispatch(savedPlaces(route.params));
    onDisplayNotification(route.params.personName, route.params.name);
    navigation.replace('Main');
  };
  return (
    <View>
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
            <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
              {route.params.name}
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
              <Text style={{color: 'black'}}>{route.params.rating}</Text>
              <View
                style={{
                  backgroundColor: '#003580',
                  paddingVertical: 3,
                  borderRadius: 5,
                  width: 100,
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 14, color: 'white'}}>
                  Genius Level
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#17B169',
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 6,
            }}>
            <Text style={{color: 'white', fontSize: 13}}>
              Travel sustainable
            </Text>
          </View>
        </View>

        <View
          style={{
            margin: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 60,
          }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 3,
                color: 'black',
              }}>
              Check In
            </Text>
            <Text style={{color: '#007FFF', fontSize: 16, fontWeight: 'bold'}}>
              {route.params.startDate}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 3,
                color: 'black',
              }}>
              Check Out
            </Text>
            <Text style={{color: '#007FFF', fontSize: 16, fontWeight: 'bold'}}>
              {route.params.endDate}
            </Text>
          </View>
        </View>

        <View style={{margin: 16}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 3,
              color: 'black',
            }}>
            Rooms and Guests
          </Text>
          <Text
            style={{
              color: '#007FFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {route.params.rooms} rooms {route.params.adults} adults{' '}
            {route.params.children} children
          </Text>
        </View>

        <Pressable
          onPress={confirmBooking}
          style={{
            backgroundColor: '#003580',
            width: 120,
            padding: 5,
            marginHorizontal: 12,
            marginBottom: 20,
            borderRadius: 4,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Book Now
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ConfirmationScreen;
