/*
 * Request handlers
 *
 */

// Dependecies
var _data = require('./data');
var helpers = require('./helpers');
var MongoClient = require('mongodb').MongoClient;

// define the handlers
var handlers = {};

// url for connet to mongodb
var url = "mongodb://localhost:27017/";

 // users
 handlers.users = function(data,callback){
   var acceptableMethods = ['post','get','put','delete'];
   if (acceptableMethods.indexOf(data.method) > -1){
     handlers._users[data.method](data,callback);

   }else  {
     callback(405);
   }
 };

// container for the users submethods
handlers._users = {};

// Users - posts
// Required data: fullName, emailAddress, password
// Optional data: none

handlers._users.post = function(data,callback){
  // Check that all required fieds are filled out
  var fullName = typeof(data.payload.fullName) == 'string' && data.payload.fullName.trim().length > 0 ? data.payload.fullName.trim() : false;
  var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 0 ? data.payload.emailAddress.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (fullName && emailAddress && password){
    // make sure that user doesnt already exist
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      var query = { emailAddress: emailAddress };
      dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result,' <-- verificar isso');
        db.close();
        if (result.length==0) {
          // if the user donsen't exist procced
          hasedPassword = helpers.hash(password);
            MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("test");
            var myobj = { fullName: fullName, emailAddress: emailAddress, password:hasedPassword };
            dbo.collection("users").insertOne(myobj, function(err, res) {
              if (err) {
                callback(500,'Internal error!');
              }else {
                console.log("1 document inserted");
                db.close();
              }

            });
          });
          callback(200);
        }else {
          // if the user already exists
          callback(409,'The user already exists');
        }

      });
    });
  }
}
// Users - get
// Required data: phone
// Optional data: none
// @TODO only let an authenticated users acessess their  object. dont let then access anyone else.
handlers._users.get = function(data,callback){
// check that phone number is valid
var phone = typeof(data.queryStringObject.phone) =='string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

if(phone){

    // get the token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token :false;
    // verify that given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if (tokenIsValid) {
        // lookup the user
        _data.read('users',phone,function(err,data){
          if(!err && data){
            //remove the hashed password from the user object before returning it to the requester
            delete data.hashedPassword;
            callback(200,data);

          }else {
            callback(404);
          }
        });
      }else {
        callback(403,{'error':'missing required token in header, or token is invalid'})
      }
    });

  } else {
    callback(400,{'Error':'Missing required field'});
  }
};
// Users - put
// Required data : phone
// Optional data : firstName, lastName, password (at least one must be specified)
// @TODO only let an autheticated user update their own object. Dont let them update anyone else's
handlers._users.put = function(data,callback){
  // Check for the required fields
  console.log('teste ',data.payload.lastName);
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for the optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // check for the optional fields

  if (phone) {
    // error if nothing is sent to Update
    if (firstName || lastName || password) {
      // get the token from headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token :false;

      // verify that given token is valid for the phone number
      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if (tokenIsValid) {
          // lookup the users
          _data.read('users',phone,function(err,userData){
            if(!err && userData){
              //update the fields necessary
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }
              // store the new updates
              _data.update('users',phone,userData,function (err) {
                if (!err) {
                  callback(200);
                }else {
                  console.log(err);
                  callback(500,{'error':'could not update the user'});
                  console.log('nao encontrou ',phone);
                }

              });
            }else {
              callback(400,{'error': 'the specified user does not exist'});
            }
          });
        }else {
          callback(403,{'error':'missing required token in header, or token is invalid'});
        }
      });



    }else {
      callback(400,{'error': 'missing fields to update'});
    }
  }else {
    callback(400,{'error':'missing required field'});
  }

};
// Users - delete
// required field : phone
// @TODO only let an authenticated user delete their object, dont let them delete anyone else
//@TODO cleanup (delete) any other data files associated with this user
handlers._users.delete = function(data,callback){
  //check that phone number is valid
  var phone = typeof(data.queryStringObject.phone) =='string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

  if(phone){

    // get the token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token :false;

    // verify that given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if (tokenIsValid) {
        // lookup the user
        _data.read('users',phone,function(err,data){
          if(!err && data){
            _data.delete('users',phone,function(err){
              if(!err){
                callback(200);
              }else {
                callback(500,{'error':'could not delete the specified user'})
              }
            });
            callback(200,data);

          }else {
            callback(400,{'error': 'could not find the specified users'});
          }
        });
      }else {
        callback(403,{'error':'missing required token in header, or token is invalid'});
      }
    });

  } else {
    callback(400,{'Error':'Missing required field'});
  }
  };

// Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);

  }else {
    callback(405);
  }
};

// container for all the tokens methods
handlers._tokens = {};

// tokens - post
// required data: phone, password
// optional data: none
handlers._tokens.post = function(data,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if(phone && password){
    // lookup the user who matches that phone number
    _data.read('users',phone,function(err,userData){
      if (!err && userData) {
        // hash the sent password, and compare it to the password store
        var hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword){
          // if valid, create a new token with a random name, set the expiration data 1 hour in the future
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now()+ 1000 *60 *60;
          var tokenObject = {
            'phone':phone,
            'id':tokenId,
            'expires':expires
          };

          // store the tokens
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            }else {
              callback(500,{'error':'could not create the new token'});
            }
          });
        }else {
          callback(400,{'error':'password did not match the specified users Stored password'});
        }
      }else {
        callback(400,{'error':'could not find the specified user'});
      }
    });

  }else {
    callback(400,{'Error': 'missing required field(s)'});
  }

};
// tokens - get
// required data: phone
// optional data: anyone
// @TODO Only let an autheticated users acess their object. don't let then access anyone else.
handlers._tokens.get = function(data,callback){
  // check that phone number is valid
  var id = typeof(data.queryStringObject.id) =='string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

  if(id){
    // lookup the token
      _data.read('tokens',id,function(err,tokenData){
        if(!err && tokenData){
          //remove the hashed password from the user object before returning it to the requester
          callback(200,tokenData);

        }else {
          callback(404);
        }
      });
    } else {
      callback(400,{'Error':'Missing required field'});
    }
  };

// tokens - put
// required data : id, extend
// optional data : none

handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

if(id && extend){
  // lookup the token
  _data.read('tokens', id, function(err,tokenData){
    if (!err && tokenData) {
      // check to the make sure the token isn't already expired
      if (tokenData.expires >Date.now()) {
        // set the expiration an hour form now
        tokenData.expires = Date.now() + 1000 * 60 * 60 ;

        // store the new updates
        _data.update('tokens',id,tokenData,function(err){
          if (!err) {
            callback(200);
          }else {
            callback(500,{'error':'could not update the tokens expiration'});
          }
        });
      }else {
        callback(400,{'error': 'the token has already expired, and cannot be extended'});
      }
    }else {
      callback(400,{'error': 'specified token does not exist'});
    }
  });
}else {
  callback(400,{'error':'missing required filed(s) or field(s) are invalid'});
}


};
// tokens - post
handlers._tokens.delete = function(data,callback){
  // check is the id is valid
  var id = typeof(data.queryStringObject.id) =='string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

  if(id){
    // lookup the user
    _data.read('tokens',id,function(err,data){
      if(!err && data){
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          }else {
            callback(500,{'error':'could not delete the specified token'})
          }
        });
        callback(200,data);

      }else {
        callback(400,{'error': 'could not find the specified token'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

// verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){
  // lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if (!err && tokenData) {
    // check that the token is for the given user and has not expired
    if (tokenData.phone == phone && tokenData.expires > Date.now()) {
      callback(true);
    }  else {
      callback(false);
    }
    }else {
      callback(false);
    }
  });
};


// Ping handler
handlers.ping = function(data,callback){
 callback(200);
};

// Not Found handler
handlers.notFound = function (data,callback){
  callback(404);
};

// Export the module
module.exports = handlers
