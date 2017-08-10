var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
  var xmlHttp;

  if(window.ActiveXObject){
    try{
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
      xmlHttp = false;
    }
  } else {
    try {
      xmlHttp = new XMLHttpRequest();
    } catch(e) {
      xmlHttp = false;
    }
  }

  if(!xmlHttp) {
    alert("can't create that object boss!");
  } else {
    return xmlHttp;
  }
}

function initialize(){
  xmlHttp.open("GET", "search.php", true);
  xmlHttp.send();
  xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState==4) {
      xmlResponse = xmlHttp.responseXML;
    }
  }
}

function searchxml() {
  if(xmlHttp.readyState==0 || xmlHttp.readyState==4) {
    search = encodeURIComponent(document.getElementById('search').value);
    xmlHttp.open("GET","search.php?search="+search, true);
    xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState == 4) {
      if (xmlHttp.status == 200) {
        xmlResponse = xmlHttp.responseXML;
        handleServerResponse(xmlResponse);
      }
    }
  };
  xmlHttp.send(null);
  }
}
//else{
//   setTimeout('searchxml()', 1000);
// }
// }


function handleServerResponse(xmlResponse) {
  if(xmlHttp.readyState==4) {
    if(xmlHttp.status==200) {
      //var xmlDocumentElement = xmlResponse.createElement("Name");
      var nodes = xmlResponse.getElementsByTagName("name");
      for(i=0;i<nodes.length;i++){
      var results = xmlResponse.getElementsByTagName("name")[i].childNodes[0].nodeValue;
      alert(results);
      document.getElementById("text").innerHTML = results;
      }
    } else {
      alert('Something went wrong!');
      setTimeout('searchxml()', 1000);
    }
  }
}
