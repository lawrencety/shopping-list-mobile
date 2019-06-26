import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
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
import NewList from './modals/NewList';
import io from 'socket.io-client';
const url = 'https://simplist-api.appspot.com/';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lists: [],
      modalVisibility: false
    }

    this.socket = io(`${url}`)
    this.listenToSocket(this.socket)

  }

  componentDidMount() {
    return fetch(`${url}lists`)
    .then((res) => {
      return res.json()
    })
    .then((response) => {
      this.setState({
        lists: response.data
      })
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
          ]}
        ]
      })
    })
  }

  listenToSocket(socket) {
    socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    socket.on('newList', (newList) => {
      let existingList = this.state.lists.filter((list) => {
        return list._id === newList.id
      })

      if (existingList.length === 0) {
        this.setState({
          lists: this.state.lists.concat(newList)
        })
      } else {
        console.log('Already added')
      }
    })

    socket.on('list', (updatedList) => {
      let newLists = this.state.lists;
      let index = newLists.findIndex((list) => {
        return list._id === updatedList._id
      });

      if (index !== -1) {
        console.log('Updating list');
        newLists[index] = updatedList;
        this.setState({
          lists: newLists
        })
      } else {
        console.log('List does not exist, adding list');
        this.setState({
          lists: this.state.lists.concat(updatedList)
        })
      }
    })

    socket.on('deleteList', (listId) => {
      let newLists = this.state.lists.filter((list) => {
        return (list._id !== listId)
      })
      this.setState({
        lists: newLists
      })
    })

    socket.on('newItem', (item) => {
      this.refreshComponent()
    })

    socket.on('item', (item) => {
      this.refreshComponent()
    })

    socket.on('deleteItem', (item) => {
      this.refreshComponent()
    })
  }

  refreshComponent() {
    return fetch(`${url}lists`)
    .then((res) => {
      return res.json()
    })
    .then((response) => {
      this.setState({
        lists: response.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  newList(e) {
    this.setState({
      modalVisibility: true
    })
  }

  hideModal(e) {
    this.setState({
      modalVisibility: false
    })
  }

  createList(e) {
    const options = {
      name: e.name,
      date: e.date,
    }
    fetch(`${url}lists/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
      }
    )
    .then((res) => {
      return res.json()
    })
    .then((response) => {
      this.setState({
        lists: this.state.lists.concat(response.data)
      })
      this.hideModal(e)
      this.socket.emit('addedList', response.data)
    })
  }

  handleDeleteList(e) {
    const newLists = this.state.lists.filter((list) => {
      return list._id !== e
    })
    this.setState({
      lists: newLists
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NewList
          modalVisibility= {this.state.modalVisibility}
          hideModal= {(e) => {this.hideModal(e)}}
          createList= {(e) => {this.createList(e)}}
          />
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
                      handleDeleteList: (e) => this.handleDeleteList(e),
                      socket: this.socket
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
        <TouchableNativeFeedback
          onPress={(e) => {this.newList(e)}}
          background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
        >
          <View style={styles.footerContainer}>
            <View style={styles.addNewContainer}>
              <Ionicons
                name={
                  Platform.OS === 'ios'
                  ? `ios-add${focused ? '' : '-outline'}`
                  : 'md-add'
                }
                size={24}
                color={Colors.tintColor}
                style={{ paddingRight: 10 }}
              />
              <Text style={styles.footerText}>
                New List
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Lists',
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
  addNewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  footerText: {
    fontSize: 20,
    color: Colors.tintColor,
    lineHeight: 24,
    textAlign: 'left',
  },
});
