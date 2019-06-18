import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lists: [],
    }
  }

  componentDidMount() {
    const url = '//localhost:3000/lists';
    fetch(url)
    .then((res) => {
      res.json()
    })
    .then((response) => {
      console.log('Success', JSON.stringify(response))

    })
    this.setState({
      lists: [
        {_id: 123 ,name: 'July 4th', items: [
          {name: 'Hot dogs', quantity: 10},
          {name: 'Burgers', quantity: 10},
        ]},
        {_id: 456, name: 'Christmas', items: [
          {name: 'Sugar cookies', quantity: 30},
          {name: 'Pot Roast', quantity: 1},
        ]}]
    })
  }

  selectList(e) {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            My Lists
          </Text>
        </View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {
            this.state.lists.map((list) => {
              return (
                <TouchableNativeFeedback
                  key={list._id}
                  onPress={() => this.props.navigation.navigate('List')}
                  background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
                >
                  <View style={styles.listContainer}>
                    <Text style={styles.listText}>{list.name}</Text>
                  </View>
                </TouchableNativeFeedback>
              )
            })
          }
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableNativeFeedback
            onPress={(e) => this.newList(e)}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
          >
            <View>
              <Text style={styles.footerText}>
                New List
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'My Lists',
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'rgba(96,100,109, 0.1)'
  },
  headerContainer: {
    height: 66,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 10,
    backgroundColor: Colors.tintColor,
    borderBottomColor: 'rgba(96,100,109, 1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  listContainer: {
    alignItems: 'stretch',
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(96,100,109, 0.5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listText: {
    fontSize: 18,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
  footerContainer: {
    height: 44,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 20,
    color: Colors.tintColor,
    lineHeight: 24,
    textAlign: 'left',
  },
});
