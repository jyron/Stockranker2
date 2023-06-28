import json
import time
from pprint import pprint as print

import finnhub
from beanie import Document
from fastapi import APIRouter
from pydantic import ValidationError

from app import config
from app.models.stocks import Stock

router = APIRouter()

finnhub_client = finnhub.Client(api_key=config.FINNHUB_API_KEY)

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
async def fill_db_finnhub():
    for ticker in sp500:
        try:
            stock = await create_stock_profile(ticker=ticker)
            print(stock.ticker)
            time.sleep(1)
        except Exception as e:
            print(f"Error: {e}")
