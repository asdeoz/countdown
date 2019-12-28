import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import useInterval from '../UseInterval';
import EventCard from './EventCard';

import { getEvents } from '../api';

export default function EventList({ navigation }) {
  const styles = StyleSheet.create({
    list: {
      flex: 1,
      paddingTop: 5,
      backgroundColor: '#A1A1A1',
    },
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(events => setEvents(events));
  }, []);

  useInterval(() => {
    setEvents(events => (
      events.map(e => ({
        ...e,
        timer: Date.now(),
      }))
    ));
  }, 1000);

  const handlePress = () => {
    navigation.navigate('Form');
  }

  return [
    <FlatList
      key="flatlist"
      style={styles.list}
      data={events}
      renderItem={({ item }) => <EventCard event={item} />}
      keyExtractor={ item => item.id}
    />,
    <ActionButton
      key="fab"
      onPress={handlePress}
      buttonColor="rgba(231, 76, 60, 1)"
    />
  ];
}
