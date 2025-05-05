import { Container, Typography, Box } from "@mui/material";

function Home() {
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
          Welcome to the Loan Calculator App
        </Typography>
      </Container>
    </Box>
  );
}

export default Home;
