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

import styles from './styles'
import HyperLink from './HyperLink'

import { connect } from "react-redux"
@connect((store) => {
  return {
    store: store
  };
})
class About extends React.Component {
  static navigationOptions = {
    title: '關於'
  }

  render() {
    return (
      <ScrollView style={{marginLeft: 5, marginRight: 5}}>
<Text style={styles.text}>{`* 版本歷史：
1.5.0 (JS), 1.4.0 (native):
  * 看診室進度列表頁新增"原網頁"按鈕。

1.4.0 (JS), 1.4.0 (native):
  * 修正react-native-code-push 5.2.1 bug，使UWP只能CodePush成功一次。
  * 首頁底部顯示CodePush更新狀態。
  * 新增"亞東紀念醫院"、"中國醫藥大學附設醫院"、"中山醫學大學附設醫院"、"彰化基督教醫院"、"奇美醫院"、"高醫醫院"、"慈濟醫院"。

1.3.0 (JS), 1.2.0 (native):
  * 新增"三軍總醫院台北門診中心"、"萬芳醫院"、"新光吳火獅紀念醫院"。

1.2.0:
  * 支援更多醫院。
  * 修正首頁選單切換縣市造成app閃退的問題。

1.1.0:
  * 新增"上次更新"時間。
  * 首頁選單支援記憶功能。
  * 改善UI排版。

1.0.0:
* 改善UI。
* 新增"設定"頁。

0.2.0:
  * 支援CodePush方式更新app。

0.1.0：
  * 第一版。

* 作者的話：
  1. 此app設計主要目的為改善各醫院"即時看診號"網頁的內容呈現，如存取方便性、字型大小...。但對內容正確性、即時性一律不負任何責任。若不接受，請勿使用此app。
  2. 因為各醫院的"即時看診號"網頁格式不一致，再加上人力有限的情形，所以此app預計只支援有提供以下特定格式"即時看診號"網頁：
    * 所有診間的看診號列於一張網頁。
    * 以表格形式呈現。
    * 可由單一網址公開存取。(不可要求輸入任何登入資訊)
  其餘網頁格式未來可能會以網頁瀏器開啟原網頁的方式呈現。
  3. 若想建議本app支援更多醫院，請先查明第2點所述之限制。若符合其要求，請來信至作者信箱，就有機會加入此app。
  `}</Text>
        <Text style={styles.text}>* 作者：Meng-Yuan Huang</Text>
        <Text style={styles.text}>* 作者信箱：<HyperLink>mailto:myhDev@live.com</HyperLink></Text>
        <Text style={styles.text}>* App開放原始碼：<HyperLink>https://github.com/MrMYHuang/thcs</HyperLink></Text>
      </ScrollView>
    );
  }
}

module.exports = About;
