import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Platform,
  View,
  ScrollView,
  CheckBox,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import EditList from './modals/EditList';
import ConfirmDelete from './modals/ConfirmDelete';
import NewItem from './modals/NewItem';
import EditItem from './modals/EditItem';
const url = 'http://192.168.1.67:3000/';

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id: '',
      items: [],
      listModalVisibility: false,
      deleteConfirmModalVisibility: false,
      newItemModalVisibility: false,
      itemModalVisibility: false,
      focusedItem: {},
      deleteType: ''
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'List ID');
    const nameParam = navigation.getParam('name', 'List Name');
    const itemsParam = navigation.getParam('items', []);
    return this.setState({
      id : id,
      name: nameParam,
      items: itemsParam
    });
  }

  openListModal(e) {
    this.setState({
      listModalVisibility: true
    })
  }

  closeListModal(e) {
    this.setState({
      listModalVisibility: false
    })
  }

  updateList(e) {
    const options = {
      name: e.name,
      date: e.date,
    }
    fetch(`${url}lists/${this.state.id}/update`, {
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
        name: response.data.name,
      })
      this.closeListModal(e)
    })
  }

  confirmDeleteList(e) {
    this.setState({
      listModalVisibility: false,
      deleteConfirmModalVisibility: true,
      deleteType: 'list'
    })
  }

  closeConfirmDeleteModal(e) {
    this.setState({
      deleteConfirmModalVisibility: false,
      deleteType: ''
    })
  }

  deleteListConfirmed(e) {
    fetch(`${url}lists/${this.state.id}/destroy`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }
      }
    )
    .then((res) => {
      return res.json()
    })
    .then((response) => {
      const {navigation} = this.props;
      navigation.state.params.handleDeleteList(this.state.id)
      navigation.popToTop()
      this.closeConfirmDeleteModal(e)
    })
  }

  newItem(e) {
    this.setState({
      newItemModalVisibility: true
    })
  }

  closeNewItemModal(e) {
    this.setState({
      newItemModalVisibility: false
    })
  }

  createItem(e) {
    const options = {
      name: e.name,
      quantity: e.quantity,
    }
    fetch(`${url}lists/${this.state.id}/items/create`, {
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
      console.log(response)
      this.setState({
        items: this.state.items.concat(response.data)
      })
      this.closeNewItemModal(e)
    })
  }

  toggleCheckBox(e, itemId) {
    this.setPurchaseStatus(e, itemId)
  }

  setPurchaseStatus(e, itemId) {
    const newItems = this.state.items;
    let endpoint = '';
    if (e) {
      endpoint = 'purchaseStatusTrue';
    } else {
      endpoint = 'purchaseStatusFalse';
    }
    newItems.forEach((item) => {
      if(item._id === itemId) {
        item.purchaseStatus = e;
        return (
          fetch(`${url}lists/${this.state.id}/items/${itemId}/${endpoint}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              }
            }
          )
          .then((res) => {
            return res.json()
          })
          .then((response) => {
            this.setState({
              items: newItems
            })
          })
          .catch((err) => {
            console.log(err)
          })
        )
      }
    })
  }

  openItemModal(e, item) {
    this.setState({
      itemModalVisibility: true,
      focusedItem: item
    })
  }

  closeItemModal(e) {
    this.setState({
      itemModalVisibility: false,
      focusedItem: {}
    })
  }

  updateItem(e) {
    const options = {
      name: e.name,
      quantity: e.quantity,
    }
    fetch(`${url}lists/${this.state.id}/items/${e.id}/update`, {
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
      console.log(response.data)
      const newItems = this.state.items;
      newItems.forEach((item) => {
        if (item._id === response.data._id) {
          item.name = response.data.name;
          item.quantity = response.data.quantity;
        }
      })
      this.setState({
        items: newItems
      })
      this.closeItemModal(e)
    })
  }

  confirmDeleteItem(e) {
    this.setState({
      itemModalVisibility: false,
      deleteConfirmModalVisibility: true,
      deleteType: 'item'
    })
  }

  deleteItemConfirmed(e) {
    fetch(`${url}lists/${this.state.id}/items/${this.state.focusedItem._id}/destroy`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }
      }
    )
    .then((res) => {
      return res.json()
    })
    .then((response) => {
      console.log(response.data)
      const newItems = this.state.items.filter((item) => {
        return item._id !== response.data
      })
      this.setState({
        items: newItems
      })
      this.closeConfirmDeleteModal(e)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <EditList
          listModalVisibility = {this.state.listModalVisibility}
          closeListModal = {(e) => {this.closeListModal(e)}}
          name = {this.state.name}
          updateList = {(e) => {this.updateList(e)}}
          confirmDeleteList = {(e) => {this.confirmDeleteList(e)}}
          />
        <ConfirmDelete
          deleteConfirmModalVisibility = {this.state.deleteConfirmModalVisibility}
          closeConfirmDeleteModal = {(e) => {this.closeConfirmDeleteModal(e)}}
          deleteListConfirmed = {(e) => {this.deleteListConfirmed(e)}}
          deleteItemConfirmed = {(e) => {this.deleteItemConfirmed(e)}}
          type = {this.state.deleteType}
          />
        <NewItem
          newItemModalVisibility = {this.state.newItemModalVisibility}
          closeNewItemModal = {(e) => {this.closeNewItemModal(e)}}
          createItem = {(e) => {this.createItem(e)}}
          />
        <EditItem
          itemModalVisibility = {this.state.itemModalVisibility}
          closeItemModal = {(e) => {this.closeItemModal(e)}}
          item = {this.state.focusedItem}
          updateItem = {(e) => {this.updateItem(e)}}
          confirmDeleteItem = {(e) => {this.confirmDeleteItem(e)}}
          />
        <ScrollView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {this.state.name}
            </Text>
            <TouchableOpacity onPress={(e) => {this.openListModal(e)}}>
              <Ionicons
                name={
                  Platform.OS === 'ios'
                  ? `ios-create${focused ? '' : '-outline'}`
                  : 'md-create'
                }
                size={26}
                color='rgba(96,100,109, 1)'
                style={{ marginBottom: -3, marginRight: 12 }}
              />
            </TouchableOpacity>
          </View>
          {
            this.state.items.map((item) => {
              return (
                <View style={styles.itemContainer} key={item._id}>
                  <View style={styles.checkBoxContainer}>
                    <CheckBox value={item.purchaseStatus} onValueChange={(e) => {this.toggleCheckBox(e, item._id)}}></CheckBox>
                  </View>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemText}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.itemQtyContainer}>
                    <Text style={styles.itemText}>
                      qty: {item.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={(e) => {this.openItemModal(e, item)}}>
                    <Ionicons
                      name={
                        Platform.OS === 'ios'
                        ? `ios-create${focused ? '' : '-outline'}`
                        : 'md-create'
                      }
                      size={26}
                      color='rgba(96,100,109, 1)'
                      style={{ marginBottom: -3, marginRight: 12 }}
                    />
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
        <TouchableNativeFeedback
          onPress={(e) => this.newItem(e)}
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
                Add Item
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
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
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'rgba(96,100,109, 0.1)'
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(96,100,109, 0.5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 28,
    textAlign: 'left',
  },
  itemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(96,100,109, 0.5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  checkBoxContainer: {
    width: 50
  },
  itemNameContainer: {
    width: 220
  },
  itemQtyContainer: {
    width: 80
  },
  itemText: {
    fontSize: 18,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 28,
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
