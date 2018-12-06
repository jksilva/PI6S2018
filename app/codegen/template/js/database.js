var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("blocks").findOne({"name":"Scanner-input"}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
