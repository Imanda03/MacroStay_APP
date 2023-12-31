import {View, Text, FlatList, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SearchResults = ({data, input, setInput, id, setid}: any) => {
  const navigation = useNavigation();

  return (
    <View style={{padding: 10}}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          if (item.place.toLowerCase().includes(input.toLowerCase())) {
            if (input == '') {
              return (
                <Pressable
                  onPress={() => {
                    setInput({item: item.place});
                    setid({id: item.id});
                    navigation.navigate('Home', {
                      input: item.place,
                      id: item.id,
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View>
                    <Image
                      style={{width: 70, height: 70}}
                      source={{uri: item.placeImage}}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                      {item.place}
                    </Text>
                    <Text style={{color: 'black', marginVertical: 4}}>
                      {item.shortDescription}
                    </Text>
                    <Text style={{color: '#8B8C96', fontSize: 15}}>
                      {item.properties.length} Properties
                    </Text>
                  </View>
                </Pressable>
              );
            } else {
              return (
                <Pressable
                  onPress={() => {
                    setInput({item: item.place, id: item.id});
                    navigation.navigate('Home', {
                      input: item.place,
                      id: item.id,
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View>
                    <Image
                      style={{width: 70, height: 70}}
                      source={{uri: item.placeImage}}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                      {item.place}
                    </Text>
                    <Text style={{color: 'black', marginVertical: 4}}>
                      {item.shortDescription}
                    </Text>
                    <Text style={{color: '#8B8C96', fontSize: 15}}>
                      {item.properties.length} Properties
                    </Text>
                  </View>
                </Pressable>
              );
            }
          }
        }}
      />
    </View>
  );
};

export default SearchResults;
