/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule AnimalsAdoptionApp
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');

var nativeImageSource = require('nativeImageSource');
var {
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  View,
} = ReactNative;

var AnimalScreen = require('./AnimalScreen');
var ListScreen = require('./ListScreen');
var About = require('./About');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'search') {
    return (
      <ListScreen navigator={navigationOperations} />
    );
  }
  else if (route.name === 'about') {
    return (
      <View style={{flex: 1}}>
        <About
          style={{flex: 1}}
          navigator={navigationOperations}
          animal={route.animal}
        />
      </View>
      )
  } else if (route.name === 'animal') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={nativeImageSource({
            android: 'android_back_white',
            width: 96,
            height: 96
          })}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.animal.title} />
        <AnimalScreen
          style={{flex: 1}}
          navigator={navigationOperations}
          animal={route.animal}
        />
      </View>
    );
  }
};

class AnimalsAdoptionApp extends React.Component {
  render() {
    var initialRoute = {name: 'search'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});

AppRegistry.registerComponent('taa', () => AnimalsAdoptionApp);

module.exports = AnimalsAdoptionApp;
