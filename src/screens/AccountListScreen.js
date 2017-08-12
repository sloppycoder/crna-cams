import React from 'react';
import { Button, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

export default class AccountListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Accounts',
      headerRight: (
        <Button
          title="Map"
          onPress={() => navigation.navigate('accountListMap', null)}
        />
      )
    };
  };

  state = {
    accountList: require('../api/mock/account-list.json')
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) =>
    <ListItem
      onPress={() =>
        this.props.navigation.navigate('accountDetail', { account: item })}
      title={item.name}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>
            {item.notes}
          </Text>
        </View>
      }
    />;

  render() {
    return (
      <View style={styles.container}>
        <SearchBar noIcon lightTheme placeholder="" />
        <FlatList
          data={this.state.accountList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  }
});
