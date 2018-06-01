var defaultUsers = ["dreamhackcs", "skyzhar", "freecodecamp", 
"faceittv", "comster404", "brunofin", "terakilobyte", "robotcaleb",
"sheevergaming", "esl_sc2", "ogamingsc2", "jacksofamerica"];
var responseObjArray = [];
var domain = "https://api.twitch.tv/kraken/";

function onloadScript(){

  for(i=0; i<defaultUsers.length; i++){
  callAPI(domain, "users", defaultUsers[i], handler);
  }

}

function handler(response){
  pushValue(response);
  displayListItem(response);
}

function displayListItem(object){
  var list = document.getElementById("streamingList")
   if(object.error == undefined){
      var listItem = document.createElement("LI");
      var listLink = document.createElement("A");
      listItem.textContent = object.display_name;
      // listLink.setAttribute("href", arrayToDisplay[i].display_name);
      listItem.appendChild(listLink);
      list.appendChild(listItem);
      // console.log("has value");
    }else{
      
    }
}

// function displayStreamingList(arrayToDisplay){
//   var list = document.getElementById("streamingList")
//   for (i=0; i<arrayToDisplay.length; i++){
    
//     if(arrayToDisplay[i].error == undefined){
//       var listItem = document.createElement("LI");
//       var listLink = document.createElement("A");
//       listItem.textContent = arrayToDisplay[i].display_name;
//       // listLink.setAttribute("href", arrayToDisplay[i].display_name);
//       listItem.appendChild(listLink);
//       list.appendChild(listItem);
//       console.log("has value");
//     }

//   }
// }

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
      handler(response);
      console.log('Success:', response); 
    }
  );
  
}

