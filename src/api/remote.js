import https from 'https';

function optionalAuthHeader() {
  var token = process.env.OAUTH_TOKEN;
  if (token && token !== '') {
    return { Authorization: `OAuth ${token}` };
  }
  return {};
}

export function apiJSONDataWithPath(path) {
  return new Promise( function (resolve) {
    var pathWithClientId = '';
    if (path.indexOf('?') > -1) {
      pathWithClientId = path + '&client_id=' + process.env.CLIENT_ID;
    } else {
      pathWithClientId = path + '?client_id=' + process.env.CLIENT_ID;
    }
    https.get({
      host: 'api.soundcloud.com',
      path: pathWithClientId,
      headers: optionalAuthHeader()
    }, function (response) {
      console.log(this.path);
      var body = '';
      response.on('data', function (d) {
        body += d;
      });
      response.on('end', function () {
        resolve(JSON.parse(body));
      });
    });
  });
}
