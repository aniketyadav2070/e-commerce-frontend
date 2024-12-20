import React from 'react'
import {
    Box,
} from "@mui/material";
import { makeStyles} from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    logobox: {
        width: '117px',
        height: '38px',
        cursor:'pointer',

        "& img": {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
    },
}));

export default function LogoBox() {
    const classes = useStyles();
    const Navigate = useNavigate();
    return (
        <Box className={classes.logobox} onClick={() => Navigate("/")}>
            <img src="/images/company_logo.png" alt="erwr" />
        </Box>
    )
}
