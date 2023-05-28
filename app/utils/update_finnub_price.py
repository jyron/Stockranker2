# import json
# import finnhub

# finnhub_client = finnhub.Client(api_key="cfs2t69r01qr5t5sneu0cfs2t69r01qr5t5sneug")
# filename = "sp500_data.json"
# try:
#     with open(filename, "r") as file:
#         json_data = json.load(file)
# except FileNotFoundError:
#     json_data = []

# tickers = []
# for entry in json_data:
#     ticker = entry.get("ticker")
#     if ticker == None:
#         tickers.append(entry)

# print(tickers)
# print(len(tickers))
