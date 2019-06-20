import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableHighlight,
  Platform,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import Colors from '../../constants/Colors';

class NewItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      quantity: ''
    }
  }

  handleChange(e, prop) {
    this.setState({ [prop]: e });
  }

  handleClick(e) {
    const options = {
      name: this.state.name,
      quantity: this.state.quantity
    }
    this.props.createItem(options)
  }

  closeModal(e) {
    this.props.closeNewItemModal(e)
  }

  render() {
    return (
        <KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            behavior='padding'
            visible={this.props.newItemModalVisibility}
            onRequestClose={(e) => {this.closeModal(e)}}
          >
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                <View style={styles.closeContainer}>
                  <TouchableHighlight onPress={(e) => {this.closeModal(e)}}>
                    <Ionicons
                      name={
                        Platform.OS === 'ios'
                        ? `ios-close${focused ? '' : '-outline'}`
                        : 'md-close'
                      }
                      size={40}
                      color='rgba(96,100,109, 1)'
                      style={{ marginBottom: -3 }}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                      New Item
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
                      value={this.state.quantity}
                      style={styles.inputText}
                      keyboardType='numeric'
                      onChangeText={(e) => {this.handleChange(e, 'quantity')}}
                    >
                    </TextInput>
                  </View>
                  <Button
                    title='Create Item'
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

export default NewItem;

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
    marginRight: 10,
    marginBottom: -40,
    alignItems: 'flex-end'
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
