import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-date-ranges';
import {geocode} from 'react-geocode';
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';
import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';

const Home = () => {
  const [selectedDates, setSelectedDates] = useState<Object>();
  const route = useRoute();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState<any>('');

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'MacroStay',
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

  const customButton = (onConfirm: any) => {
    return <Button onPress={onConfirm} title="Submit" />;
  };

  // const getCityFromCoordinates = async (latitude: any, longitude: any) => {
  //   const apiKey = 'AIzaSyBUTbF306tbLC8rrFCbCqKtbp8EiFlMrNw';
  //   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  //   try {
  //     const response = await fetch(apiUrl);

  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log(response.data);

  //       if (data.results.length > 0) {
  //         const city = data.results[0].address_components.find(component =>
  //           component.types.includes('locality'),
  //         );

  //         if (city) {
  //           return city.long_name;
  //         }
  //       }

  //       console.error('City not found in API response:', data);
  //       return 'City not found';
  //     } else {
  //       console.error('Error:', response.status, response.statusText);
  //       return 'Error fetching data';
  //     }
  //   } catch (error) {
  //     console.error('Error fetching geocoding data:', error.message);
  //     return 'Error fetching data';
  //   }
  // };

  const searchPlaces = (place: any) => {
    if (!route.params || !selectedDates) {
      Alert.alert(
        'Invalid Details',
        'Please enter all the details',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
          },
        ],
        {cancelable: false},
      );
    }

    if (route.params && selectedDates) {
      const params: {
        place: any;
        rooms: number;
        adults: number;
        children: number;
        selectedDates: any;
      } = {
        place: place,
        rooms: rooms,
        adults: adults,
        children: children,
        selectedDates: selectedDates,
      };
      navigation.navigate('Places', params);
    }
  };

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const {latitude, longitude} = location;
        setLocation({latitude, longitude});
        // geocode('latlng', `${latitude}, ${longitude}`, {
        //   key: 'AIzaSyBUTbF306tbLC8rrFCbCqKtbp8EiFlMrNw',
        //   language: 'en',
        //   region: 'np',
        // })
        //   .then(response => {
        //     console.log(response);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const getSearch = async () => {
    getLocation();

    navigation.navigate('Search');
  };

  return (
    <>
      <View>
        <Header />
        <ScrollView>
          <View
            style={{
              margin: 20,
              borderColor: '#FFC72C',
              borderWidth: 3,
              borderRadius: 6,
            }}>
            {/* Destination */}
            <Pressable
              onPress={() => getSearch()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 10,
              }}>
              <Ionicons name="search" size={24} color="black" />
              <TextInput
                placeholder={
                  route.params ? route.params.input : 'Enter Your Destination'
                }
                placeholderTextColor="black"
              />
            </Pressable>

            {/* Selected Dates */}
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 15,
              }}>
              <Fontisto name="date" size={24} color="black" />
              <DatePicker
                style={{
                  width: 300,
                  height: 35,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: 'transparent',
                }}
                customStyles={{
                  placeholder: 'Select the dates',
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 'auto',
                  },
                  headerStyle: {backgroundColor: '#003580'},
                  contentText: {
                    fontSize: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 'auto',
                    color: 'black',
                  },
                }}
                allowFontScaling={false}
                customButton={(onConfirm: any) => customButton(onConfirm)}
                onConfirm={(startDate: any, endDate: any) => {
                  setSelectedDates(startDate, endDate);
                }}
                placeholder={'Select dates'}
                mode={'range'}
              />
            </Pressable>

            {/* Rooms and Guests */}
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 10,
              }}>
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholder={`${rooms}room + ${adults} adults + ${children} children`}
                placeholderTextColor="red"
              />
            </Pressable>

            {/* Search Button */}
            <Pressable
              onPress={() => searchPlaces(route?.params.input)}
              style={{
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: '#2a52be',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Search
              </Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: 'black',
              marginHorizontal: 20,
              fontSize: 17,
              fontWeight: '500',
            }}>
            Travel More Spend Less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 200,
                height: 150,
                borderRadius: 10,
                backgroundColor: '#003580',
                marginTop: 10,
                padding: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginVertical: 7,
                  color: 'white',
                }}>
                Genis
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                consectetur!
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 200,
                height: 150,
                borderRadius: 10,
                backgroundColor: '#9397B9',
                borderWidth: 0.8,
                marginTop: 10,
                padding: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginVertical: 7,
                  color: 'white',
                }}>
                15% Dicounts
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                consectetur!
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 200,
                height: 150,
                borderRadius: 10,
                backgroundColor: '#E0E0E0',
                borderWidth: 2,
                marginTop: 10,
                padding: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginVertical: 7,
                  color: 'black',
                }}>
                10% discount
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                consectetur!
              </Text>
            </Pressable>
          </ScrollView>

          <Pressable
            style={{
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 200, height: 50, resizeMode: 'cover'}}
              source={require('./MacroStay.png')}
            />
          </Pressable>
        </ScrollView>
      </View>
      <BottomModal
        swipeThreshold={200}
        swipeDirection={['up', 'down']}
        footer={
          <ModalFooter>
            <ModalButton
              onPress={() => setModalVisible(!modalVisible)}
              text="Apply"
              style={{
                marginBottom: 20,
              }}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 310}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Rooms
            </Text>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Pressable
                onPress={() => setRooms(room => Math.max(1, room - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500',
                    paddingHorizontal: 6,
                  }}>
                  {rooms}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setRooms(room => room + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Adults
            </Text>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Pressable
                onPress={() => setAdults(adult => Math.max(1, adult - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500',
                    paddingHorizontal: 6,
                  }}>
                  {adults}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setAdults(adult => adult + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Children
            </Text>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Pressable
                onPress={() => setChildren(child => Math.max(0, child - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500',
                    paddingHorizontal: 6,
                  }}>
                  {children}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setChildren(child => child + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default Home;
