import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';

const MapScreen = () => {
  const route = useRoute();
  const mapView = useRef(null);
  const coordinates: any = [];

  const details = route.params?.searchResults.map((item: any) =>
    coordinates.push({
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    }),
  );

  useEffect(() => {
    mapView.current?.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      },
    });
  });

  const renderCustomMarker = (item: any) => (
    <Marker
      key={item.id}
      title={item.name}
      coordinate={{
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
      }}>
      <Pressable
        onPress={() => {
          // Handle marker press if needed
        }}
        style={{
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#003580',
            paddingHorizontal: 7,
            paddingVertical: 4,
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              fontWeight: 'bold',
            }}>
            Rs. {item.newPrice}
          </Text>
        </View>
        <Image
          source={{uri: item.image}}
          style={{
            width: 30,
            height: 30,
            marginTop: 5,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
      </Pressable>
    </Marker>
  );

  return (
    <View style={{flex: 1}}>
      <MapView ref={mapView} style={{flex: 1}}>
        {route.params?.searchResults.map((item: any) =>
          renderCustomMarker(item),
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
