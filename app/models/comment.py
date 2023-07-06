from datetime import datetime
from enum import Enum
from typing import Optional
from beanie import Document, PydanticObjectId

from app.models.stocklike import LikeType


class CommentType(str, Enum):
    comment = "comment"
    reply = "reply"


class StockComment(Document):
    user_id: PydanticObjectId
    stock_id: PydanticObjectId
    content: str
    comment_type: CommentType
    parent_comment_id: Optional[PydanticObjectId] = None
    created_at: datetime

    class Settings:
        name = "StockComment"


class CommentLike(Document):
    user_id: PydanticObjectId
    comment_id: PydanticObjectId
    like_type: LikeType
    created_at: datetime

    class Settings:
        name = "CommentLike"
