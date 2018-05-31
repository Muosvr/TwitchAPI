function onloadScript(){
    
var url = 'https://api.twitch.tv/kraken/users/FreeCodeCamp';
// var data = {username: 'example'};

//To get access token
// POST https://id.twitch.tv/oauth2/token
//     ?client_id=<your client ID>
//     &client_secret=<your client secret>
//     &grant_type=client_credentials
//     &scope=<space-separated list of scopes>

fetch(url, {
  method: 'POST', // or 'PUT'
//   body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

}

