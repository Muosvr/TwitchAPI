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
    listItem.setAttribute("sortOrder", 0);
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
      listItem.setAttribute("sortOrder", 1);
      list.appendChild(listItem);
      
      // console.log("has value");
    }else{
      listItem.textContent = value+": ";
      listLink.setAttribute("href", response.stream.channel.url);
      listStatus.innerHTML = response.stream.channel.status;
      listLink.innerHTML = "live"
      listItem.appendChild(listLink);
      listItem.appendChild(listStatus);
      listItem.setAttribute("sortOrder", 2);
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
      sortList();
      // console.log('Success:', response);
      return "final message";
    }
  );
  
}

function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("streamingList");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    // Loop through all list items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (b[i].getAttribute("sortOrder") < b[i + 1].getAttribute("sortOrder")) {
        /* If next item is alphabetically lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

