import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

class ListScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>

      </ScrollView>
    );
  }
}

export default ListScreen;

ListScreen.navigationOptions = {
  header: 'List',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
