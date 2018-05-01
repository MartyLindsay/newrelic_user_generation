var request = require("request");

var accountId = '';
var login_service_tokens = 'redactedTokenValue';
var inputFile = '/path/to/file/newusers.csv';
var userLevel = 'user';


var LineReader = require('line-reader-sync');

// Open inputFile
var reader = new LineReader(inputFile);

do {
  // Call addUser for each line of file
  var line = reader.readline();
  if (line != null) {
    var userInfo = line.split(',');
    addUser(userInfo[0], userInfo[1], userInfo[2]);

  }
} while (line != null);

function addUser(name, email, account) {
  var data = JSON.stringify({
    "account_view": {
      "user": {
        "full_name": name,
        "email": email
      },
      "level": userLevel
    }
  });

  var accountId = account;

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Cookie': 'login_service_login_newrelic_com_tokens=' + login_service_tokens + ';',
    'Host': 'rpm.newrelic.com',
    'Origin': 'https://account.newrelic.com',
    'Referer': 'https://account.newrelic.com/accounts/' + accountId + '/users/new',
    'X-Requested-With': 'XMLHttpRequest'
  };

  var options = {
    url: "https://rpm.newrelic.com/user_management/accounts/" + accountId + "/users/new",
    method: 'POST',
    headers: headers,
    body: data
  };

  request(options,
    function (error, response, body) {
      if (!error) {
        console.log(name, email);
      } else {
        console.log(error);
      }
    });

};


