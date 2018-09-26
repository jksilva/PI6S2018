from database import Database
from models.blog import Blog
#from models.post import Post

__author__ = 'silvajk'

Database.initialize()

blog = Blog(author="jackson",
            title="sample title",
            description="sample description")

blog.new_post()

blog.save_to_mongo()

from_database = Blog.from_mongo(blog.id)

print(blog.get_posts())

#posts = Post.from_blog('123')
#for post in posts:
#    print(post)
#-----
#post = Post.from_mongo('6ab24a32e4564ae29dc5918c152af66b')

#print(post)
#post = Post(blog_id="123",
#            title="another great post",
#            content="this is some sample content",
#            author="silvajk")

#post.save_to_mongo()

#post = Post("post1 title", "post1 content", "post1 author")
#post2 = Post("post2 title", "post2 content", "post2 author")
#post2.content = "some different content"

#print(post.content)
#print(post2.content)

#---

#import pymongo

#uri = "mongodb://127.0.0.1:27017"
#client = pymongo.MongoClient(uri)
#database = client['fullstack']
#collection = database['students']

#students = collection.find({})

#for student in students:
#    print(student)

#students = [student['mark'] for student in collection.find({})]

#print(students)