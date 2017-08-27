async function getAccountList(baseUrl, userId = 'user1') {
  if (baseUrl === null) {
    console.log('use local mock data');
    return require('./mock/account-list/user1.json');
  } else {
    const url = `${baseUrl}/${userId}/account-list.json`;
    console.log('getting data from ', url);
    let res = await fetch(url);
    if (res.ok) {
      return JSON.parse(await res.text());
    }
  }
}

export { getAccountList };
