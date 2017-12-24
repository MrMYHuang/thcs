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
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = ReactNative;

var getStyleFromScore = require('./getStyleFromScore');
var getTextFromScore = require('./getTextFromScore');


var dispFields = ["醫生"]


var keys = ["doctor"]

import { connect } from "react-redux"
@connect((store) => {
  return {
    store: store
  };
})
class AnimalCell extends React.Component {
  render() {
    var rows = [];
    for (var i = 0; i < keys.length; i++) {
      rows.push(<Text key={i} style={styles.text}>&bull; {dispFields[i] + "：" + this.props.animal[keys[i]]}</Text>);
    }

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 9 }}>
          <TouchableElement
            style={{ flex: 3 }}
            onPress={this.props.onSelect}
            onShowUnderlay={this.props.onHighlight}
            onHideUnderlay={this.props.onUnhighlight}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                {rows}
              </View>
            </View>
          </TouchableElement>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    fontSize: 64
  },
  imgContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 2
  },
  animalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  animalYear: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 100,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

module.exports = AnimalCell;
