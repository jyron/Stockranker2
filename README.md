This project list stocks and other financial assets, and allows users to likeand comment on them.
## Getting Started

### Backend
To run the backend follow these steps (in the root directory of the project)
1. Create a python virtual env 
```python3 -m venv venv```
2. Activate the virtual env
```source venv/bin/activate```
3. Install the requirements
```pip install -r requirements.txt```
4. Run the server
```python main.py```

Now your backend is runnning on localhost:8000

View all available routes through swagger on localhost:8000/docs

### Frontend
To run the frontend follow these steps (make sure you are in the frontend/stockranker/ directory)
1. Install the requirements
```npm install```
2. Run the server
```npm start```

Now your frontend is running on localhost:3000

## Notes
1. Login is handled by fastapi cookies so once you register a user, your info is saved in your browser forever, until you logout.
2. All necessary variable are located in .env.temp, *make sure to copy and rename it to .env* and fill in the variables.
3. Project currently uses Mongodb Atlas as a database, but you can change it to your own local or cloud mongodb instance by changing the MONGO_URI variable in .env.
4. If you are using your own MongoDB instance, you can use the app/utils/get_finnhub_data.py routes to populate your database with stocks and prices.
5. Project uses FinnHub Api to get financial data, I can provide this key if you want to test the project, but you can also get your own key [FREE] from https://finnhub.io/
6. To quickly generate a secret key for your .env file use the python secrets module: 
  
Inside Terminal:
```
python3
import secrets
secrets.token_hex(16)
```
