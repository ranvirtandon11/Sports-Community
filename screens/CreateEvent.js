import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Calendar } from 'react-native-calendars';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../Config';

const CreateEvent = ({ navigation }) => {
  const [stadiumImage, setStadiumImage] = useState(null);
  const [stadiumName, setStadiumName] = useState(''); // New state for stadium name
  const [stadiumInfo, setStadiumInfo] = useState('');
  const [matchStartTime, setMatchStartTime] = useState('');
  const [matchEndTime, setMatchEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleShow = async () => {
    navigation.navigate('FootballPitches')
  }

  const handleSubmit = async () => {
    if (!stadiumImage || !stadiumName || !stadiumInfo || !matchStartTime || !matchEndTime || !selectedDate) {
      alert('Please fill out all fields and upload an image.');
      return;
    }

    setUploading(true);

    try {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${new Date().toISOString()}_${stadiumImage.split('/').pop()}`);
      const img = await fetch(stadiumImage);
      const bytes = await img.blob();

      await uploadBytes(imageRef, bytes);
      const imageUrl = await getDownloadURL(imageRef);

      const docRef = await addDoc(collection(db, 'events'), {
        stadiumImage: imageUrl,
        stadiumName, // Include stadium name in the document
        stadiumInfo,
        matchStartTime,
        matchEndTime,
        selectedDate,
      });

      console.log('Event added with ID: ', docRef.id);
      setStadiumImage(null);
      setStadiumName(''); // Reset stadium name state
      setStadiumInfo('');
      setMatchStartTime('');
      setMatchEndTime('');
      setSelectedDate('');
     
    } catch (error) {
      console.error('Error adding event: ', error);
    }

    setUploading(false);
  };

  const handleImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setStadiumImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const handleDateSelect = day => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Stadium Image</Text>
      <TouchableOpacity style={styles.imageUploadContainer} onPress={handleImageUpload}>
        {stadiumImage ? (
          <Image source={{ uri: stadiumImage }} style={styles.stadiumImage} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload image</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Stadium Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stadium name"
        value={stadiumName}
        onChangeText={text => setStadiumName(text)}
      />
      <Text style={styles.label}>Stadium Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stadium information"
        value={stadiumInfo}
        onChangeText={text => setStadiumInfo(text)}
      />
      <Text style={styles.label}>Match Start Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter match start time"
        value={matchStartTime}
        onChangeText={text => setMatchStartTime(text)}
      />
      <Text style={styles.label}>Match End Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter match end time"
        value={matchEndTime}
        onChangeText={text => setMatchEndTime(text)}
      />
      <Text style={styles.label}>Select Date</Text>
      <TouchableOpacity style={styles.calendarInput} onPress={() => setShowCalendar(true)}>
        <Text style={styles.calendarText}>
          {selectedDate ? selectedDate : 'Tap to select date'}
        </Text>
      </TouchableOpacity>
      {showCalendar && (
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{ [selectedDate]: { selected: true } }}
          style={styles.calendar}
        />
      )}
      <TouchableOpacity style={styles.createEventButton} onPress={handleSubmit} disabled={uploading}>
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Event</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.createEventButton} onPress={handleShow}>
        <Text style={styles.buttonText}>Show</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imageUploadContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  stadiumImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  uploadText: {
    color: 'blue',
    fontSize: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  calendarInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  calendarText: {
    fontSize: 16,
  },
  calendar: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  createEventButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10, // Add marginBottom to separate the buttons
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CreateEvent;
