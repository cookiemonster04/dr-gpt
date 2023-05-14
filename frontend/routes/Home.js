import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import background from "../../assets/background.png";
import homeslide2 from "../../assets/homeslide2.png";
import homeslide3 from "../../assets/homeslide3.png";
import homeslide4 from "../../assets/homeslide4.png";
import homeslide5 from "../../assets/homeslide5.png";

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
    fontFamily: "system-ui, 'Nunito', 'Source Sans Pro', sans-serif",
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  width: "375px",
  height: "400px",
}));

const slides = [
  {
    title: "About Vitawise",
    text: "Save time and receive peace of mind.",
    backgroundImageUrl: background,
  },
  {
    title: "Skip the long waiting times.",
    text: "If you have a sniffle, the trip to the doctor doesn't feel worth the effort. Gain your peace of mind now.",
    backgroundImageUrl: homeslide2,
  },
  {
    title: "We have full transparency.",
    text: "If we are not sure of your diagnosis, or if further steps are needed, we'll walk you through how you can get the proper procedures done by an expert nearby.",
    backgroundImageUrl: homeslide3,
  },
  {
    title: "Specialized to you.",
    text: "Your diagnoses will be just that: yours. We take into account important factors such as age, medical history, and lifestyle to serve you the best we can.",
    backgroundImageUrl: homeslide4,
  },
  {
    title: "Affordability.",
    text: "We know that not everyone has well-covering insurance or deep pockets. We have you covered. With the standard model free to use, we're accessible to all.",
    backgroundImageUrl: homeslide5,
  },
];

const steps = [
  {
    title: "Step 1: Tell us About You",
    text: "Take five minutes to fill out some simple information about you that will help us make a better diagnosis.",
  },
  {
    title: "Step 2: Tell us about your symptoms",
    text: "Be as specific as you can! After your initial inputs, we'll ask a couple of follow-up questions to get the information we need.",
  },
  {
    title: "Step 3: Get a diagnosis and treatment options",
    text: "From the comfort of your own home, receive a quick diagnosis, as well as links to resources that can help you take the next steps towards recovery.",
  },
];

function EmptyBoxWithButton() {
  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    fontSize: "6rem",
    backgroundColor: "#2493D4",
    color: "white",
    border: "2px solid black",
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "6rem",
  };

  const boxStyle = {
    padding: "100px",
    textAlign: "center",
  };

  const buttonTextStyle = {
    fontSize: "2rem",
  };

  return (
    <div style={{ padding: "40px" }}>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <button style={buttonStyle}>
          <span style={buttonTextStyle}>      Sign up now!!!      </span>
        </button>
      </Link>
    </div>
  );
}


const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "600px",
              marginBottom: "50px",
              justifyContent: "flex-start",
            }}
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
                      fontFamily:
                        "system-ui, 'Nunito', 'Source Sans Pro', sans-serif",
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
                      fontFamily:
                        "system-ui, 'Nunito', 'Source Sans Pro', sans-serif",
                    }}
                  >
                    {step.text}
                  </Typography>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>

          <EmptyBoxWithButton />

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
                    alignItems: "center",
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
                      fontFamily:
                        "system-ui, 'Nunito', 'Source Sans Pro', sans-serif",
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
                      fontFamily:
                        "system-ui, 'Nunito', 'Source Sans Pro', sans-serif",
                    }}
                  >
                    {slide.text}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Carousel>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
