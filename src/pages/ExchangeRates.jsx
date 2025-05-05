import { Container, Typography, Box } from "@mui/material";

function ExchangeRates() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "90vh",
        padding: 2
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom>
          Exchange Rates
        </Typography>
      </Container>
    </Box>
  );
}

export default ExchangeRates;
