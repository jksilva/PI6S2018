from database import Database


class Code (object):
    def __init__(self, title, blocks, author,code_id,account_id):
        self.account_id = account_id
        self.code_id = code_id
        self.blocks = blocks
        self.author = author
        self.title = title

    def save_to_mongo(self):
        Database.insert(collection='codes',data=self.json())


    def json(self):
        return {
            'account_id' :self.account_id,
            'code_id' : self.code_id,
            'blocks' : self.blocks,
            'author' : self.author,
            'title' : self.title
        }

    @staticmethod
    def from_mongo(id):
    #post.from_mongo('123')
    	return Database.find_one(collection='codes', query={'code_id':code_id})

    @staticmethod
    def from_code(account_id):
    	return [code for codes in Database.find(collection='codes', query={'account_id':account_id})]
        
