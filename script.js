//declare variables
var defaultUsers = ["dreamhackcs", "skyzhar", "freecodecamp", 
"faceittv", "comster404", "brunofin", "terakilobyte", "robotcaleb",
"sheevergaming", "esl_sc2", "ogamingsc2", "jacksofamerica"];
// var responseObjArray = [];
var acctStatusCheckArray = [];
var domain = "https://api.twitch.tv/kraken/";

//function to run on page load
function onloadScript(){
  
  //loop thru each user name in the list
  for(i=0; i<defaultUsers.length; i++){
  callAPI(domain, "streams", defaultUsers[i], handler);
  }
}

//a list of functions to to called when API call is successful
function handler(value, response){
  // pushValue(response);
  displayListItem(value, response);
  callAPI(domain, "users", value, acctStatusChecker);
}

//store value to an array for debugging
// function pushValue(value){
//   responseObjArray.push(value);
// }

//diplay list data from API response on the DOM
function displayListItem(value, response){
  var list = document.getElementById("streamingList")
    var listItem = document.createElement("LI");
    var listLink = document.createElement("A");
    var listStatus = document.createElement("P");
    
    //set up elements
    listItem.setAttribute("id",value);
    listLink.setAttribute("target","_blank");
    
    //check if stream is active
    if(response.stream == null){
      
      listItem.textContent = value+": stream not active";
      listItem.appendChild(listLink);
      listItem.setAttribute("sortOrder", 1); //set attribut for sorting
      list.appendChild(listItem);
      
    }else{
      
      listItem.textContent = value+": ";
      listLink.setAttribute("href", response.stream.channel.url);
      listStatus.innerHTML = response.stream.channel.status;
      listLink.innerHTML = "live"
      listItem.appendChild(listLink);
      listItem.appendChild(listStatus);
      listItem.setAttribute("sortOrder", 2); // set attribute for sorting
      list.appendChild(listItem);
      
      
    }
}

//make API call to twitch
function callAPI(domain,key,value,callBack){
  
  var url = domain + key +"/"+value;
  // console.log(url);
  
    fetch(url, {
    method: 'GET', // or 'PUT'
    headers:{
      'Client-ID': '9m474lggbg8veapiw06p8r6px3w832'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(function(response){
      callBack(value,response);
      sortList();
      // console.log('Success:', response);
    }
  );
  
}

//function to check if a user exist
function acctStatusChecker(value,response){
  
  //acctStatusCheckArray.push(response);
  
  if(response.error == "Not Found"){
    var listItem = document.getElementById(value)
    listItem.innerHTML = value +": account does not exist"
    listItem.setAttribute("class","inactive");
    listItem.setAttribute("sortOrder", 0);
  } 
  // console.log("acctStatusCheckerObj: "+ response)
}

//sort list to show live channgles first, 
//inactive but existing users second, 
//unregistered users last
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

