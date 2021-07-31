var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
    Slider,
    StyleSheet,
    Text,
    View
} = ReactNative;

import styles from './styles'
import { SaveStoreFile } from './StoreFile'

import { connect } from "react-redux"
@connect((store) => {
    return {
        store: store,
        settings: store.settings
    };
})
class SettingScreen extends React.Component {
    static navigationOptions = {
        title: '設定'
    }

    async fontSliderChange(val) {
        await this.props.dispatch({
            type: "SET_KEY_VAL",
            key: "contentFontSize",
            val: val
        })
        await SaveStoreFile(this.props.store.settings)
    }

    render() {
        var { contentFontSize } = this.props.settings;
        return (
            <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>文字大小</Text>
                <Slider
                minimumValue={10} maximumValue={64} step={1} value={contentFontSize}
                onSlidingComplete={(val) => this.fontSliderChange(val)}
                />
                <Text style={{fontSize: contentFontSize}}>範例文字</Text>                
            </ScrollView>
        );
    }
}

module.exports = SettingScreen;
