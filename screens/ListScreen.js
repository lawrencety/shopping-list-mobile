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
const url = 'http://192.168.1.67:3000/';

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id: '',
      items: [],
      listModalVisibility: false,
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'List ID');
    const nameParam = navigation.getParam('name', 'List Name');
    const itemsParam = navigation.getParam('items', []);
    console.log('Name First', nameParam)
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

  toggleCheckBox(e, listId, itemId) {
    const {navigation} = this.props;
    console.log(this.state.items);
    return navigation.state.params.setPurchaseStatus(e, listId, itemId);
  }

  render() {
    return (
      <View style={styles.container}>
        <EditList
          listModalVisibility = {this.state.listModalVisibility}
          closeListModal = {(e) => {this.closeListModal(e)}}
          name = {this.state.name}
          updateList = {(e) => {this.updateList(e)}}
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
                    <CheckBox value={item.purchaseStatus} onValueChange={(e) => {this.toggleCheckBox(e, id, item._id)}}></CheckBox>
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
                </View>
              )
            })
          }
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableNativeFeedback
            onPress={(e) => this.newItem(e)}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
          >
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
          </TouchableNativeFeedback>
        </View>
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
    alignItems: 'stretch',
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
    width: 250
  },
  itemQtyContainer: {
    width: 100
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
