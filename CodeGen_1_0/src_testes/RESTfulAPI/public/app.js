


var app = {};


// config
app.config =  {
  'sessionToken' : false

};

// ajax client (for the restful api)
app.client = {};

// interface for making api calls
app.client.request = function (headers,path,method,queryStringObject,payload,callback) {

//set defaults
headers = typeof(headers) == 'object' && headers !== null ? headers : {};
path = typeof(path) == 'string' ? path : '/';
method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
queryStringObject =  typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
payload =  typeof(payload) == 'object' && payload !== null ? payload : {};
callback = typeof(callback) == 'function' ? callback:false;

//for each queryString add it to the path
var requestUrl = path+'?';
var counter = 0;
for (var queryKey in queryStringObject){
  if (queryStringObject.hasOwnProperty(queryKey)){
    counter++;
    // if at least one query string parameter has already been added
    if (counter > 1) {
      requestUrl+='&';

    }
    // add the key and value
    requestUrl+=queryKey+'='queryStringObject[queryKey];
  }
}
// form the http request as a JSON type
var xhr = new XMLHttpRequest();
xhr.open(method,requestUrl,true);
xhr.setRquestHeader("Content-Type","application/json");

// For each header sent, add it to a request
for(var headerKey in headers){
  if (headers.hasOwnProperty(headerKey)) {
    xhr.setRquestHeader(headerKey,headers[headerKey]);
  }
}

// If there is a current session token set, add that as a header
if (app.config.sessionToken) {
  xhr.setRquestHeader("token",app.config.sessionToken.id);
}

// when the request comes back, handle the response
xhr.onreadystatechange = function(){
  if (xhr.readyState== XMLHttpRequest.DONE) {
    var statusCode = xhr.status;
    var responseReturned = xhr.responseText;

    //Callback if request
    if (callback) {
      try {
        var parseResponse = JSON.parse(responseReturned);
        callback(statusCode,parseResponse);
      } catch (e) {
        callback(statusCode,false);
      }
    }
  }
}

// send the payload as json
var payloadString = JSON.stringify(payload);
xhr.send(payloadString);
