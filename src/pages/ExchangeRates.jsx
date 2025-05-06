import React, { useState, useEffect } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Button,
  useTheme,
  useMediaQuery
} from "@mui/material";
import axios from "axios";

function ExchangeRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD" 
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
        padding: { xs: 2, sm: 3, md: 4 },
        paddingBottom: isMobile ? '72px' : '32px', 
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          gutterBottom 
          align="center"
          sx={{ 
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
          }}
        >
          Exchange Rates
        </Typography>

        <Box sx={{ 
          textAlign: "right", 
          marginTop: { xs: 2, sm: 3 },
          marginBottom: { xs: 2, sm: 0 }
        }}>
          <Button 
            variant="outlined" 
            onClick={fetchExchangeRates}
            size={isMobile ? "medium" : "large"}
          >
            Refresh Rates
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            minHeight: { xs: '30vh', sm: '40vh', md: '50vh' }
          }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, sm: 3 },
              mt: { xs: 2, sm: 3 },
              borderRadius: 1
            }}
          >
            <Typography color="error" align="center">{error}</Typography>
          </Paper>
        ) : (
          <TableContainer 
            component={Paper} 
            elevation={2}
            sx={{ 
              marginTop: { xs: 2, sm: 3 },
              borderRadius: 1,
              overflow: 'hidden'
            }}
          >
            <Table 
              sx={{ 
                minWidth: { xs: 280, sm: 450, md: 650 }
              }} 
              aria-label="exchange rates table"
              size={isMobile ? "small" : "medium"}
            >
              <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell 
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 'bold',
                      padding: isMobile ? '12px 16px' : '16px',
                      fontSize: isMobile ? '0.875rem' : '1rem' 
                    }}
                  >
                    Currency
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 'bold',
                      padding: isMobile ? '12px 16px' : '16px',
                      fontSize: isMobile ? '0.875rem' : '1rem' 
                    }}
                  >
                    Exchange Rate (USD)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rates && Object.keys(rates).map((currency) => (
                  <TableRow 
                    key={currency}
                    hover
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                      },
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell 
                      component="th" 
                      scope="row"
                      sx={{ 
                        padding: isMobile ? '8px 16px' : '16px',
                        fontSize: isMobile ? '0.875rem' : '1rem' 
                      }}
                    >
                      {currency}
                    </TableCell>
                    <TableCell 
                      align="right"
                      sx={{ 
                        padding: isMobile ? '8px 16px' : '16px',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        fontFamily: 'monospace'
                      }}
                    >
                      {rates[currency].toFixed(4)}
                    </TableCell>
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