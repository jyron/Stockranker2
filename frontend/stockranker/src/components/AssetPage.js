import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetDetail from "./AssetDetail";
import { Box, Typography } from "@mui/material";

const AssetPage = () => {
  
  return (
    <Box marginTop="100px" p="3px">
      <div>
        <AssetDetail />
      </div>
    </Box>
  );
};

export default AssetPage;
