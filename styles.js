var ReactNative = require('react-native');
var {
    StyleSheet
  } = ReactNative;

var styles = StyleSheet.create({
  component: {
    margin: 5
  },
  text: {
    fontSize: 24
  },
  updateDate: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
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
  },
  scrollView: {
    marginLeft: 30,
    marginRight: 30
  }
});

module.exports = styles
