/**
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
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var getStyleFromScore = require('./getStyleFromScore');
var getTextFromScore = require('./getTextFromScore');


var dispFields = ["診間", "科別", "醫生", "看診號"]

var keys = ["clinicNo", "division", "doctor", "visitNo"]

import { connect } from "react-redux"
@connect((store) => {
  return {
    store: store
  };
})
class AnimalScreen extends React.Component {
  static navigationOptions = {
    headerTitle: '詳細資訊'
  }
  
  render() {
    const {contentFontSize} = this.props.store.settings
    const {state} = this.props.navigation;
    var rows = [];
    for (var i = 0; i < keys.length; i++) {
      rows.push(<Text key={i} style={{fontSize: contentFontSize}}> {dispFields[i] + "：" + state.params.animal[keys[i]]}</Text>);
    }

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.rightPane}>
          {rows}
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  mainSection: {
    flex: 2,
  },
  detailsImage: {
    height: 300,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1
  },
  text: {
    fontSize: 64
  }
});

module.exports = AnimalScreen;
