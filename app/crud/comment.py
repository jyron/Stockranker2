from datetime import datetime
from beanie import PydanticObjectId

from app.models.comment import CommentLike, CommentType, StockComment
from app.models.stocklike import LikeType


async def post_comment(
    user_id: PydanticObjectId, stock_id: PydanticObjectId, content: str
):
    comment = StockComment(
        user_id=user_id,
        stock_id=stock_id,
        content=content,
        comment_type=CommentType.comment,
        created_at=datetime.utcnow(),
    )
    await comment.insert()
    return comment


async def post_reply(
    user_id: PydanticObjectId, parent_comment_id: PydanticObjectId, content: str
):
    # First find the parent comment to get the associated stock_id
    parent_comment = await StockComment.find_one({"_id": parent_comment_id})

    reply = StockComment(
        user_id=user_id,
        stock_id=parent_comment.stock_id,  # use the parent's stock_id
        content=content,
        comment_type=CommentType.reply,
        parent_comment_id=parent_comment_id,
        created_at=datetime.utcnow(),
    )
    await reply.insert()
    return reply


async def like_comment(user_id: PydanticObjectId, comment_id: PydanticObjectId):
    like = CommentLike(
        user_id=user_id,
        comment_id=comment_id,
        like_type=LikeType.like,
        created_at=datetime.utcnow(),
    )
    await like.insert()
    return like


async def dislike_comment(user_id: PydanticObjectId, comment_id: PydanticObjectId):
    dislike = CommentLike(
        user_id=user_id,
        comment_id=comment_id,
        like_type=LikeType.dislike,
        created_at=datetime.utcnow(),
    )
    await dislike.insert()
    return dislike


async def remove_like(user_id: PydanticObjectId, comment_id: PydanticObjectId):
    existing_like = await CommentLike.find_one(
        {"user_id": user_id, "comment_id": comment_id}
    )
    if existing_like:
        await existing_like.delete()
    else:
        raise ValueError("Like does not exist")
