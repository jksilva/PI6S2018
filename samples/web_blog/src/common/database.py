import pymongo


class Database(object):
    URI = "mongodb://127.0.0.1:27017"
    # URI = 'mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test'
    DATABASE = None

    @staticmethod
    def initialize():
        #  client = pymongo.MongoClient(
        #      "mongodb://kay:Subumbr4@mycluster0-shard-00-00.mongodb.net:27017,mycluster0-shard-00-01.mongodb.net:27017,mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin")
        client = pymongo.MongoClient(Database.URI)
        Database.DATABASE = client['fullstack']

    @staticmethod
    def insert(collection, data):
        Database.DATABASE[collection].insert(data)

    @staticmethod
    def find(collection, query):
        return Database.DATABASE[collection].find(query)

    @staticmethod
    def find_one(collection, query):
        return Database.DATABASE[collection].find_one(query)
