var CountyScreen = require('./CountyScreen');
var ListScreen = require('./ListScreen');
var AnimalScreen = require('./AnimalScreen');

import {
    StackNavigator
  } from 'react-navigation';

const HomeScreen = StackNavigator ({
    County: {screen: CountyScreen},
    List: { screen: ListScreen },
    Animal: {screen: AnimalScreen}
  }, {
    navigationOptions: {
      title: '首頁'
    },
      
    lazy: true
  });

module.exports = HomeScreen
