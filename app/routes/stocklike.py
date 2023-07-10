from beanie import PydanticObjectId
from fastapi import APIRouter, Body, Depends, HTTPException
from pydantic import BaseModel

from app.crud.like import like_stock, remove_like
from app.db import User
from app.models.stocklike import LikeType
from app.models.stocks import Stock
from app.users import current_active_user

router = APIRouter()


# @router.get("/stocks/{stock_id}/like")
# async def like_a_stock(
#     stock_id: PydanticObjectId,
#     action: LikeType = "like",
#     user: User = Depends(current_active_user),
# ):
#     try:
#         return await like_stock(stock_id=stock_id, user_id=user.id, action="like")
#     except Exception as e:
#         print("Problem")


# @router.get("/stocks/{stock_id}/dislike")
# async def dislike_a_stock(
#     stock_id: PydanticObjectId,
#     action: LikeType,
#     user: User = Depends(current_active_user),
# ):
#     return await like_stock(stock_id=stock_id, user_id=user.id, action="dislike")


# FastApi has a special Body(...) Pydantic model that pulls data from the request body
# Define a Pydantic model for the request body
class LikeIn(BaseModel):
    action: LikeType


@router.post("/stocks/{stock_id}/like")
async def like_a_stock(
    stock_id: PydanticObjectId,
    like_in: LikeIn = Body(...),
    user: User = Depends(current_active_user),
):
    try:
        return await like_stock(
            stock_id=stock_id, user_id=user.id, action=like_in.action
        )
    except Exception as e:
        print("Problem")


@router.post("/stocks/{stock_id}/dislike")
async def like_a_stock(
    stock_id: PydanticObjectId,
    like_in: LikeIn = Body(...),
    user: User = Depends(current_active_user),
):
    try:
        return await like_stock(
            stock_id=stock_id, user_id=user.id, action=like_in.action
        )
    except Exception as e:
        print("Problem")
