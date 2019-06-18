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


class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lists: [],
    }
  }

  componentDidMount() {
    const url = 'http://10.0.2.2:3000/lists';
    return fetch(url)
    .then((res) => {
      res.json()
    })
    .then((response) => {
      console.log('Success', JSON.stringify(response))
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        lists: [
          {_id: 123 ,name: 'July 4th', items: [
            {_id: 123 ,name: 'Hot dogs', quantity: 10, purchaseStatus: true},
            {_id: 234 ,name: 'Burgers', quantity: 10, purchaseStatus: false},
          ]},
          {_id: 456, name: 'Christmas', items: [
            {_id: 555 ,name: 'Sugar cookies', quantity: 30, purchaseStatus: true},
            {_id: 567 ,name: 'Pot Roast', quantity: 1, purchaseStatus: false},
          ]}]
      })
    })
  }

  setPurchaseStatus(e, listId, itemId) {
    const newLists = this.state.lists;
    newLists.forEach((list) => {
      if (list._id === listId) {
        list.items.forEach((item) => {
          if(item._id === itemId) {
            item.purchaseStatus = e;
            return (
              this.setState({
                lists: newLists
              })
            )
          }
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {
            this.state.lists.map((list) => {
              return (
                <TouchableNativeFeedback
                  key={list._id}
                  onPress={() => {this.props.navigation.navigate('List', {
                      name: list.name,
                      id: list._id,
                      items: list.items,
                      setPurchaseStatus: this.setPurchaseStatus.bind(this)
                    }
                  )}}
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
  headerStyle: {
      backgroundColor: Colors.tintColor
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'rgba(96,100,109, 0.1)'
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
