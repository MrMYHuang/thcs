/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR ,OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule Main
 * @flow
 */

var React = require('react');
var ReactNative = require('react-native');
var {
    Platform,
    AppRegistry,
    BackAndroid,
    StyleSheet,
    View,
    Text,
    Alert,
} = ReactNative;
import styles from './styles'
var CodePush = require("react-native-code-push");

import {
    TabNavigator
} from 'react-navigation';

var HomeScreen = require('./HomeScreen');
var SettingScreen = require('./SettingScreen');
var About = require('./About');

import { Provider } from "react-redux"
import { getSavedStore, blankStore } from "./store"

const MainNavigator = TabNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: SettingScreen },
    About: { screen: About }
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            labelStyle: {
                fontSize: 24,
            }
        },
        lazy: true
    });

var styles2 = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'white',
    }
});

var ProgressBar
switch (Platform.OS) {
    case 'windows':
        ProgressBar = require('ProgressBarWindows'); break
    case 'android':
        ProgressBar = require('ProgressBarAndroid'); break
}

export class Main extends React.Component {
    savedStore = {}

    constructor(props) {
        super(props);
        // Unfortunately, we can't immediately set store to savedStore,
        // because it contains async calls.
        // We use storeInited for working around this issue.
        this.state = {
            showUpdateBar: false,
            updateProgress: 0,
            storeInited: false,
        }
        this.useSavedStore()
    }

    async useSavedStore() {
        this.savedStore = await getSavedStore()
        this.setState({ storeInited: true })
    }

    codePushStatusDidChange(status) {
        switch (status) {
            /*
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              console.log("Checking for updates.");
              break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              console.log("Downloading package.");
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              console.log("Installing update.");
              break;
            case CodePush.SyncStatus.UP_TO_DATE:
              console.log("Up-to-date.");
              break;
            */
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                Alert.alert("下載更新完成", "請重新啟動app。")
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({ showUpdateBar: true })
        var percent = progress.receivedBytes / progress.totalBytes * 100
        this.setState({ updateProgress: percent })
    }

    render() {
        if (!this.state.storeInited)
            return <Text style={styles.text}>Loading...</Text>

        return (
            <Provider store={this.savedStore}>
                <View style={styles2.container}>
                    <MainNavigator />
                    {this.state.showUpdateBar && <ProgressBar style={styles.toolbar} progress={this.state.updateProgress} />}
                </View>
            </Provider>
        );
    }
};


export class Main2 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Text>Test</Text>
        );
    }
};
Main2 = CodePush(codePushOptions)(Main2);

//if (!(__DEV__)) {
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START, updateDialog: CodePush.DEFAULT_UPDATE_DIALOG };
Main = CodePush(codePushOptions)(Main);
//}

//AppRegistry.registerComponent('thcs', () => Main);

//module.exports = Main;
