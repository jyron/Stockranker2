from fastapi import APIRouter

from app.models.stocks import Stock
from app.models.stocklike import StockLike

router = APIRouter()


# get all stocks from databse in beanie format
@router.get("/stocks")
async def get_stocks():
    stocks = await Stock.all().to_list()
    return stocks


@router.get("/stocks_with_likes")
async def get_stocks_with_likes():
    stocks = []
    pipeline = [
        {
            "$group": {
                "_id": "$stock_id",
                "like_count": {
                    "$sum": {"$cond": [{"$eq": ["$like_type", "like"]}, 1, 0]}
                },
                "dislike_count": {
                    "$sum": {"$cond": [{"$eq": ["$like_type", "dislike"]}, 1, 0]}
                },
            }
        }
    ]
    result = await StockLike.aggregate(pipeline).to_list()
    stocks = await Stock.all().to_list()

    for stock in stocks:
        matching_doc = next((doc for doc in result if doc["_id"] == stock.id), None)

        like_count = matching_doc["like_count"] if matching_doc else 0
        dislike_count = matching_doc["dislike_count"] if matching_doc else 0
        stock.likes = like_count
        stock.dislikes = dislike_count
    return stocks


@router.get("/stocks/{stock_id}")
async def get_stock(stock_id: str):
    stock = await Stock.get(stock_id)
    return stock