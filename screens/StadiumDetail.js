import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const StadiumDetail = ({ route }) => {
  const { stadium } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: stadium.imageUrl }} style={styles.stadiumImage} />
      <Text style={styles.title}>{stadium.name}</Text>
      <Text style={styles.info}>{stadium.info}</Text>
      <Text style={styles.timeLabel}>Match Start Time:</Text>
      <Text style={styles.time}>{stadium.matchStartTime}</Text>
      <Text style={styles.timeLabel}>Match End Time:</Text>
      <Text style={styles.time}>{stadium.matchEndTime}</Text>
      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playButtonText}>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  stadiumImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop:40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:15
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#FE724C',
    borderRadius: 20,
    padding: 8,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally
    marginTop: 'auto', // Push the button to the bottom
  },
  playButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'900'
  },
});

export default StadiumDetail;
