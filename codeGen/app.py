import requests

__author__ = "Jackson Silva"

r = requests.get("http://google.com")
print(r.content)
