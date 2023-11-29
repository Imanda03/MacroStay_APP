import {View, Text} from 'react-native';
import React from 'react';

const Aminities = () => {
  const services = [
    {
      id: '0',
      name: 'room service',
    },
    {
      id: '2',
      name: 'free wifi',
    },
    {
      id: '3',
      name: 'Family rooms',
    },
    {
      id: '4',
      name: 'Free Parking',
    },
    {
      id: '5',
      name: 'swimming pool',
    },
    {
      id: '6',
      name: 'Restaurant',
    },
    {
      id: '7',
      name: 'Fitness center',
    },
  ];
  return (
    <View style={{padding: 10}}>
      <Text style={{color: 'black', fontSize: 17, fontWeight: '600'}}>
        Most Popular Facilities
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        {services.map((item, index: number) => (
          <View
            style={{
              margin: 10,
              backgroundColor: '#007FFF',
              paddingHorizontal: 11,
              paddingVertical: 5,
              borderRadius: 25,
            }}
            key={index}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Aminities;
