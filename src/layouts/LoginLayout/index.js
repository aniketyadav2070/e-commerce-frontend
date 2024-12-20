import React from "react";
import { Box, Grid, Hidden } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  loginLayoutBox: {
    backgroundImage: "url(images/auth_bg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
    height: 'auto',
    width: "100%",
    overflow: 'hidden',

    "& .loginLayoutContainer": {
      [theme.breakpoints.down("md")]: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },

    "& .leftGridLoginLayout": {

    },

    "& .rightGridLoginLayout": {
      background: "rgba(255,255,255,0.90)",
    },

    "& .loginContentLayoutBox": {
      height: "100%",
      width: "100%",
      maxWidth: "1100px",
      minHeight: "655px",
    },
  },
}));

export default function LoginLayout({ children }) {

  const classes = useStyles();

  return (
    <Box className={classes.loginLayoutBox}>
      <Box className="loginContentLayoutBox displayCenter">
        <Grid container className="loginLayoutContainer">
          <Hidden mdDown>
            <Grid item xs={12} sm={12} md={6} className="leftGridLoginLayout">
              <Box height="100%" width="100%">
                <img
                  src="images/login_side_image.svg"
                  alt="headphone"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={9} md={6} className="rightGridLoginLayout">
            <Box className="childrenBox">{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};
