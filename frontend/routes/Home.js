import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import background from "../../assets/background.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5c6bc0",
    },
    secondary: {
      main: "#f06292",
    },
  },
  typography: {
    fontFamily: "Agency FB, sans-serif",
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  width: "475px",
  height: "300px",
}));

const slides = [
  {
    title: "About Us",
    text: "description",
    backgroundImageUrl: background,
  },
  {
    title: "Function 1",
    text: "description",
    backgroundImageUrl: background,
  },
  {
    title: "Function 2",
    text: "description",
    backgroundImageUrl: background,
  },
  {
    title: "Function 3",
    text: "description",
    backgroundImageUrl: background,
  },
  {
    title: "Function 4",
    text: "description",
    backgroundImageUrl: background,
  }
];

const steps = [
  {
    title: "Step 1: Getting Started",
    text: "description",
  },
  {
    title: "Step 2: Title",
    text: "description",
  },
  {
    title: "Step 3: Title",
    text: "description",
  },
];

const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Carousel showArrows autoPlay infiniteLoop interval={5000}>
          {slides.map((slide, index) => (
            <Box
              key={index}
              className="slide-bg"
              sx={{
                height: "70vh",
                display: "flex",
                alignItems: "center",
                //justifyContent: 'flex-start', // Change from 'center' to 'flex-start'
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url(${slide.backgroundImageUrl})`,
                backgroundSize: "cover", // Add this line to resize the background image according to the screen size
                backgroundPosition: "center", // Add this line to keep the background image centered
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  maxWidth: "35%",
                  padding: 4,
                  marginLeft: 10, // Add this line to provide some left margin
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: 2,
                  boxShadow:
                    "0 12px 30px rgba(0, 0, 0, 0.4), 0 10px 12px rgba(0, 0, 0, 0.6)",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontSize: "3.5rem",
                    textShadow: "1.8px 1.8px 4px #888",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: "1.7rem",
                    textShadow: "0.5px 0.5px 0.5px #888",
                  }}
                >
                  {slide.text}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Carousel>
        <Container>
          <Grid
            container
            spacing={50}
            sx={{ marginTop: "-375px", marginLeft: "-575px" }}
          >
            {steps.map((step, index) => (
              <Grid item xs={0} md={4} key={index}>
                <StyledPaper elevation={3}>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontSize: "2rem",
                      textShadow: "1.2px 1.2px 1.2px #888",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                      fontSize: "1.4rem",
                      textShadow: "0.5px 0.5px 0.5px #888",
                    }}
                  >
                    {step.text}
                  </Typography>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
