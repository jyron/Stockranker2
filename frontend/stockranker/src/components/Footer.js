import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 3 }}>
      <Container maxWidth="md">
        <Typography variant="body2" align="center" color="textSecondary">
          &copy; {new Date().getFullYear()} StockRanker, have fun. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
