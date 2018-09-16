import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import DeckList from './components/decklist';
import DeckView from './components/deckview';
import NewDeck from './components/newdeck';
import NewCard from './components/newcard';
import Quiz from './components/Quiz';
import { white,black } from './utils/colors';
import { Constants } from 'expo';

function FlashCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.StatusBar }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Deck-List',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'NewDeck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : black,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
) :
 createMaterialTopTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Deck-List',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New-Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : black,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);
const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Flashcard',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 60,
        marginTop: -20
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'New Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 60,
        marginTop: -20
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 60,
        marginTop: -20
      }
    }
  }
});
export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlashCardStatusBar backgroundColor={black} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
