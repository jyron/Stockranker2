"""
import json
import time

import finnhub
from fastapi import APIRouter

from app import config
from app.models.stocks import Stock

router = APIRouter()
finnhub_client = finnhub.Client(api_key=config.FINNHUB_API_KEY)


# update prices for all stocks in database, with error handling using the finnhub api, and accounting for the rate limit on the api of 60 calls per minute
async def update_prices():
    stocks = await Stock.all().to_list()
    number_updated = 0
    for stock in stocks:
        try:
            stock_data = finnhub_client.quote(stock.ticker)
            stock.price = stock_data["c"]
            print(stock.ticker, stock.price)
            await stock.save()
            time.sleep(1)
        except Exception as e:
            print(f"Error: {e}")
    return "Prices updated, number of prices updated: " + str(number_updated)


# router to updte prices
@router.get("/update_prices")
async def update_prices_router():
    return await update_prices()
"""
