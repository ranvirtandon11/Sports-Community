import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const ProfileImage = require("./assets/avatar.jpg");

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const navigation = useNavigation();
  const [hovered, setHovered] = useState(null);

  const goToProfile = () => {
    navigation.navigate('Profile'); // Navigate to the profile page
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
          <MaterialCommunityIcons name="soccer" size={50} color="#FF6347" />
          <Text style={styles.iconLabel}>Football</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Basketball' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Basketball')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="basketball" size={50} color="#1E90FF" />
          <Text style={styles.iconLabel}>Basketball</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Tennis' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Tennis')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="tennis" size={50} color="#32CD32" />
          <Text style={styles.iconLabel}>Tennis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Volleyball' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Volleyball')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="volleyball" size={50} color="#FFD700" />
          <Text style={styles.iconLabel}>Volleyball</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Badminton' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Badminton')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="badminton" size={50} color="#FF1493" />
          <Text style={styles.iconLabel}>Badminton</Text>
        </TouchableOpacity>
        {/* Five more sports */}
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Golf' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Golf')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="golf" size={50} color="#008000" />
          <Text style={styles.iconLabel}>Golf</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Swimming' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Swimming')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="swim" size={50} color="#0000FF" />
          <Text style={styles.iconLabel}>Swimming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Cycling' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Cycling')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="bike" size={50} color="#FFA500" />
          <Text style={styles.iconLabel}>Cycling</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Running' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Running')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="run" size={50} color="#FF0000" />
          <Text style={styles.iconLabel}>Running</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconItem, hovered === 'Cricket' && styles.iconItemHovered]}
          onPressIn={() => setHovered('Cricket')}
          onPressOut={() => setHovered(null)}
        >
          <MaterialCommunityIcons name="cricket" size={50} color="#FFFF00" />
          <Text style={styles.iconLabel}>Cricket</Text>
        </TouchableOpacity>
      </View>
      {/* Add your home content here */}
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
  iconLabel: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomePage;
