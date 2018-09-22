__author__ = 'Jackson'

import requests
from bs4 import BeautifulSoup


request = requests.get("https://www.johnlewis.com/house-by-john-lewis-hinton-office-chair/p2083183")
content = request.content
soup = BeautifulSoup(content,"html.parser")
element = soup.find("p",{"class":"price price--large"})
# <p class="price price--large">£129.00</p>

string_price = element.text.strip()

price_without_symbol = string_price[1:]

price = float(price_without_symbol)

if price < 200:
    print("You should buy the chair!")
    print("The current price is {}".format(price))
else:
    print("Do not buy, it's too expensive!")


#print(float(price_without_symbol) < 200)
#print(element.text.strip())
#print(request.content)
