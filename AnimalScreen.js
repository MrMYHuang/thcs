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
  TouchableHighlight,
} = ReactNative;

import styles from './styles'

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
    const { contentFontSize } = this.props.store.settings
    const { clinics, clinicNoSel, dbUpdateDate } = this.props.store.tmpSettings
    const { updateDb } = this.props.navigation.state.params;

    var rows = [];
    for (var c = 0; c < clinics.length; c++) {
      if (clinics[c].clinicNo == clinicNoSel) {
        for (var i = 0; i < keys.length; i++) {
          rows.push(<Text key={i} style={{ fontSize: contentFontSize }}> {dispFields[i] + "：" + clinics[c][keys[i]]}</Text>);
        }
        break
      }
    }

    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Text style={styles.updateDate}>上次更新：{dbUpdateDate}</Text>
        <View style={{ flex: 1 }}>
          {rows}
        </View>
        <TouchableHighlight style={styles.button}
          onPress={updateDb}>
          <Text style={styles.text}>刷新</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

module.exports = AnimalScreen;
