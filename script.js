var defaultUsers = ["dreamhackcs", "skyzhar", "freecodecamp", 
"faceittv", "comster404", "brunofin", "terakilobyte", "robotcaleb",
"sheevergaming", "esl_sc2", "ogamingsc2", "jacksofamerica"];
var responseObjArray = [];
var domain = "https://api.twitch.tv/kraken/";

function onloadScript(){

  for(i=0; i<defaultUsers.length; i++){
  callAPI(domain, "streams", defaultUsers[i], handler);
  }

}

function handler(value, response){
  pushValue(response);
  displayListItem(value, response);
}

function displayListItem(value, response){
  var list = document.getElementById("streamingList")
   if(response.stream == null){
      var listItem = document.createElement("LI");
      var listLink = document.createElement("A");
      listItem.textContent = value+": stream not live";
      // listLink.setAttribute("href", arrayToDisplay[i].display_name);
      listItem.appendChild(listLink);
      list.appendChild(listItem);
      // console.log("has value");
    }else{
      var listItem = document.createElement("LI");
      var listLink = document.createElement("A");
      // listItem.textContent = value+": stream live";
      listLink.setAttribute("href", response.stream.channel.url);
      listLink.textContent = value+": stream live"
      listItem.appendChild(listLink);
      list.appendChild(listItem);
      
    }
}


function pushValue(value){
  responseObjArray.push(value);
}

function callAPI(domain,key,value,callBack){
  
  var url = domain + key +"/"+value;
  console.log(url);
  
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
      handler(value,response);
      console.log('Success:', response);
      return "final message";
    }
  );
  
}

