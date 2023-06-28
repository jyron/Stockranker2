import { AuthProvider } from "./utils/authContext";
import { Header } from "./components/Header";
import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import StockPage from "./components/StockPage";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
      <Box>
        <Header />
        <CssBaseline />
        <StockPage />
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default App;
