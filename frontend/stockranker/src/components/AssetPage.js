import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetDetail from "./AssetDetail";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../config";

const AssetPage = (props) => {
  const { stock_id } = useParams();
  const [stock, setStock] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await api.get(`/stocks_with_likes/${stock_id}`);
        setStock(response.data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };
    fetchStock();
  }, []);

  function onUpdateStock(updatedStock) {
    setStock(updatedStock);
  }

  return (
    <Box marginTop="100px" p="3px">
      <div>
        <AssetDetail stock={stock} onUpdateStock={onUpdateStock} />
      </div>
    </Box>
  );
};

export default AssetPage;
