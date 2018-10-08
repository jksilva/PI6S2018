import datetime
import uuid
from src.common.database import Database

__author__ = 'silvajk'


class Post(object):

    def __init__(self, blog_id, title: object, content: object, author: object, date=datetime.datetime.utcnow(),
                 _id=None) -> object:
        self.blog_id = blog_id
        self.date = date
        self.title = title
        self.content = content
        self.author = author
        self._id = uuid.uuid4().hex if _id is None else _id

    def save_to_mongo(self):
        Database.insert(collection='post',
                        data=self.json())

    def json(self):
        return {
            '_id': self._id,
            'blog_id': self.blog_id,
            'author': self.author,
            'content': self.content,
            'title': self.title,
            'date': self.date
        }

    @classmethod
    def from_mongo(cls, _id):
        post_data = Database.find_one(collection='posts', query={'_id': _id})
        return cls(**post_data)

    @staticmethod
    def from_blog(_id):
        return [post for post in Database.find(collection='post', query={'blog_id': _id})]
