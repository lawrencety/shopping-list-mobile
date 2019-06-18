import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      items: []
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const nameParam = navigation.getParam('name', 'List Name');
    const itemsParam = navigation.getParam('items', 'No items');
    this.setState({
      name: nameParam,
      items: itemsParam
    })
  }

  navigationOptions() {
    title: this.state.name
  }

  render() {
    const {navigation} = this.props;
    const name = navigation.getParam('name', 'List Name');
    const items = navigation.getParam('items', []);
    return (
      <ScrollView style={styles.container}>
        <Text>{this.state.name}</Text>
        <Text>{JSON.stringify(items)}</Text>
      </ScrollView>
    );
  }
}

ListScreen.navigationOptions = {
  headerStyle: {
      backgroundColor: Colors.tintColor
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
