import {View, Text, Pressable, Image, Dimensions} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const PropertyCard = ({
  rooms,
  children,
  property,
  adults,
  selectedDates,
  availableRooms,
}: any) => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  console.log(property.rooms);

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate('Info', {
            name: property.name,
            rating: property.rating,
            oldPrice: property.oldPrice,
            newPrice: property.newPrice,
            photos: property.photos,
            availableRooms: property.rooms,
            adults: adults,
            children: children,
            id: property.rooms,
            selectedDates: selectedDates,
          })
        }
        style={{margin: 15, flexDirection: 'row', backgroundColor: 'white'}}>
        <View>
          <Image
            style={{height: height / 4, width: width - 240}}
            source={{uri: property.image}}
          />
        </View>

        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', width: 180}}>{property.name}</Text>
            <Pressable>
              <Ionicons name="heart-outline" size={24} color="red" />
            </Pressable>
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
              color="black"
              size={24}
            />
            <Text style={{color: 'black'}}>{property.rating}</Text>
            <View
              style={{
                backgroundColor: '#9e8d8e',
                paddingVertical: 3,
                borderRadius: 5,
                width: 90,
              }}>
              <Text style={{textAlign: 'center', fontSize: 14, color: 'white'}}>
                Genius Level
              </Text>
            </View>
          </View>
          <Text
            style={{
              width: 210,
              marginTop: 6,
              color: 'gray',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {property.addresses.length > 50
              ? property.addresses.substr(0, 50)
              : property.addresses}
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 14,
              fontWeight: '500',
              color: 'black',
            }}>
            Price for 1 Night and {adults} adults
          </Text>
          <View
            style={{
              marginTop: 4,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 15,
                textDecorationLine: 'line-through',
              }}>
              {property.newPrice * adults}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
              }}>
              Rs. {property.oldPrice * adults}
            </Text>
          </View>
          <View style={{marginTop: 2}}>
            <Text style={{fontSize: 14, color: 'gray'}}>Deluxe Room</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Hotel Room: 1 bed</Text>
          </View>
          <View
            style={{
              backgroundColor: '#69464a',
              paddingVertical: 2,
              marginTop: 2,
              borderRadius: 5,
              width: 130,
              paddingHorizontal: 3,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 12}}>
              Limited Time deal
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default PropertyCard;
