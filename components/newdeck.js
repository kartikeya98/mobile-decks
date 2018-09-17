import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers';
import { white,black } from '../utils/colors';
import {  addDeck } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class NewDeck extends Component {
  state = {
    title: ''
  };
  toDeck = (deck) => {
   
    this.props.navigation.navigate('DeckView', {
      deck: deck
    });
  }


  submit = () => {
    const { title } = this.state;
if(title === '')
{

  alert('please enter the field');

}
else {
      const id = title.toLocaleLowerCase()
    const item = { 
      [id] : { title: title, questions: [] }
}
const idx = 0;
var deck = Object.values(item)[idx]

   

    addDeck(item)
      .then(() => {
        
        return this.toDeck(deck);
      })
    
    

    this.setState({ title: '' });


    clearLocalNotification()
    .then(setLocalNotification)
     this.props.navigation.navigate('NewDeck');

    }

  };
  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text> What is the Title for your new Deck?</Text>
        <TextInput
          placeholder="FlashCard Topic"
          style={styles.input}
          value={title}
          onChangeText={title => this.setState({ title })}
        />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  input: {
    width: 200,
    height: 44,
    padding: 0,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50
  },
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
});
export default NewDeck;
