import React from 'react';
import { Typography, IconButton } from '@mui/material';
import Card from "src/component/Card";
import { FaArrowRight } from "react-icons/fa";
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    electronicsContainer: {
        overflow:'auto',
        "& .view-more": {
            "& button": {
                color: '#ED2124'
            }
        },
    },
}));
export default function MensClothing({ mensClothing }) {
    const classes = useStyles()
    const Navigate = useNavigate();

    const handleArrowBtnClick = (category) => {
        Navigate(`/view-all-products/${category}`);
    };

    return (
        <div className={classes.electronicsContainer}>

            <div className='displaySpacebetween'>
                <Typography variant='h3'>Best In Men's Clothing</Typography>
                <div className='view-more alignCenter'>
                    <Typography variant='h5'> View More</Typography>
                    <IconButton onClick={() => handleArrowBtnClick("men's clothing")}>
                        <FaArrowRight />
                    </IconButton>
                </div>
            </div>
            <Card type="mensClothing" mensClothing={mensClothing} />
        </div>
    )
}