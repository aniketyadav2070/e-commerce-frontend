import React from "react";
import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import SettingsContext from "src/context/SettingsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2000,
  },

  loader1: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loader: {
    maxWidth: "500px",
    padding: "0px 30px",
  },
}));

export default function PageLoading() {
  const classes = useStyles();
  const themeSeeting = React.useContext(SettingsContext);

  return (
    <div className={classes.root}>
      <Box className={classes.loader1}>
        <Box className={classes.loader}>
          {themeSeeting.settings.theme === "DARK" ? (
            <>
              <img
                src="images/company_logo.png"
                alt="loader"
                style={{ width: "100%" }}
              />
            </>
          ) : (
            <>
              <img
                src="/images/company_logo.png"
                alt="loader"
                style={{ maxWidth: "200px" }}
              />
            </>
          )}
        </Box>
      </Box>
    </div>
  );
}
