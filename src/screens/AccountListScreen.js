import React from 'react';
import {
  Button,
  StyleSheet,
  FlatList,
  Text,
  View,
  RefreshControl,
  StatusBar
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAccountList } from '../api/account';

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

  componentWillMount() {
    this._refreshAccountList();
  }

  _refreshAccountList = () => {
    this.setState({ loading: true });
    getAccountList().then(value =>
      this.setState({ loading: false, accountList: value })
    );
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
    return this.state.loading
      ? <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={{ color: '#888' }}
        />
      : <View style={styles.container}>
          <SearchBar noIcon lightTheme placeholder="" />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this._refreshAccountList}
              />
            }
            data={this.state.accountList}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>;
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
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gray: {
    backgroundColor: '#cccccc'
  },
  horizontal: {
    flexDirection: 'row'
  }
});
