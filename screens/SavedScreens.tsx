import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SavedScreens = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '                     Saved Hotels',
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
  });

  const savedPlace = useSelector((state: any) => state.saveddraft.saveddraft);

  return (
    <ScrollView>
      <View>
        {savedPlace.length > 0 &&
          savedPlace.map((item: any, index: number) => (
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
    </ScrollView>
  );
};

export default SavedScreens;
