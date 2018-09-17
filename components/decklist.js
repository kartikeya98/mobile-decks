import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { getDecks, clearStorage } from '../utils/api';
import { AppLoading } from 'expo';
import Deck from './Deck';

export default class DeckList extends Component {
  state = { 
    ready: false,
     decks: {} };
  componentDidMount() {
    getDecks()
      .then(results => {
        this.setState({ decks: results });
      })
      .then(() =>
        this.setState(() => ({
          ready: true
        }))
      );
      //  clearStorage();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      getDecks().then(results => {
        this.setState({ decks: results });
      });
    }
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DeckView', { deck: item })
        }>
        <Deck deck={item} />
      </TouchableOpacity>
    );
  };
  render() {
    const { ready, decks } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }
    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No Flashcards are Available</Text>
        </View>
      );
    }
    const data = Object.values(decks);

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  title: {
    fontSize: 24
  }
});
