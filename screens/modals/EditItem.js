import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Platform,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import Colors from '../../constants/Colors';

class EditItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      name: '',
      quantity: ''
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.item.name !== prevProps.item.name) || (this.props.item.quantity !== prevProps.item.quantity)) {
      this.setState({
        id: this.props.item._id,
        name: this.props.item.name,
        quantity: this.props.item.quantity
      })
    }
  }

  handleChange(e, prop) {
    this.setState({ [prop]: e });
  }

  handleClick(e) {
    const options = {
      id: this.state.id,
      name: this.state.name,
      quantity: this.state.quantity
    }
    this.props.updateItem(options)
  }

  closeModal(e) {
    this.props.closeItemModal(e)
  }

  deleteItem(e) {
    this.props.confirmDelete(e)
  }

  render() {
    return (
        <KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            behavior='padding'
            visible={this.props.itemModalVisibility}
            onRequestClose={(e) => {this.closeModal(e)}}
          >
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                <View style={styles.closeContainer}>
                  <TouchableOpacity onPress={(e) => {this.deleteItem(e)}}>
                    <Ionicons
                      name={
                        Platform.OS === 'ios'
                        ? `ios-trash${focused ? '' : '-outline'}`
                        : 'md-trash'
                      }
                      size={36}
                      color='rgba(96,100,109, 1)'
                      style={{ marginBottom: -3 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => {this.closeModal(e)}}>
                    <Ionicons
                      name={
                        Platform.OS === 'ios'
                        ? `ios-close${focused ? '' : '-outline'}`
                        : 'md-close'
                      }
                      size={36}
                      color='rgba(96,100,109, 1)'
                      style={{ marginBottom: -3 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                      Edit Item
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder='Item Name'
                      placeholderTextColor='rgba(96,100,109, 0.6)'
                      value={this.state.name}
                      style={styles.inputText}
                      onChangeText={(e) => {this.handleChange(e, 'name')}}
                    >
                    </TextInput>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder='Item Quantity'
                      placeholderTextColor='rgba(96,100,109, 0.6)'
                      value={this.state.quantity ? this.state.quantity.toString() : ''}
                      style={styles.inputText}
                      keyboardType='numeric'
                      onChangeText={(e) => {this.handleChange(e, 'quantity')}}
                    >
                    </TextInput>
                  </View>
                  <Button
                    title='Update Item'
                    color={Colors.tintColor}
                    onPress={(e) => {this.handleClick(e)}}
                    />
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
    )
  }
}

export default EditItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(96,100,109, 0.5)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: 180,
    width: 350,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  closeContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: -40,
    justifyContent: 'space-between'
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  headerContainer: {
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 22,
    lineHeight: 24,
    textAlign: 'left',
  },
  inputContainer: {
    padding: 4,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: 'rgba(96,100,109, 1)'
  },
  inputText: {
    fontSize: 18,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
});
