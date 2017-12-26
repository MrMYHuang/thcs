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
  Platform,
  Text,
  Button,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = ReactNative;

import styles from './styles'

var getStyleFromScore = require('./getStyleFromScore');
var getTextFromScore = require('./getTextFromScore');

//var dispFields = ["醫生"]

var keys = ["doctor", 'visitNo']

import { connect } from "react-redux"
@connect((store) => {
  return {
    store: store
  };
})
class AnimalCell extends React.Component {
  render() {
    var { contentFontSize } = this.props.store.settings
    var rows = [];
    for (var i = 0; i < keys.length; i++) {
      rows.push(<Text key={i} style={[{ fontSize: contentFontSize }, styles.itemText]}>{this.props.animal[keys[i]]}</Text>);
    }

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <TouchableElement
        style={{ flex: 3 }}
        onPress={this.props.onSelect}
        onShowUnderlay={this.props.onHighlight}
        onHideUnderlay={this.props.onUnhighlight}>
        <View style={styles.listRow}>
          {rows}
        </View>
      </TouchableElement>
    );
  }
}

module.exports = AnimalCell;
