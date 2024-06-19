import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ProfileImage from '../assets/avatar.jpg';
import FootballImage from '../assets/football.png';
import BasketballImage from '../assets/basketball.png';
// import other sports images similarly

const HomePage = ({ navigation }) => {
  const [hovered, setHovered] = useState(null);

  const goToProfile = () => {
    navigation.navigate('Profile'); // Navigate to the profile page
  };

  const goToPitches = (sport) => {
    navigation.navigate('Pitches', { sport }); // Navigate to the Pitches page
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
          onPress={() => goToPitches('Football')}
        >
          <Image source={FootballImage} style={styles.sportIcon} />
          <Text style={styles.iconLabel}>Football</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Basketball' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Basketball')}
          onPressOut={() => setHovered(null)}
          onPress={() => goToPitches('Basketball')}
        >
          <Image source={BasketballImage} style={styles.sportIcon} />
          <Text style={styles.iconLabel}>Basketball</Text>
        </TouchableOpacity>
        {/* Add TouchableOpacity components for other sports similarly */}
      </View>
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
    width: '30%',
  },
  iconItemHovered: {
    borderRadius: 50,
    backgroundColor: 'rgba(254, 114, 76, 1)',
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
});

export default HomePage;
