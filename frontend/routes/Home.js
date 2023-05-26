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
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";
import preview from "../../assets/preview2.png";


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
  width: "22rem",
  height: "23rem",
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
    title: "Tell us About You",
    text: "Take five minutes to fill out some simple information about you that will help us make a better diagnosis.",
    backgroundImageUrl: step1,
  },
  {
    title: "Tell us About Your Symptoms",
    text: "Be as specific as you can! After your initial inputs, we'll ask a couple of follow-up questions to get the information we need.",
    backgroundImageUrl: step2,
  },
  {
    title: "Receive Your Diagnosis and Treatment Options",
    text: "From the comfort of your own home, receive a quick diagnosis, as well as links to resources that can help you take the next steps towards recovery.",
    backgroundImageUrl: step3,
  },
];

function EmptyBoxWithButton() {
  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "6.1rem",
    backgroundColor: "#3B82F6",
    color: "white",
    //border: "2px solid black",
    borderRadius: "0.625rem",
    textAlign: "center",
    lineHeight: "6rem",
    width: "66.25rem",
  };

  const boxStyle = {
    padding: "6rem",
    textAlign: "center",
  };

  const buttonTextStyle = {
    fontSize: "2rem",
  };

  return (
    <div style={{ padding: "2.5rem" }}>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <button style={buttonStyle}>
          <span style={buttonTextStyle}> Get started </span>
        </button>
      </Link>
    </div>
  );
}

const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ marginTop: "5rem" }}>
      <div style={{ position: 'relative', height: '41.5rem' }}>
      <img
        src={preview} // Replace with the actual image URL
        alt="Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          textAlign: 'left',
          width: '50%',
        }}
      >
        <h1 style={{ color: 'black', marginLeft: '1.2rem', marginTop: '-17rem', fontSize: '1.9rem', fontFamily:  "system-ui, 'Nunito', 'Source Sans Pro', sans-serif" , textShadow: '0.12rem 0.12rem 0.18rem rgba(0, 0, 0, 0.5)'}}>
        No more waiting, no more inconvenient appointments. <br />
        Get advice instantly from Vitawise, our medical diagnosis AI </h1>
        <a href="/signup" style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'inline-block',
              marginTop: '1.1rem',
              marginLeft: '1.2rem',
              padding: '0.6rem 1.2rem',
              fontSize: '0.96rem',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '0.6rem',
            }}
          >
            Register Now
          </button>
        </a>
      </div>
    </div>
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "4.8rem",
              marginBottom: "3rem",
              justifyContent: "flex-start",
            }}
          >
            {steps.map((step, index) => (
              <Grid item xs={0} md={4} key={index}>
                <StyledPaper
                  elevation={3}
                  sx={{
                    padding: theme.spacing(2),
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    width: "22rem",
                    height: "22.5rem",
                    backgroundImage: `url(${step.backgroundImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontSize: "2rem",
                      textShadow: "0.08rem 0.08rem 0.08rem #888",
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
                      textShadow: "0.03rem 0.03rem 0.03rem #888",
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
                      "0 0.8rem 1.7rem rgba(0, 0, 0, 0.4), 0 0.7rem 0.9rem rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontSize: "3.5rem",
                      textShadow: "0.18rem 0.18rem 0.24rem #888",
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
                      textShadow: "0.03rem 0.03rem 0.03rem #888",
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
