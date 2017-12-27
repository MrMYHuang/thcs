var CountyScreen = require('./CountyScreen');
var ListScreen = require('./ListScreen');
var DetailScreen = require('./DetailScreen');

import {
    StackNavigator
  } from 'react-navigation';

const HomeScreen = StackNavigator ({
    County: {screen: CountyScreen},
    List: { screen: ListScreen },
    Detail: {screen: DetailScreen}
  }, {
    navigationOptions: {
      title: '首頁'
    },
      
    lazy: true
  });

module.exports = HomeScreen
