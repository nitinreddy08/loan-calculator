import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
// import useExchangeRates from "../hooks/useExchangeRates";

function Home() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const { rates, loading, error } = useExchangeRates();

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / (12 * 100);
    const N = parseFloat(years) * 12;

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));

    const amortization = generateAmortizationSchedule(P, R, N, emiValue);
    setSchedule(amortization);
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

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "90vh",
        padding: 2,
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom>
          Loan EMI Calculator
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Loan Amount (Principal)"
              fullWidth
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              type="number"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Annual Interest Rate (%)"
              fullWidth
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              type="number"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Loan Tenure (Years)"
              fullWidth
              value={years}
              onChange={(e) => setYears(e.target.value)}
              type="number"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={calculateEMI}>
              Calculate EMI
            </Button>
          </Grid>

          {emi && (
            <Grid item xs={12}>
              <Typography variant="h5">Your Monthly EMI: $ {emi}</Typography>
            </Grid>
          )}

          {emi && !loading && rates && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5" gutterBottom>
                EMI in Different Currencies
              </Typography>
              <ul>
                <li>EUR: €{(emi * (rates["EUR"] || 0)).toFixed(2)}</li>
                <li>INR: ₹{(emi * (rates["INR"] || 0)).toFixed(2)}</li>
                <li>JPY: ¥{(emi * (rates["JPY"] || 0)).toFixed(2)}</li>
              </ul>
            </Box>
          )}

          {loading && <Typography>Loading exchange rates...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          {schedule.length > 0 && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5" gutterBottom>
                Amortization Schedule
              </Typography>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Principal Paid</th>
                    <th>Interest Paid</th>
                    <th>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.month}>
                      <td>{row.month}</td>
                      <td>₹ {row.principalPayment}</td>
                      <td>₹ {row.interestPayment}</td>
                      <td>₹ {row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
