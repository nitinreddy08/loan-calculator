import { Container, Typography, Box } from "@mui/material";

function NotFound() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "90vh",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1">
          Oops! The page you’re looking for does not exist.
        </Typography>
      </Container>
    </Box>
  );
}

export default NotFound;
