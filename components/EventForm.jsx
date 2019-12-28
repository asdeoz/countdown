import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useTheme } from 'react-navigation';

import DateTimePickerModal from './DateTimePickerModal';
import { formatDateTime } from '../api';

export default function EventForm({ navigation }) {
  const styles = StyleSheet.create({
    fieldContainer: {
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#FFFFFF',
    },
    text: {
      height: 40,
      margin: 0,
      marginRight: 7,
      paddingLeft: 10,
    },
    button: {
      height: 50,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      alignSelf: 'stretch',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    borderTop: {
      borderColor: '#EDEEEF',
      borderTopWidth: 1,
    },
  });

  const isDarkMode = useTheme() === 'dark';

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddPress = () => {
    navigation.navigate('List');
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDatePicked = (date) => {
    setEventDate(date);
  };

  const handleDatePickerHide = () => {
    setShowDatePicker(false);
  };

  return (
    <View
      style={{ flex: 1 }}
    >
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.text}
          placeholder="Event title"
          spellCheck={false}
          onChangeText={setEventTitle}
          value={eventTitle}
        />
        <TextInput
          style={[styles.text, styles.borderTop]}
          placeholder="Event date"
          spellCheck={false}
          value={formatDateTime(eventDate.toString())}
          editable={!showDatePicker}
          onFocus={handleDatePress}
        />
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="datetime"
          onConfirm={handleDatePicked}
          onClose={handleDatePickerHide}
          value={eventDate}
          useDarkMode={isDarkMode}
        />
      </View>
      <TouchableHighlight
        onPress={handleAddPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
}
