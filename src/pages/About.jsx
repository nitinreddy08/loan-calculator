import React from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const userDetails = {
  name: "Nitin Reddy",
  title: "Software Developer",
  bio: "Solution-oriented Full Stack Developer with experience in Python (OOP), SQL, and modern web technologies like React, Next.js, and Tailwind CSS. Skilled in building responsive, scalable web applications. Familiar with basic data structures and algorithms. Passionate about solving real-world challenges with clean, efficient code and collaborating effectively to deliver high-quality solutions.",
  skills: [
    "HTML",
    "CSS",
    "Tailwind CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "Flask",
    "Numpy",
    "Pandas",
    "Data Cleaning",
    "Data Visualization",
    "SQL",
  ],
  contact: {
    email: "prodvenkat@gmail.com, nitinreddy.nv@gmail.com",
    phone: "+91 7382118118",
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/nitin-reddy-nv118",
    github: "https://github.com/nitinreddy08",
    LiveProjectLink: "https://loan-calculator-nitin.vercel.app",
    GithubRepositoryLink: "https://github.com/nitinreddy08/loan-calculator",
  },
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const SkillChip = styled(Box)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1.5),
  margin: theme.spacing(0.5),
  fontSize: "0.9rem",
}));

function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography variant="body1">
        Live Project Link :
        <a
          href={userDetails.contact.LiveProjectLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.palette.primary.main }}
        >
          LiveProjectLink
        </a>
      </Typography>
      <Typography variant="body1">
        Github Repository Link :
        <a
          href={userDetails.contact.GithubRepositoryLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.palette.primary.main }}
        >
          GithubRepositoryLink
        </a>
      </Typography>
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? "h4" : "h3"}
          gutterBottom
          align="center"
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          About Me
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "column" },
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-start", md: "center" },
              mb: { xs: 2, md: 0 },
            }}
          >
            <StyledAvatar alt={userDetails.name} src="/resumedp.jpg" />
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left", md: "center" },
                ml: { xs: 0, sm: 2, md: 0 },
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{ mt: { xs: 1, sm: 0 } }}
              >
                {userDetails.name}
              </Typography>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                color="textSecondary"
              >
                {userDetails.title}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: { xs: 1, sm: 2 } }} elevation={3}>
              <CardContent>
                <Typography variant="body1" paragraph>
                  {userDetails.bio}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Skills:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    mb: 2,
                  }}
                >
                  {userDetails.skills.map((skill, index) => (
                    <SkillChip key={index}>{skill}</SkillChip>
                  ))}
                </Box>

                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Contact:
                </Typography>
                <Box sx={{ pl: { xs: 0, sm: 1 } }}>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Email: {userDetails.contact.email}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Phone: {userDetails.contact.phone}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Location: {userDetails.contact.location}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1, sm: 3 },
                      mt: 1,
                    }}
                  >
                    <Typography variant="body1">
                      <a
                        href={userDetails.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.palette.primary.main }}
                      >
                        LinkedIn Profile
                      </a>
                    </Typography>
                    <Typography variant="body1">
                      <a
                        href={userDetails.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.palette.primary.main }}
                      >
                        GitHub Profile
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
