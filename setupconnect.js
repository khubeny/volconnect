var xmlHttp = createXmlHttpRequestObject();
var xmlResponse = xmlHttp.responseXML;
document.onload = makeflags(xmlResponse);

function createXmlHttpRequestObject() {
  var xmlHttp;

  try {
    xmlHttp = new XMLHttpRequest();
  } catch(e){
    xmlHttp = false;
  }

  if(!xmlHttp) {
    alert("Object could not be created.");
  } else {
    return xmlHttp;
  }
}

function process() {

    if (xmlHttp.readyState==0 || xmlHttp.readyState==4){
        name = encodeURIComponent(document.getElementById("name").value);
        startdatetime = encodeURIComponent(document.getElementById("startdatetime").value);
        enddatetime = encodeURIComponent(document.getElementById("enddatetime").value);
        address = encodeURIComponent(document.getElementById("address").value);
        contact = encodeURIComponent(document.getElementById("contact").value);
        description = encodeURIComponent(document.getElementById("description").value);
        tags = encodeURIComponent(document.getElementById("tags").value);
        xmlHttp.open("GET", "vatxml.php?address="+address +"&name="+name+"&startdatetime="+startdatetime+"&enddatetime="+enddatetime+"&contact="+contact+"&description="+description+"&tags="+tags, true);
      //  xmlHttp.onreadystatechange = function() {
        //   if (xmlHttp.readyState == 4) {
        //     if (xmlHttp.status == 200) {
        //       xmlResponse = xmlHttp.responseXML;
        //       makeflags(xmlResponse);
        //     }
        //   }
        // };
        xmlHttp.send(null);

  //  }
}
}
function makeflags(xmlResponse) {
  if (xmlHttp.readyState==4 && xmlHttp.status==200){
  var nodes = xmlResponse.getElementsByTagName("address");
    for(i=0;i<nodes.length;i++){
     var address = xmlResponse.getElementsByTagName("address")[i].childNodes[0].nodeValue;
       alert("I am here") ;
     geocodeAddress(address, geocoder, resultsMap);
   }
 } else {
   setTimeout("makeflags();",1000);
 }
}
