import pymongo

uri = "mongodb://127.0.0.1:27017" #server name
client = pymongo.MongoClient(uri)
database = client['cg_users']
collection = database['users']
users = collection.find({})
