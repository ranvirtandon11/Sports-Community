import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileImage = require("../assets/avatar.jpg");
const FootballImage = require("../assets/football.png");
const BasketballImage = require("../assets/basketball.png");
// const TennisImage = require("./assets/tennis.png");
// const VolleyballImage = require("./assets/volleyball.png");
// const BadmintonImage = require("./assets/badminton.png");
// Import images for other sports similarly

const { width, height } = Dimensions.get('window');

const HomePage = ({ navigation }) => {
  const [hovered, setHovered] = useState(null);

  const goToProfile = () => {
    navigation.navigate('Profile'); // Navigate to the profile page
  };

  const goToCreateEvent = () => {
    navigation.navigate('CreateEvent'); // Navigate to the create event page
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileIconContainer} onPress={goToProfile}>
          <Image source={ProfileImage} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>What Would You Like To Play ?</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Football' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Football')}
          onPressOut={() => setHovered(null)}
        >
          <Image source={FootballImage} style={styles.sportIcon} />
          <Text style={styles.iconLabel}>Football</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Basketball' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Basketball')}
          onPressOut={() => setHovered(null)}
        >
          <Image source={BasketballImage} style={styles.sportIcon} />
          <Text style={styles.iconLabel}>Basketball</Text>
        </TouchableOpacity>
        {/* Add TouchableOpacity components for other sports similarly */}
      </View>
      {/* Add the "Create Event" button */}
      <TouchableOpacity style={styles.createEventButton} onPress={goToCreateEvent}>
        <Text style={styles.createEventButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileIconContainer: {
    marginTop: 40,
    marginRight: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  titleText: {
    fontSize: 26.2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '30%', // Adjust based on the number of icons you want to display per row
  },
  iconItemHovered: {
    borderRadius: 50,
    backgroundColor: 'rgba(254, 114, 76, 1)', // Change the color as per your requirement
    height: 110,
    width: 90,
  },
  sportIcon: {
    width: 50,
    height: 50,
  },
  iconLabel: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  createEventButton: {
    backgroundColor: '#FE724C', // Change the background color as per your requirement
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  createEventButtonText: {
    color: '#ffffff', // Change the text color as per your requirement
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
