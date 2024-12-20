import { Box, Typography } from "@mui/material";
import {makeStyles} from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  imgBox: {
    maxWidth: "300px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "200px",
      width: "100%",
    },
  }
 
}));
export default function NoDataFound({ text }) {
  const classes = useStyles();
  return (
    <Box className="displayCenter" mt={6} mb={4}>
      <Box>
        <img className={classes.imgBox} src="images/nodatafound.png" alt="" />
      </Box>
    </Box>
  );
}
