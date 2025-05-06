import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
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
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom align="center">
          Loan EMI Calculator
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Loan Amount"
              fullWidth
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              type="number"
              variant="outlined"
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
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              onClick={calculateEMI}
              size="large"
              sx={{ mt: 1 }}
            >
              Calculate
            </Button>
          </Grid>
        </Grid>

        {emi && (
          <>
            <Typography
              variant="h5"
              sx={{
                mt: 4,
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Monthly EMI: {currencySymbols[selectedCurrency]}
              {convertAmount(emi)}
            </Typography>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
              >
                <TextField
                  select
                  label="Currency"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ minWidth: 200 }}
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
                >
                  Reset Table
                </Button>
              </Box>
            </Grid>
          </>
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
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>
              Amortization Schedule ({selectedCurrency})
            </Typography>
            <Box
              sx={{
                overflowX: "auto",
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 2,
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  textAlign: "center",
                }}
              >
                <thead
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                  }}
                >
                  <tr>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Month
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Principal
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Interest
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
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
                          padding: "10px",
                          border: "1px solid #ccc",
                        }}
                      >
                        {row.month}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                        {currencySymbols[selectedCurrency]}{" "}
                        {convertAmount(row.principalPayment)}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                        {currencySymbols[selectedCurrency]}{" "}
                        {convertAmount(row.interestPayment)}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                        {currencySymbols[selectedCurrency]}{" "}
                        {convertAmount(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Home;
