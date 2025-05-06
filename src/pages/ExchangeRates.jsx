import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from "@mui/material";
import axios from "axios";

function ExchangeRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD" // Replace with your API endpoint
      );
      setRates(response.data.rates);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch exchange rates");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "90vh",
        padding: 4,
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom align="center">
          Exchange Rates
        </Typography>

        <Box sx={{ textAlign: "right", marginTop: 3 }}>
          <Button variant="outlined" onClick={fetchExchangeRates}>Refresh Rates</Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="exchange rates table">
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                  <TableCell align="right">Exchange Rate (USD)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(rates).map((currency) => (
                  <TableRow key={currency}>
                    <TableCell component="th" scope="row">
                      {currency}
                    </TableCell>
                    <TableCell align="right">{rates[currency]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        
      </Container>
    </Box>
  );
}

export default ExchangeRates;