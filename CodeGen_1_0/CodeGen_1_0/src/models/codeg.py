class Code (object):
    def __init__(self, title, blocks, author,code_id,account_id):
        self.account_id = account_id
        self.code_id = code_id
        self.blocks = blocks
        self.author = author
        self.title = title

    def save_to_mongo(self):
        pass


    def json(self):
        return {

        }