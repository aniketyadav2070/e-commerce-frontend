import React from 'react';
import { IconButton, Typography } from '@mui/material';
import Card from "src/component/Card";
import { FaArrowRight } from "react-icons/fa";
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { Category } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    electronicsContainer: {
        overflow:'auto',

        "& .view-more": {
            "& button": {
                color: '#ED2124'
            },
        },
    },
}));

export default function Electronics({ electronicItems }) {
    const classes = useStyles()
    const Navigate = useNavigate();

    const handleArrowBtnClick = (category) => {
        Navigate(`/view-all-products/${category}`);
    };

    return (
        <div className={classes.electronicsContainer}>
            <div className='displaySpacebetween'>
                <Typography variant='h3'>Best In Electronics</Typography>

                <div className='view-more alignCenter'>
                    <Typography variant='h5'>View More</Typography>
                    <IconButton onClick={() => handleArrowBtnClick("electronics")}>
                        <FaArrowRight />
                    </IconButton>
                </div>

            </div>

            <Card type="electronics" electronicItems={electronicItems} />
        </div>
    )
}