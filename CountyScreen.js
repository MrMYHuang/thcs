var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
    Text,
    View,
    ScrollView,
    Picker,
    TouchableHighlight
} = ReactNative;

import styles from './styles'
const counties = require('./counties')

import { SaveStoreFile } from './StoreFile'
import { connect } from "react-redux"
@connect((store) => {
    return {
        store: store
    };
})
class CountyScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async changeIdSel(idSel, val) {
        await this.props.dispatch({
            type: "SET_KEY_VAL",
            key: idSel,
            val: val
        })
        await SaveStoreFile(this.props.store.settings)
    }

    render() {
        var { countyIdSel, hospitalIdSel } = this.props.store.settings

        var countyItems = [];
        for (var i = 0; i < counties.length; i++) {
            countyItems.push(<Picker.Item key={i} style={styles.text} label={counties[i].name} value={i} />);
        }

        var hospitalItems = []
        var selHospitals = counties[countyIdSel].hospitals
        for (var i = 0; i < selHospitals.length; i++) {
            hospitalItems.push(<Picker.Item key={i} label={selHospitals[i].name} value={i} />);
        }

        return (
            <ScrollView style={styles.scrollView}>
                <Text style={[styles.component, styles.text]}>請選擇縣市、醫院，然後按Go</Text>

                <Text style={[styles.component, styles.text]}>縣市</Text>
                <Picker
                    style={[styles.component]}
                    selectedValue={countyIdSel}
                    onValueChange={(itemValue, itemIndex) => this.changeIdSel('countyIdSel', itemValue)}>
                    {countyItems}
                </Picker>

                <Text style={[styles.component, styles.text]}>醫院</Text>
                <Picker
                    style={[styles.component]}
                    selectedValue={hospitalIdSel}
                    onValueChange={(itemValue, itemIndex) => this.changeIdSel('hospitalIdSel', itemValue)}>
                    {hospitalItems}
                </Picker>

                <TouchableHighlight style={[styles.component, styles.button]}
                    onPress={() => this.props.navigation.navigate("List", { hospital: counties[countyIdSel].hospitals[hospitalIdSel] })}>
                    <Text style={styles.text}>Go</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
};

module.exports = CountyScreen
