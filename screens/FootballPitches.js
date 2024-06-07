import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config';
import footballImage from '../assets/football.png'; // Import the football image

const FootballPitches = ({ navigation }) => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const stadiumData = querySnapshot.docs.map(doc => ({
          imageUrl: doc.data().stadiumImage,
          name: doc.data().stadiumName,
          info: doc.data().stadiumInfo,
          matchStartTime: doc.data().matchStartTime,
          matchEndTime: doc.data().matchEndTime,
        }));
        setStadiums(stadiumData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stadiums: ', error);
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Football</Text>
      <Text style={styles.imageCount}>{stadiums.length}+ pitches</Text>
      <Image source={footballImage} style={styles.footballImage} />
      <ScrollView contentContainerStyle={styles.imageScrollContainer}>
        {stadiums.map((stadium, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => navigation.navigate('StadiumDetail', { stadium })}
          >
            <Image source={{ uri: stadium.imageUrl }} style={styles.image} />
            <Text style={styles.stadiumName}>{stadium.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E54519',
    marginRight: 160,
    marginTop: 20,
  },
  imageCount: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 40,
    marginRight: 180,
  },
  imageScrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  stadiumName: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start', // Align text to the left
    marginBottom: 15,
  },
  footballImage: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default FootballPitches;
