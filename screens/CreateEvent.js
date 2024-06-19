import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Config';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Calendar } from 'react-native-calendars';

const CreateEvent = ({ route, navigation }) => {
  const { sport } = route.params;
  const [stadiumName, setStadiumName] = useState('');
  const [stadiumInfo, setStadiumInfo] = useState('');
  const [matchStartTime, setMatchStartTime] = useState('');
  const [matchEndTime, setMatchEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [directions, setDirections] = useState('');
  const [stadiumImage, setStadiumImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setStadiumImage(result.assets[0].uri);
    }
  };

  const handleCreateEvent = async () => {
    if (!stadiumName || !stadiumInfo || !matchStartTime || !matchEndTime || !selectedDate || !stadiumImage || !directions) {
      Alert.alert('Error', 'Please fill all the fields, select a date, and choose an image.');
      return;
    }

    setUploading(true);
    try {
      const storage = getStorage();
      const response = await fetch(stadiumImage);
      const blob = await response.blob();
      const imageRef = ref(storage, `images/${Date.now()}_${stadiumName}`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'events'), {
        sport,
        stadiumName,
        stadiumInfo,
        matchStartTime,
        matchEndTime,
        matchDate: selectedDate,
        stadiumImage: imageUrl,
        directions,
      });

      Alert.alert('Success', 'Event created successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating event: ', error);
      Alert.alert('Error', 'There was an error creating the event. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Create Event for {sport}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Stadium Name"
            value={stadiumName}
            onChangeText={setStadiumName}
          />
          <TextInput
            style={styles.input}
            placeholder="Stadium Info"
            value={stadiumInfo}
            onChangeText={setStadiumInfo}
          />
          <TextInput
            style={styles.input}
            placeholder="Match Start Time"
            value={matchStartTime}
            onChangeText={setMatchStartTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Match End Time"
            value={matchEndTime}
            onChangeText={setMatchEndTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Add Directions"
            value={directions}
            onChangeText={setDirections}
          />
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          </TouchableOpacity>
          {stadiumImage && <Image source={{ uri: stadiumImage }} style={styles.imagePreview} />}
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowCalendar(!showCalendar)}>
            <Text style={styles.datePickerButtonText}>Select Date</Text>
          </TouchableOpacity>
          {selectedDate ? <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text> : null}
          {showCalendar && (
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#FE724C' },
              }}
              style={styles.calendar}
            />
          )}
          {uploading ? (
            <TouchableOpacity style={[styles.createButton, styles.disabledButton]} disabled>
              <Text style={styles.createButtonText}>Uploading...</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
              <Text style={styles.createButtonText}>Create Event</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topBar: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  imagePicker: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
  },
  datePickerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDateText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#FE724C',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default CreateEvent;
