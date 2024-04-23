import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const VenuesScreen = ({ navigation }) => {
  // Dummy data for venues
  const venues = [
    { id: 1, name: 'Dubai Sports City', location: 'Dubai' },
    { id: 2, name: 'Al Nasr Leisureland', location: 'Dubai' },
    // Add more venues as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Venues</Text>
      <FlatList
        data={venues}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.venueItem}
            onPress={() => navigation.navigate('VenueDetails', { venue: item })}
          >
            <Text style={styles.venueName}>{item.name}</Text>
            <Text style={styles.venueLocation}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  venueItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueLocation: {
    fontSize: 14,
    color: '#888',
  },
});

export default VenuesScreen;