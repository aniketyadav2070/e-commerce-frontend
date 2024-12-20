import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import LogoBox from "src/component/LogoBox";


const useStyles = makeStyles((theme) => ({
  footerSection: {
    position: "relative",
    padding: "50px 0px 30px 0",
    zIndex: "2",
    overflow: " hidden",
    background: "rgba(255, 255, 255, 0.02)",
    borderTop: "1px solid rgba(0, 0, 0, 0.25)",
   
    "& .container": {
      maxWidth: "1500px",
    },

    "& .copy": {
      fontSize: "12px",
      borderTop: "2px solid #D6D6D6",
      textAlign: "center",
      fontWeight: "300",
      paddingTop: "23px",
    },

    "& ul": {
      paddingLeft: "0",
      "& li": {
        paddingLeft: "0",
        alignItems: "center",
        color: theme.palette.text.gray,
        fontSize: "14px",
        fontWeight: "300",
        display: "block",
        "& svg": {
          marginRight: "10px",
          color: "#fe2efe",
          fontSize: "15px",
        },
      },
    },

    "& svg": {
      color: "rgba(255 255 255 / 30%)",
      fontSize: "15px",
    },

    "& p": {
      color: theme.palette.text.gray,
    },

    "& h6": {
      color: "#000000",
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
      },
    },

    "& a": {
      display: "flex",
      fontSize: "14px",
      alignItems: "center",
      fontWeight: "400",
      paddingLeft: "0px",
      paddingRight: "0px",
      textDecoration: "none",
      fontFamily: "'Calibri', sans-serif",
      color: "#484848",
      padding: "3px",
      paddingBottom: "10px",
      [theme.breakpoints.only("xs")]: {
        fontSize: "11px",
      },
      "&:hover": {
        color: "#EC1F24",
        textDecoration: "none",
        "& svg": {
          color: "red",
          fontSize: "15px",
        },
      },
    },
  },
  iconbtn: {
    "& .MuiIconButton-root": {
      border: "0.5px solid #78819F",
      marginRight: "8px",
      marginBottom: "8px",
      borderRadious: "10px",
      borderRadius: "7px",
      width: "30px",
      height: "30px",
      padding: "0px",
      "& svg": {
        color: "#FF7F26",
        fontSize: "18px",
        "& :hover": {
          "& svg": {
            color: "#EC1F24",
            fontSize: "18px",
          },
        },
      },
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  const date = new Date();


  return (
    <>
      <Box className={classes.footerSection}>
        <Container maxWidth="lg" className="container">
          <Grid container spacing={3}>

            <Grid item xs={12} sm={12} md={3}>
              <Box style={{ width: "171px", height: "56px" }}>
                <LogoBox />
              </Box>
              
              <div className="communityContainer">
                  <Typography
                    variant="h6"
                    color="primary"
                    style={{ marginBottom: "15px" }}
                  >
                    Community
                  </Typography>

                  <Box className={classes.iconbtn} display="flex">
                    <IconButton
                      href="https://www.facebook.com/"
                      target="_blank"
                    >
                      <FaFacebookF className={classes.socialIcon} />
                    </IconButton>
                    <IconButton
                      href="https://twitter.com/i/flow/login"
                      target="_blank"
                    >
                      <TwitterIcon className={classes.socialIcon} />
                    </IconButton>

                    <IconButton href="https://telegram.org/" target="_blank">
                      <FaTelegramPlane className={classes.socialIcon} />
                    </IconButton>

                    <IconButton href="https://www.youtube.com/" target="_blank">
                      <YouTubeIcon className={classes.socialIcon} />
                    </IconButton>

                    <IconButton
                      href=" https://www.instagram.com/"
                      target="_blank"
                    >
                      <InstagramIcon className={classes.socialIcon} />
                    </IconButton>
                  </Box>
                </div>
            </Grid>
          </Grid>

          <Box className="copy displaySpacebetween" mt={4}>
            <Box>
              <Typography
                variant="body1"
                style={{ fontWeight: "400", color: "#484848" }}
              >
                © {date.getFullYear()} E-Commerce | Best Shpopping App
              </Typography>
            </Box>
            <Box className="alignCenter" style={{ gap: "20px" }}>
              <Typography
                variant="body1"
                style={{ fontWeight: "400", color: "#484848", padding: "0" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "400", color: "#484848", padding: "0" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
