import { settings } from '../utils/localStore';

async function getAccountList(userId = 'user1') {
  console.log('getAccountList with settings', settings);
  if (settings.useMockData) {
    console.log('user id', userId);
    return require('./mock/account-list/user1.json');
  } else {
    const url = `${settings.apiUrl}/${userId}/account-list.json`;
    console.log('getting data from ', url);
    let res = await fetch(url);
    if (res.ok) {
      return JSON.parse(await res.text());
    }
  }
}

export { getAccountList };
