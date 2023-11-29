import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {pixelNormalize} from '../components/Normalise';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Aminities from '../components/Aminities';

const PropertyInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `            ${route.params.name}`,
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
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{marginRight: 12}}
        />
      ),
    });
  }, []);

  const difference = route.params.oldPrice - route.params.newPrice;
  const offPrice = (Math.abs(difference) / route.params.oldPrice) * 100;

  return (
    <SafeAreaView>
      <ScrollView style={{marginBottom: 40}}>
        <Pressable
          style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
          {route.params.photos.slice(0, 5).map(photo => (
            <View style={{margin: 5}}>
              <Image
                style={{
                  width: 120,
                  height: pixelNormalize(80),
                  borderRadius: pixelNormalize(4),
                }}
                source={{uri: photo.image}}
              />
            </View>
          ))}
          <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', marginLeft: 20, color: 'black'}}>
              Show More
            </Text>
          </Pressable>
        </Pressable>

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
        <Text
          style={{
            borderColor: '#E0E0E0',
            borderWidth: 3,
            height: 1,
            marginTop: 15,
          }}
        />

        <Text
          style={{
            marginTop: 10,
            fontSize: 17,
            fontWeight: '500',
            marginHorizontal: 15,
            color: 'black',
          }}>
          Price for 1 Night and {route.params.adults} adults
        </Text>
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
        <View
          style={{
            marginHorizontal: 12,
            marginTop: 7,
            backgroundColor: 'green',
            paddingHorizontal: 4,
            paddingVertical: 5,
            width: 78,
            borderRadius: 4,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {offPrice.toFixed(0)} % OFF
          </Text>
        </View>
        <Text
          style={{
            borderColor: '#E0E0E0',
            borderWidth: 3,
            height: 1,
            marginTop: 15,
          }}
        />
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
              {route.params.selectedDates.startDate}
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
              {route.params.selectedDates.endDate}
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
        <Text
          style={{
            borderColor: '#E0E0E0',
            borderWidth: 3,
            height: 1,
            marginTop: 15,
          }}
        />

        <Aminities />
        <Text
          style={{
            borderColor: '#E0E0E0',
            borderWidth: 3,
            height: 1,
            marginTop: 15,
          }}
        />
      </ScrollView>
      <Pressable
        onPress={() =>
          navigation.navigate('Rooms', {
            rooms: route.params.availableRooms,
            oldPrice: route.params.oldPrice,
            newPrice: route.params.newPrice,
            name: route.params.name,
            children: route.params.children,
            adults: route.params.adults,
            startDate: route.params.selectedDates.startDate,
            endDate: route.params.selectedDates.endDate,
            rating: route.params.rating,
          })
        }
        style={{
          backgroundColor: '#006DA4',
          position: 'absolute',
          bottom: 20,
          padding: 15,
          width: '95%',
          marginHorizontal: 10,
          borderRadius: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 17,
          }}>
          Select Availability
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PropertyInfoScreen;
