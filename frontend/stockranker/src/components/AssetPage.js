import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetDetail from "./AssetDetail";
import StockComments from "./StockComments";
import { Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

const AssetPage = (props) => {
  const { stock_id } = useParams();
  const [stock, setStock] = useState([]);
  const [stockComment, setStockComment] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/stocks_with_likes/${stock_id}`
          );
        setStock(response.data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };
    fetchStock();
  }, []);

  function onUpdateStock(updatedStock) {
    setStock(updatedStock)
  }

  function onUpdateStockComment(updatedStockComment) {
    setStockComment(updatedStockComment)
  }
  
  return (
    <Box marginTop="100px" p="3px">
      <div>
        <AssetDetail
          stock={stock}
          onUpdateStock={onUpdateStock}
        />
        <StockComments
          stockComment={stockComment}
          onUpdateStockComment={setStockComment}
        />
      </div>
    </Box>
  );
};

export default AssetPage;
