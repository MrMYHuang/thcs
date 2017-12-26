var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
    Text,
    View,
    Picker,
    TouchableHighlight
} = ReactNative;

import styles from './styles'
const counties = require('./counties')

class CountyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {countyId: 0, hospitalId: 0}
    }

    render() {
        var countyItems = [];
        for (var i = 0; i < counties.length; i++) {
            countyItems.push(<Picker.Item key={i} style={styles.text} label={counties[i].name} value={i}/>);
        }

        var hospitalItems = []
        var selHospitals = counties[this.state.countyId].hospitals
        for (var i = 0; i < selHospitals.length; i++) {
            hospitalItems.push(<Picker.Item key={i} label={selHospitals[i].name} value={i}/>);
        }
        
        return (
            <View>
                <Text style={styles.text}>請選擇縣市、醫院，然後按Go</Text>
                <Text style={styles.text}>縣市</Text>
                <Picker
                    selectedValue={this.state.countyId}
                    onValueChange={(itemValue, itemIndex) => this.setState({ countyId: itemValue })}>
                    {countyItems}
                </Picker>
                <Text style={styles.text}>醫院</Text>
                <Picker
                    itemStyle={styles.text}
                    selectedValue={this.state.hospitalId}
                    onValueChange={(itemValue, itemIndex) => this.setState({ hospitalId: itemValue })}>
                    {hospitalItems}
                </Picker>
                <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate("List", {hospital: counties[this.state.countyId].hospitals[this.state.hospitalId]})}><Text style={styles.text}>Go</Text></TouchableHighlight>
            </View>
        );
    }
};

module.exports = CountyScreen
