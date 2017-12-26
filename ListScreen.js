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
import styles from './styles'
var {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = ReactNative;

var invariant = require('fbjs/lib/invariant');
var dismissKeyboard = require('dismissKeyboard');

var AnimalCell = require('./AnimalCell');
//var SearchBar = require('SearchBar');

/**
 * This is for demo purposes only, and rate limited.
 * In case you want to use the Rotten Tomatoes' API on a real app you should
 * create an account at http://developer.rottentomatoes.com/
 */

var LOADING = {};

//import { NativeModules } from 'react-native'
//import { SaveStoreFile } from './StoreFile'
var getClinicStatus = require('./clinicStatus')
import axios from 'axios'

import { connect } from "react-redux"

var ProgressBar = require('ProgressBarWindows');
if (Platform.OS == 'android')
  ProgressBar = require('ProgressBarAndroid')

var animalFile = 'Animals.json'
@connect((store) => {
  return {
    store: store,
    settings: store.settings
  };
})
class ListScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: navigation.state.params.hospital.name
  })

  timeoutID = null

  constructor(props) {
    super(props);
    this.state = {
      listType: 0, // 0 random list, 1 favorite list
      dataSource: new ListView.DataSource({
        // Always redrawing, because listType can be changed when row is unchanged.
        rowHasChanged: (row1, row2) => true,
      }),
      isDownloading: false,
      downloadedSize: 0,
      downloadTotal: 0,
      downloadPercent: 0
    }
    this.initScreen()
  }

  componentDidMount() {
  }

  async initScreen() {
    /*
    if (await NativeModules.NativeLocalFile.FileExistAsync(animalFile)) {
      var aDbStr = await NativeModules.NativeLocalFile.LoadStrAsync(animalFile)
      this.animals = JSON.parse(aDbStr)
      this.showRandomList()
    }
    else {*/
    await this.updateDb()
    //}
  }

  async updateDb() {
    let config = {
      onDownloadProgress: progressEvent => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.setState({
          isDownloading: true,
          downloadedSize: progressEvent.loaded,
          downloadTotal: progressEvent.total,
          downloadPercent: percentCompleted
        })
      }
    }

    const { state } = this.props.navigation
    var hospital = state.params.hospital

    await axios.get(hospital.clinicStatusUrl, config)
      .then(async (res) => {
        /*
        await NativeModules.NativeLocalFile.SaveStrAsync(animalFile, JSON.stringify(res.data)).catch(err => {
          console.log('Fail to save file.')
        })
        */

        var currTime = new Date()
        await this.props.dispatch({
          type: "SET_KEY_VAL",
          key: "animalDbDate",
          val: currTime.toLocaleDateString() + " " + currTime.toLocaleTimeString()
        })
        //await SaveStoreFile(this.props.store)
        var clinics = getClinicStatus(hospital, res.data)
        await this.props.dispatch({
          type: "SET_KEY_VAL",
          key: "clinics",
          val: clinics.toArray()
        })
        this.showRandomList()
        this.setState({ isDownloading: false })
      })
  }

  showRandomList() {
    this.setState({ listType: 0,
      dataSource: this.state.dataSource.cloneWithRows(
        this.props.store.settings.clinics
      ) })
  }

  async selectAnimal(clinicNo: Object) {
    await this.props.dispatch({
      type: "SET_KEY_VAL",
      key: "clinicNoSel",
      val: clinicNo
    })
    this.props.navigation.navigate("Animal", { updateDb: this.updateDb.bind(this) })
  }

  renderFooter() {
    /*
    if (!this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }*/

    return <ActivityIndicator style={styles2.scrollSpinner} />;
  }

  renderSeparator(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles2.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles2.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID} style={style} />
    );
  }

  renderRow(
    clinic: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <AnimalCell
        onSelect={() => this.selectAnimal(clinic.clinicNo)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        clinic={clinic}
        listType={this.state.listType}
      />
    );
  }

  render() {
    var content
    if (this.state.isDownloading == true)
      content = <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>資料庫下庫進度：</Text>
        <ProgressBar style={{ height: 50 }} progress={this.state.downloadPercent} />
        <Text style={styles.text}>{Math.round(this.state.downloadedSize / 1024)} / {Math.round(this.state.downloadTotal / 1024)} KB</Text>
      </View>
    else
      content = <ListView
        ref="listview"
        renderSeparator={this.renderSeparator.bind(this)}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />;

    var { contentFontSize } = this.props.store.settings
    return (
      < View style={styles2.container} >
        <View style={styles2.container2}>
          <View style={styles.listRow}>
            <Text style={[{ fontSize: contentFontSize }, styles.itemText]}>醫生</Text>
            <Text style={[{ fontSize: contentFontSize }, styles.itemText]}>看診號</Text>
          </View>
          {content}
        </View>
        <TouchableHighlight style={styles.button}
          onPress={this.updateDb.bind(this)}>
          <Text style={styles.text}>刷新</Text>
        </TouchableHighlight>
      </View >
    )
  }
};

/**
        <SearchBar
          onSearchChange={this.onSearchChange}
          isLoading={this.state.isLoading}
          onFocus={() =>
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        /> */

class NoAnimals extends React.Component {
  render() {
    var text = '';
    if (this.props.filter) {
      text = `No results for "${this.props.filter}"`;
    } else if (!this.props.isLoading) {
      // If we're looking at the latest animals, aren't currently loading, and
      // still have no results, show a message
      text = 'Loading...';
    }

    return (
      <View style={styles2.container}>
        <Text style={styles2.noAnimalsText}>{text}</Text>
      </View>
    );
  }
}

var styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
  },
  noAnimalsText: {
    marginTop: 80,
    color: '#888888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

module.exports = ListScreen;
