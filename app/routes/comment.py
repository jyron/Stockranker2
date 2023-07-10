from beanie import PydanticObjectId
from fastapi import APIRouter, Body, Depends, FastAPI, HTTPException
from pydantic import BaseModel

from app.crud.comment import (
    dislike_comment,
    like_comment,
    post_comment,
    post_reply,
    remove_like,
)
from app.db import User
from app.models.comment import CommentType
from app.models.stocklike import LikeType
from app.models.stocks import Stock
from app.users import current_active_user

router = APIRouter()


# Define a model for the request body
class CommentIn(BaseModel):
    content: str


@router.post("/stocks/{stock_id}/comment")
async def create_comment(
    stock_id: PydanticObjectId,
    comment_in: CommentIn = Body(...),
    user: User = Depends(current_active_user),
):
    return await post_comment(
        stock_id=stock_id, user_id=user.id, content=comment_in.content
    )


@router.post("/comments/{comment_id}/reply")
async def create_reply(
    comment_id: PydanticObjectId,
    content: str,
    user: User = Depends(current_active_user),
):
    return await post_reply(
        parent_comment_id=comment_id, user_id=user.id, content=content
    )


@router.get("/comments/{comment_id}/like")
async def like_a_comment(
    comment_id: PydanticObjectId,
    user: User = Depends(current_active_user),
):
    return await like_comment(comment_id=comment_id, user_id=user.id)


@router.get("/comments/{comment_id}/dislike")
async def dislike_a_comment(
    comment_id: PydanticObjectId,
    user: User = Depends(current_active_user),
):
    return await dislike_comment(comment_id=comment_id, user_id=user.id)


@router.get("/comments/{comment_id}/remove_like")
async def remove_a_like(
    comment_id: PydanticObjectId,
    user: User = Depends(current_active_user),
):
    return await remove_like(comment_id=comment_id, user_id=user.id)
