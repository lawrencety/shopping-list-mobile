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

class NewList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      date: ''
    }
  }

  handleChange(e, prop) {
    this.setState({ [prop]: e });
  }

  handleClick(e) {
    const options = {
      name: this.state.name,
      date: this.state.date
    }
    this.props.createList(options)
  }

  closeModal(e) {
    this.props.hideModal(e)
  }

  render() {
    return (
        <KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            behavior='padding'
            visible={this.props.modalVisibility}
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
                      New List
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder='List Name'
                      placeholderTextColor='rgba(96,100,109, 0.6)'
                      value={this.state.name}
                      style={styles.inputText}
                      onChangeText={(e) => {this.handleChange(e, 'name')}}
                    >
                    </TextInput>
                  </View>
                  <Button
                    title='Create List'
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

export default NewList;

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
