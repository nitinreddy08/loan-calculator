import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useState } from "react";
import useExchangeRates from "../hooks/useExchangeRates";

function Home() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const { rates, loading, error } = useExchangeRates();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    INR: "₹",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
  };

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / (12 * 100);
    const N = parseFloat(years) * 12;

    if (P && R && N) {
      const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setEmi(emiValue.toFixed(2));

      const amortization = generateAmortizationSchedule(P, R, N, emiValue);
      setSchedule(amortization);
    }
  };

  const generateAmortizationSchedule = (P, R, N, emiValue) => {
    let schedule = [];
    let outstandingPrincipal = P;

    for (let month = 1; month <= N; month++) {
      const interestPayment = outstandingPrincipal * R;
      const principalPayment = emiValue - interestPayment;
      outstandingPrincipal -= principalPayment;

      schedule.push({
        month,
        principalPayment:
          principalPayment > 0 ? principalPayment.toFixed(2) : "0.00",
        interestPayment:
          interestPayment > 0 ? interestPayment.toFixed(2) : "0.00",
        balance:
          outstandingPrincipal > 0 ? outstandingPrincipal.toFixed(2) : "0.00",
      });

      if (outstandingPrincipal <= 0) break;
    }

    return schedule;
  };

  const resetTable = () => {
    setEmi(null);
    setSchedule([]);
  };

  const convertAmount = (amount) => {
    if (!rates || !rates[selectedCurrency]) return amount;
    return (amount * rates[selectedCurrency]).toFixed(2);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        padding: { xs: 2, sm: 3, md: 4 },
        paddingBottom: isMobile ? '72px' : '32px', // Add bottom padding for mobile to account for navigation
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          gutterBottom 
          align="center"
          sx={{ 
            mb: { xs: 2, md: 4 },
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
          }}
        >
          Loan EMI Calculator
        </Typography>

        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            mb: 4
          }}
        >
          <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <TextField
                label="Loan Amount"
                fullWidth
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                type="number"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                margin={isMobile ? "dense" : "normal"}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Interest Rate (%)"
                fullWidth
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                type="number"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                margin={isMobile ? "dense" : "normal"}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Term (Years)"
                fullWidth
                value={years}
                onChange={(e) => setYears(e.target.value)}
                type="number"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                margin={isMobile ? "dense" : "normal"}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                onClick={calculateEMI}
                size={isMobile ? "medium" : "large"}
                sx={{ mt: { xs: 1, md: 2 } }}
              >
                Calculate
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {emi && (
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 2,
              mb: 4
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: 1,
                mb: 3
              }}
            >
              Monthly EMI: {currencySymbols[selectedCurrency]}
              {convertAmount(emi)}
            </Typography>

            <Box
              display="flex"
              justifyContent={isMobile ? "center" : "space-between"}
              flexDirection={isMobile ? "column" : "row"}
              alignItems={isMobile ? "center" : "flex-start"}
              gap={2}
            >
              <TextField
                select
                label="Currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                SelectProps={{ native: true }}
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  minWidth: isMobile ? "100%" : 200,
                  mb: isMobile ? 1 : 0
                }}
              >
                {Object.keys(currencySymbols).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </TextField>

              <Button
                variant="outlined"
                color="secondary"
                onClick={resetTable}
                sx={{ 
                  width: isMobile ? "100%" : "auto"
                }}
              >
                Reset Table
              </Button>
            </Box>
          </Paper>
        )}

        {loading && (
          <Typography sx={{ mt: 2 }}>Loading exchange rates...</Typography>
        )}
        {error && (
          <Typography sx={{ mt: 2 }} color="error">
            {error}
          </Typography>
        )}

        {schedule.length > 0 && (
          <Paper 
            elevation={2} 
            sx={{ 
              mt: 3,
              p: { xs: 1, sm: 2, md: 3 },
              borderRadius: 2
            }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              gutterBottom
              sx={{ p: { xs: 1, sm: 2 } }}
            >
              Amortization Schedule ({selectedCurrency})
            </Typography>
            <Box
              sx={{
                overflowX: "auto",
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  textAlign: "center",
                  minWidth: isMobile ? "500px" : "100%", // Ensure horizontal scrolling works on mobile
                }}
              >
                <thead
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                  }}
                >
                  <tr>
                    <th style={{ padding: isMobile ? "8px" : "10px", border: "1px solid #ccc" }}>
                      Month
                    </th>
                    <th style={{ padding: isMobile ? "8px" : "10px", border: "1px solid #ccc" }}>
                      Principal
                    </th>
                    <th style={{ padding: isMobile ? "8px" : "10px", border: "1px solid #ccc" }}>
                      Interest
                    </th>
                    <th style={{ padding: isMobile ? "8px" : "10px", border: "1px solid #ccc" }}>
                      Remaining Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, index) => (
                    <tr
                      key={row.month}
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(255, 255, 255, 0.08)" // Light gray for even rows in dark mode
                            : "transparent", // Transparent for odd rows
                        transition: "background-color 0.3s",
                        color: "text.primary", // Adjust text color based on theme
                      }}
                      onMouseEnter={(e) => {
                        // Adjust hover color for dark mode (lighter shade for hover)
                        e.currentTarget.style.backgroundColor = "#1976d2"; // Blue hover effect
                      }}
                      onMouseLeave={(e) => {
                        // Reset background color to original
                        e.currentTarget.style.backgroundColor =
                          index % 2 === 0
                            ? "rgba(255, 255, 255, 0.08)"
                            : "transparent";
                      }}
                    >
                      <td
                        style={{
                          padding: isMobile ? "6px" : "10px",
                          border: "1px solid #ccc",
                          fontSize: isMobile ? "0.8rem" : "inherit"
                        }}
                      >
                        {row.month}
                      </td>
                      <td style={{ 
                        padding: isMobile ? "6px" : "10px", 
                        border: "1px solid #ccc",
                        fontSize: isMobile ? "0.8rem" : "inherit"
                      }}>
                        {currencySymbols[selectedCurrency]}{" "}
                        {convertAmount(row.principalPayment)}
                      </td>
                      <td style={{ 
                        padding: isMobile ? "6px" : "10px", 
                        border: "1px solid #ccc",
                        fontSize: isMobile ? "0.8rem" : "inherit"
                      }}>
                        {currencySymbols[selectedCurrency]}{" "}
                        {convertAmount(row.interestPayment)}
                      </td>
                      <td style={{ 
                        padding: isMobile ? "6px" : "10px", 
                        border: "1px solid #ccc",
                        fontSize: isMobile ? "0.8rem" : "inherit"
                      }}>
                        {currencySymbols[selectedCurrency]}{" "}
                        {convertAmount(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default Home;