import os

from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
SECRET = os.getenv("SECRET")
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")
