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
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  View,
  Linking
} = ReactNative;

import HyperLink from './HyperLink'

import { connect } from "react-redux"
@connect((store) => {
  return {
    animalDbDate: store.settings.animalDbDate
  };
})
class About extends React.Component {
  static navigationOptions= {
    title: '關於'
  }

  render() {
    const { animalDbDate } = this.props;
    return (
      <ScrollView>
{(__DEV__) ? <Text>開發模式</Text> : null}
<Text style={styles.text}>{`* 版本歷史：
0.2.0:
  * 支援CodePush方式更新app。

0.1.0：
  * 第一版。

* 作者的話：
  1. 此app設計主要目的為改善各醫院"即時看診號"網頁的內容呈現，但對內容正確性、即時性一律不負任何責任。若不接受，請勿使用此app。
  2. 因各醫院的"即時看診號"網頁格式不一致，再加上人力有限的情形，所以此app預計只支援有提供以下特定格式"即時看診號"網頁：
    * 所有診間的看診號列於一張網頁。
    * 以表格形式呈現。
    * 可由單一網址公開存取。(不可要求輸入任何登入資訊)
  其餘網頁格式未來可能會以原網頁的方式呈現。
  3. 若想建議本app支援更多醫院，請先查明第2點所述之限制。若符合其要求，請來信至作者信箱，就有機會加入此app。
  `}</Text>
        <Text />
        <Text style={styles.text}>* 作者：Meng-Yuan Huang</Text>
        <Text style={styles.text}>* 作者信箱：<HyperLink>mailto:myhDev@live.com</HyperLink></Text>
      </ScrollView>
    );
  }
  /*
        <Text>* App開放原始碼：<HyperLink>https://github.com/MrMYHuang/taa</HyperLink></Text>
        <Text>* 版權宣告：</Text>
        <Text>  動物資料來源：<HyperLink>http://data.gov.tw/node/9842</HyperLink></Text>
        <Text>  動物資料庫下載日期：{animalDbDate}</Text>
        <Text>  Logo來源：<HyperLink>http://www.freepik.com</HyperLink></Text>*/
}

var styles = StyleSheet.create({
  text: {
    fontSize: 24
  },
  imgContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
  }
});

module.exports = About;
