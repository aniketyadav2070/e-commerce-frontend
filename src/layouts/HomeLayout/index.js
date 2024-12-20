import React, { useEffect } from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import TopBar from "./TopBar";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundPosition: "unset",
    backgroundSize: "cover",
    minHeight: "100vh",
  },

  homeWrapper:{
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundPosition: "unset",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop:'96px',
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
  },
}));

export default function HomeLayout  ({ children })  {
  const classes = useStyles();
  const location = useLocation();

  let homeRoute = location.pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className={classes.root}>
      <TopBar />
      <div className={homeRoute ? classes.homeWrapper : classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.node,
};
