import finnhub
import json
import time
from pprint import pprint as print
from beanie import Document
from fastapi import APIRouter
from pydantic import ValidationError

from app.models.stocks import Stock
from app import config

router = APIRouter()

finnhub_client = finnhub.Client(api_key="cfs2t69r01qr5t5sneu0cfs2t69r01qr5t5sneug")

sp500 = finnhub_client.indices_const(symbol="^GSPC")["constituents"]


async def create_stock_profile(ticker: str) -> Stock:
    existing_stock = await Stock.find_one({"ticker": ticker})
    if existing_stock:
        # Handle the case where the stock already exists
        # You can raise an exception, return None, or perform any other necessary action
        raise ValueError("Stock with the same ticker already exists")
    stock_data = finnhub_client.company_profile2(symbol=ticker)
    # Create and insert the new stock
    try:
        new_stock = Stock(**stock_data)
        await new_stock.insert()
        return new_stock
    except ValidationError as e:
        print(f"Skipping creation of stock: {e}")


@router.get("/finnhub")
async def filldb_finnhub():
    for ticker in sp500:
        try:
            stock = await create_stock_profile(ticker=ticker)
            print(stock.ticker)
            time.sleep(1)
        except Exception as e:
            print(f"Error: {e}")


# filename = "sp500_data.json"
# try:
#     with open(filename, "r") as file:
#         json_data = json.load(file)
# except FileNotFoundError:
#     json_data = []

# # Iterate over each ticker in S&P 500 constituents
# for ticker in sp500:
#     # Check if symbol data already exists in JSON data
#     if not any(entry.get("ticker") == ticker for entry in json_data):
#         # Fetch data for the ticker from Finnhub API
#         print(f"Getting ticker: {ticker}")
#         symbol_data = finnhub_client.company_profile2(symbol=ticker)
#         time.sleep(1)

#         # Add the symbol data to JSON data
#         json_data.append(symbol_data)
#     else:
#         print(f"Ticker already in  json: {ticker}")

# # Write the updated JSON data to the file
# with open(filename, "w") as file:
#     json.dump(json_data, file, indent=4)

# print(f"Unique symbol data written to {filename} successfully.")
