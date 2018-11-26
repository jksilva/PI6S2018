/*
 *
 *
 */

// Dependecies
var MongoClient = require('mongodb').MongoClient;
var helpers = require('./helpers');

// Cointainer for the module (to be exported)
var lib ={};

// connection string
var url = "mongodb://localhost:27017/";


// * save to mongo
lib.create = function(data,callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("blocks").insert({data}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });
};


// find from mongo
lib.read = function(data,callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("blocks").findOne({data}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });
};

// Update from mongo
lib.update = function (dir,file,data,callback) {

};

// Delete a file
lib.delete = function(dir,file,callback){

};

// Export the module
module.exports = lib;
