import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ExchangeRates from "./pages/ExchangeRates";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
