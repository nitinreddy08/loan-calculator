import React from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";

// Sample data about the user (you can replace with your own details)
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
    "SQL"
  ],
  contact: {
    email: "prodvenkat@gmail.com",
    phone: "+91 7382118118",
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/nitin-reddy-nv118",
    github: "https://github.com/nitinreddy08",
  },
};

// Styling the avatar image
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(3),
}));

function About() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom align="center">
          About Me
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <StyledAvatar alt={userDetails.name} src="/resumedp.jpg" />
              <Box>
                <Typography variant="h5">{userDetails.name}</Typography>
                <Typography variant="h6">{userDetails.title}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="body1" paragraph>
                  {userDetails.bio}
                </Typography>
                <Typography variant="h6">Skills:</Typography>
                <ul>
                  {userDetails.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  Contact:
                </Typography>
                <Typography variant="body1">
                  Email: {userDetails.contact.email}
                </Typography>
                <Typography variant="body1">
                  Phone: {userDetails.contact.phone}
                </Typography>
                <Typography variant="body1">
                  Location: {userDetails.contact.location}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                  <a href={userDetails.contact.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <a href={userDetails.contact.github} target="_blank" rel="noopener noreferrer">
                    github Profile
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
