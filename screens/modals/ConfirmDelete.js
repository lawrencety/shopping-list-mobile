import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableHighlight,
  Platform,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import Colors from '../../constants/Colors';

class ConfirmDeleteList extends React.Component {
  constructor(props) {
    super(props)

  }

  handleClick(e) {
    if (this.props.type === 'list') {
      this.props.deleteListConfirmed(e)
    } else if (this.props.type === 'item') {
      this.props.deleteItemConfirmed(e)
    }
  }

  closeModal(e) {
    this.props.closeConfirmDeleteModal(e)
  }

  render() {
    return (
        <KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            behavior='padding'
            visible={this.props.deleteConfirmModalVisibility}
            onRequestClose={(e) => {this.closeModal(e)}}
          >
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>
                    Confirm Delete
                  </Text>
                </View>
                <View style={styles.formContainer}>
                  <Button
                    title='Cancel'
                    color={Colors.tintColor}
                    onPress={(e) => {this.closeModal(e)}}
                    />
                  <Button
                    title='Confirm Delete'
                    color={Colors.errorBackground}
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

export default ConfirmDeleteList;

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
    padding: 20,
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
