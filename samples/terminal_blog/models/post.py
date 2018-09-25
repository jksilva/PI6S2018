import datetime
import uuid

from database import Database

__author__ = 'silvajk'


class Post(object):

    def __init__(self, blog_id, title: object, content: object, author: object, date=datetime.datetime.utcnow(), id=None) -> object:
        self.blog_id = blog_id
        self.date = date
        self.title = title
        self.content = content
        self.author = author
        self.id = uuid.uuid4().hex if id is None else id

    def save_to_mongo(self):
        Database.insert(collection='post', data=self.json())

    def json(self):
        return{
            'id':self.id,
            'blog_id': self.blog_id,
            'author': self .author,
            'content': self.content,
            'title': self.title,
            'date': self.date
        }

    @staticmethod
    def from_mongo(id):
        #post.from_mongo('123')
        return Database.find_one(collection='post', query={'id': id})

    @staticmethod
    def from_blog(id):
        return [post for post in Database.find(collection='post',query={'blog_id': id})]


