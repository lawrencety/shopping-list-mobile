import React from 'react';
import { ExpoConfigView } from '@expo/samples';

class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render() {
    return <ExpoConfigView />;
  }
}

export default SettingsScreen;

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
