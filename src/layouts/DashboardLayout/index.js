import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import SettingsContext from "src/context/SettingsContext";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#0B1426",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
  },
  rootLight: {
    background: "#ebebeb;",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
  },
  wrapper1: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    position: "relative",
    paddingTop: 70,
    minHeight: "calc(100vh - 75px)",

    "@media (max-width:767px)": {
      paddingTop: "70px !important",
    },
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    position: "relative",
    paddingTop: 70,
    minHeight: "calc(100vh - 70px)",
  
    "@media (max-width:767px)": {
      paddingTop: "70px !important",
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "55px 25px 25px 0px",

  },
  contentKyc: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "55px 25px 25px 25px",

  }
}));

export default function DashboardLayout({ children }) {
  const classes = useStyles();
  const location = useLocation();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const themeSeeting = useContext(SettingsContext);
  const User = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState("Arbitrage");

  useEffect(() => {
    if (location) {
      if (
        location.pathname === "/sniper-dashboard" ||
        location.pathname === "/bot-setting" ||
        location.pathname === "/sniper-transactions"
      ) {
        setSelectedTab("Sniper");
      }
    }
  }, [location]);

  return (
    <div className={`${themeSeeting.settings.theme === "LIGHT" ? classes.rootLight : classes.root}`}
    >
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <NavBar
        tabView={selectedTab}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        setSelectedTab={(item) => setSelectedTab(item)}
      />
      <div
        className={
          themeSeeting.settings.theme === "DARK"
            ? `${classes.wrapper1}`
            : `${classes.wrapper}`
        }
      >
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};