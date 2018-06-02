var defaultUsers = ["dreamhackcs", "skyzhar", "freecodecamp", 
"faceittv", "comster404", "brunofin", "terakilobyte", "robotcaleb",
"sheevergaming", "esl_sc2", "ogamingsc2", "jacksofamerica"];
var responseObjArray = [];
var acctStatusCheckArray = [];
var domain = "https://api.twitch.tv/kraken/";

function onloadScript(){
  for(i=0; i<defaultUsers.length; i++){
  callAPI(domain, "streams", defaultUsers[i], handler);
  }
}

function handler(value, response){
  pushValue(response);
  displayListItem(value, response);
  callAPI(domain, "users", value, acctStatusChecker);
}

function acctStatusChecker(value,response){
  acctStatusCheckArray.push(response);
  if(response.error == "Not Found"){
    var listItem = document.getElementById(value)
    listItem.innerHTML = value +": account does not exist"
    listItem.setAttribute("class","inactive");
  } 
  console.log("acctStatusCheckerObj: "+ response)
}


function displayListItem(value, response){
  var list = document.getElementById("streamingList")
      var listItem = document.createElement("LI");
      var listLink = document.createElement("A");
      var listStatus = document.createElement("P");
      
      listItem.setAttribute("id",value);
      
   if(response.stream == null){
      listItem.textContent = value+": stream not active";
      
      // listLink.setAttribute("href", arrayToDisplay[i].display_name);
      listItem.appendChild(listLink);
      list.appendChild(listItem);
      // console.log("has value");
    }else{
      listItem.textContent = value+": ";
      listLink.setAttribute("href", response.stream.channel.url);
      listStatus.innerHTML = response.stream.channel.status;
      listLink.innerHTML = "live"
      listItem.appendChild(listLink);
      listItem.appendChild(listStatus);
      list.appendChild(listItem);
      
    }
}


function pushValue(value){
  responseObjArray.push(value);
}

function callAPI(domain,key,value,callBack){
  
  var url = domain + key +"/"+value;
  // console.log(url);
  
    fetch(url, {
    method: 'GET', // or 'PUT'
  //body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Client-ID': '9m474lggbg8veapiw06p8r6px3w832'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(function(response){
      // responseObjArray.push(response);
      callBack(value,response);
      // console.log('Success:', response);
      return "final message";
    }
  );
  
}

