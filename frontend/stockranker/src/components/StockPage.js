import React, { useState, useEffect } from "react";
import axios from "axios";
import StockTable from "./StockTable";
import { Box, Typography } from "@mui/material";

const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/stocks_with_likes"
        );
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <Box paddingTop="64px">
      <div>
        <Typography variant="h3">Stocks</Typography>
        {stocks.length > 0 ? (
          <StockTable stocks={stocks} />
        ) : (
          <p>Loading stocks...</p>
        )}
      </div>
    </Box>
  );
};

export default StockPage;
