import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SettingsContext from "src/context/SettingsContext";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  imgSection: {
    "& img": {
      // maxWidth: "230px",
      width: "90px",
      // height:"68px",
      innerHeight: "90px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
    },

    "@media(max-width:991px)": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      // margin: "0 auto",
    },
  },
}));
const Logo = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const themeSeeting = useContext(SettingsContext);

  return (
    <Box className={classes.imgSection}>
      {themeSeeting.settings.theme === "DARK" && (
        <img
          onClick={() => navigate('/signup')}
          src="/images/Logo.png"
          alt="Logo"
          style={{ cursor: "pointer", width: "112px", }}
          {...props}
        />
      )}
      {themeSeeting.settings.theme === "LIGHT" && (
        <img
          onClick={() => navigate("/")}
          src="/images/Logo.png"
          alt="Logo"
          style={{ cursor: "pointer", width: "112px",  }}
          {...props}
        />
      )}
    </Box>
  );
};

export default Logo;
