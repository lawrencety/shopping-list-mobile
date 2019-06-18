import React from 'react';
import {
  View,
  ScrollView,
  CheckBox,
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
    const itemsParam = navigation.getParam('items', []);
    console.log(nameParam);
    console.log(itemsParam)
    this.setState({
      name: nameParam,
      items: itemsParam
    });
  }

  toggleCheckBox(e, listId, itemId) {
    const {navigation} = this.props;
    console.log(navigation);
    return navigation.state.params.setPurchaseStatus(e, listId, itemId);
  }

  render() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'List ID');
    const name = navigation.getParam('name', 'List Name');
    const items = navigation.getParam('items', []);
    return (
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {this.state.name}
          </Text>
        </View>
        {
          items.map((item) => {
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
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'rgba(96,100,109, 0.1)'
  },
  headerContainer: {
    alignItems: 'stretch',
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
});
