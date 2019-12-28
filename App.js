import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Appearance, AppearanceProvider } from 'react-native-appearance';

import EventList from './components/EventList';
import EventForm from './components/EventForm';

const AppNavigator = createStackNavigator({
  List: {
    screen: EventList,
    navigationOptions: () => ({
      title: 'Your Events',
    }),
  },
  Form: {
    screen: EventForm,
    navigationOptions: () => ({
      title: 'Add an event',
    }),
  },
});

const Navigation = createAppContainer(AppNavigator);

const App = () => {
  let theme = Appearance.getColorScheme();
  console.log(theme);

  return (
    <AppearanceProvider>
      <Navigation theme={theme} />
    </AppearanceProvider>
  );
};

export default App;
