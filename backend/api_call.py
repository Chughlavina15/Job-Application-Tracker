import requests
import json
from constants import API_URL

repsonse = requests.get(API_URL)
print(repsonse.json())