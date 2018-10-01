from flask import Flask, render_template

app = Flask(__name__)


# add a end point
@app.route('/')
def hello_method():
    return render_template('login.html')


if __name__ == '__main__':
    app.run(port=4995)
