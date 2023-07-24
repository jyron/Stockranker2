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
          "http://127.0.0.1:80/stocks_with_likes"
        );
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    fetchStocks();
  }, []);

  function onUpdateStock(stocks, updatedStock) {
    const updatedStocks = stocks?.map((stock) => {
      if (stock._id === updatedStock._id) {
        return updatedStock;
      } else {
        // No change
        return stock;
      }
    });
    setStocks(updatedStocks);
  }

  return (
    <Box marginTop="75px" p="3px">
      <div>
        {stocks.length > 0 ? (
          <StockTable stocks={stocks} onUpdateStock={onUpdateStock} />
        ) : (
          <p>Loading stocks...</p>
        )}
      </div>
    </Box>
  );
};

export default StockPage;
