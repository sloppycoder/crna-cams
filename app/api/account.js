async function getAccountList(accessToken, userId = 'user1') {
  if (accessToken === null) {
    console.log('use local mock data');
    return require('./mock/account-list/user1.json');
  } else {
    // the URL is hosted by AWS API gateway
    const url = `https://izvbvrhqh0.execute-api.us-west-2.amazonaws.com/stage/accounts?user=${userId}`;
    console.log('getting data from ', url);
    console.log('access token ', accessToken);
    let res = await fetch(url, {
      method: 'get',
      headers: {
        Authorization: `${accessToken}`
      }
    });
    if (res.ok) {
      return JSON.parse(await res.text());
    } else {
      console.log('API call failed', res);
      return null;
    }
  }
}

export { getAccountList };
