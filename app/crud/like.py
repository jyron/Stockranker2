# Like or dislike a stock
from datetime import datetime
from beanie import PydanticObjectId
from fastapi import HTTPException

from app.models.stocklike import LikeType, StockLike


async def like_stock(
    stock_id: PydanticObjectId, action: LikeType, user_id: PydanticObjectId
):
    # Check if the user has already liked or disliked the stock
    existing_like = await StockLike.find_one({"user_id": user_id, "stock_id": stock_id})

    if existing_like:
        if existing_like.like_type == action:
            raise HTTPException(400, f"User has already {action}d this stock")
        else:
            # Update the like_type if the user is changing their action
            existing_like.like_type = action
            await existing_like.save()
            return {"message": f"Stock {action}d"}

    # Create a new like document
    like = StockLike(
        user_id=user_id,
        stock_id=stock_id,
        like_type=action,
        created_at=datetime.utcnow(),
    )
    await like.insert()

    return {
        "message": f"Stock {action}d",
        "stock_id": stock_id,
        "user_id": user_id,
        "action": action,
    }


# Remove like or dislike for a stock
async def remove_like(stock_id: PydanticObjectId, user_id: PydanticObjectId):
    # Check if the user has liked or disliked the stock
    existing_like = await StockLike.find_one({"user_id": user_id, "stock_id": stock_id})
    if not existing_like:
        raise HTTPException(400, "User has not liked or disliked this stock")

    # Delete the like document
    await existing_like.delete()

    return {"message": "Stock like or dislike removed"}
