import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropertyCard from '../components/PropertyCard';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  BottomModal,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';
import SearchResults from '../components/SearchResults';
import {fetchProperty} from '../api/auth';
import {UseQueryResult, useQuery} from '@tanstack/react-query';

const PlacesScreen = () => {
  const route = useRoute();

  const {data, error, isLoading}: UseQueryResult<any, Error> = useQuery({
    queryKey: ['searchPlace'],
    queryFn: fetchProperty,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [sortedData, setSortedData] = useState(data);

  console.log(data);
  const navigation = useNavigation();
  // console.log('sortedData' + JSON.stringify(data));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '          Popular Places',
      headerTitleStyle: {
        marginLeft: 10,
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
  }, []);

  const filters = [
    {
      id: '0',
      filter: 'cost:Low to High',
    },
    {
      id: '1',
      filter: 'cost:High to Low',
    },
  ];
  // console.log(route.params);
  const searchPlaces = data?.filter(
    (item: any) => item.locationId === route.params?.id,
  );

  // console.log('searchPlaces' + searchPlaces);
  const compare = (a: any, b: any) => {
    if (a.newPrice > b.newPrice) {
      return -1;
    }
    if (a.newPrice < b.newPrice) {
      return 1;
    }
    return 0;
  };

  const comparision = (a: any, b: any) => {
    if (a.newPrice < b.newPrice) {
      return -1;
    }
    if (a.newPrice > b.newPrice) {
      return 1;
    }
    return 0;
  };

  const applyFilter = (filter: any) => {
    setModalVisible(false);

    switch (filter) {
      case 'cost:High to Low':
        data.sort(compare);
        break;
      case 'cost:Low to High':
        data.sort(comparision);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: 'white',
        }}>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Fontisto name="arrow-swap" size={18} color="gray" />
          <Text style={{color: 'black', fontWeight: '500', marginLeft: 8}}>
            Sort
          </Text>
        </Pressable>
        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="filter-outline" size={18} color="gray" />
          <Text style={{color: 'black', fontWeight: '500', marginLeft: 8}}>
            Filter
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('Map', {
              searchResults: searchPlaces,
            })
          }
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome5 name="map-marker-alt" size={18} color="gray" />
          <Text style={{color: 'black', fontWeight: '500', marginLeft: 8}}>
            Map
          </Text>
        </Pressable>
      </Pressable>

      <ScrollView style={{backgroundColor: '#F5F5F5'}}>
        {data
          ?.filter((item: any) => item.locationId === route.params?.id)
          .map((property: any, index: any) => (
            <PropertyCard
              key={index}
              rooms={route.params?.rooms}
              children={route.params?.children}
              adults={route.params?.adults}
              selectedDates={route.params?.selectedDates}
              property={property}
              availableRooms={property.rooms}
            />
          ))}
      </ScrollView>
      <BottomModal
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              onPress={() => applyFilter(selectedFilter)}
              style={{
                paddingRight: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginVertical: 10,
                marginBottom: 30,
              }}>
              <Text style={{color: 'blue', fontWeight: '500'}}>Apply</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 280}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginVertical: 10,
                flex: 2,
                height: 280,
                borderRightWidth: 1,
                borderColor: '#E0E0E0',
              }}>
              <Text style={{textAlign: 'center', color: 'black'}}>Sort</Text>
            </View>
            <View style={{flex: 3, margin: 10, gap: 15}}>
              {filters.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedFilter(item.filter)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                  key={index}>
                  {selectedFilter.includes(item.filter) ? (
                    <FontAwesome5 name="check-circle" size={18} color="green" />
                  ) : (
                    <Entypo name="circle" size={18} color="black" />
                  )}
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontWeight: '500',
                      marginLeft: 6,
                    }}>
                    {item.filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default PlacesScreen;
