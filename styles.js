var ReactNative = require('react-native');
var {
    StyleSheet
  } = ReactNative;

var styles = StyleSheet.create({
  text: {
    fontSize: 24
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center'
  },
  listRow: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  itemText: {
    flex: 1,
    textAlign: 'center'
  }
});

module.exports = styles
