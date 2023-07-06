from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.crud.comment import (
    post_comment,
    post_reply,
    like_comment,
    dislike_comment,
    remove_like,
)
from app.db import User
from app.models.comment import CommentType
from app.models.stocklike import LikeType
from app.models.stocks import Stock
from app.users import current_active_user

router = APIRouter()


@router.post("/stocks/{stock_id}/comment")
async def create_comment(
    stock_id: PydanticObjectId,
    content: str,
    user: User = Depends(current_active_user),
):
    return await post_comment(stock_id=stock_id, user_id=user.id, content=content)


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
