import { AuthProvider } from "./utils/authContext";
import { Header } from "./components/Header";
import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from "@mui/material";
import StockPage from "./components/StockPage";
import AssetPage from "./components/AssetPage";
import Footer from "./components/Footer";
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
      <Box>
        <Header />
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<StockPage />} />
            <Route path="/assets" element={<AssetPage />} />
          </Routes>
        </Router>
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default App;
