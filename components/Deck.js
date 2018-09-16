import React from 'react';
import { View, Text, StyleSheet,Platform } from 'react-native';
import {white,gray} from '../utils/colors'

export default function Deck({ deck }) {
  const { title, questions } = deck;
  return (
    <View style={styles.deck}>
      <Text style={{fontSize: 40}}>{title}</Text>
      <Text style={{color: gray,fontSize: 20}}>{questions.length} cards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17, 
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
        width: 0,
        height: 3,
    }
  }
});
