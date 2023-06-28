from beanie import Document
from typing import Optional


class Stock(Document):
    country: str
    currency: str
    estimateCurrency: str
    exchange: str
    finnhubIndustry: Optional[str] = None
    ipo: str
    logo: Optional[str] = None
    marketCapitalization: float
    name: str
    phone: Optional[str] = None
    shareOutstanding: float
    ticker: str
    weburl: str
    price: Optional[float] = None
    likes: Optional[int] = None
    dislikes: Optional[int] = None

    class Settings:
        name = "Stock"
