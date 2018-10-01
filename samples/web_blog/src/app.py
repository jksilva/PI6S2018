from flask import Flask

app = Flask(__name__)


# add a end point
@app.route('/')
def hello_method():
    return "Hello, world!"


if __name__ == '__main__':
    app.run()
