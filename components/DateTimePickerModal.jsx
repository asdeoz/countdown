import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

export default function DateTimePickerModal({
  value,
  mode,
  isVisible,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onClose,
  useDarkMode,
}) {
  const defaultOps = {
    titleText: 'Pick a date',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
  };

  const isDarkMode = !!useDarkMode;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#222222' : '#FFFFFF',
    },
    textContainer: {
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
    },
    titleText: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    datePickerContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      color: '#48BBEC',
      padding: 10,
    },
    cancelButton: {
      color: '#AC4E5C',
    },
  });

  const initialDate = value || new Date();
  const [dateValue, setDateValue] = useState(initialDate);

  const handleConfirm = (date) => {
    onConfirm(date);
    onClose();
  };

  const handleCancel = () => {
    setDateValue(initialDate);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            {title || defaultOps.titleText}
          </Text>
        </View>
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={dateValue}
            onChange={(e, d) => setDateValue(d)}
            mode={mode || 'date'}
            display="default"
          />
        </View>
        <View style={styles.textContainer}>
          <TouchableHighlight
            onPress={() => handleConfirm(dateValue)}
          >
            <Text style={styles.buttonText}>
              {confirmText || defaultOps.confirmButtonText}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.textContainer}>
          <TouchableHighlight
            onPress={handleCancel}
          >
            <Text style={[styles.buttonText, styles.cancelButton]}>
              {cancelText || defaultOps.cancelButtonText}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

DateTimePickerModal.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  mode: PropTypes.string,
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  useDarkMode: PropTypes.bool,
};
