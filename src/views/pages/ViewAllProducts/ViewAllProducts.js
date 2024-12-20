import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'src/component/Card';
import toast from 'react-hot-toast';
import ApiConfig from 'src/config/APICongig';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { IconButton, Typography } from '@mui/material';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    viewAllProductsContainer: {
        padding: '30px',
        overflow:'auto',

        "& .leftArrow": {

            "& button": {
                color: 'red',
            },

            "& span": {
                textTransform: 'uppercase'
            }
        }
    }
}));

export default function ViewAllProducts() {
    const classes = useStyles();
    const { category } = useParams();
    const Navigate = useNavigate();
    const [data, setData] = useState([]);

    const getAllProductsByCategory = async (category) => {
        try {
           
            const res = await axios({
                method: 'GET',
                url: `${ApiConfig.getAllProductsByCategory}/${category}`
            });

            if (res?.data.length !== 0) {
                setData(res?.data);
            }

        } catch (error) {
            if (error.response) {
                
                toast.error(error.response?.data?.responseMessage);
            }
        }
    };

    useEffect(() => {
        getAllProductsByCategory(category);
    }, [category])

    return (
        <div className={classes.viewAllProductsContainer}>
            <div className='alignCenter leftArrow'>
                <IconButton onClick={() => Navigate(-1)}>
                    <FaArrowLeft />
                </IconButton>
                <Typography variant='h3'>All <span>{category}</span> Products</Typography>
            </div>

            {
                category === "electronics" && (
                    <Card allItems={data} length='All' type="electronics" />
                )
            }

            {
                category === "jewelery" && (
                    <Card allItems={data} length='All' type="jewelery" />
                )
            }

            {
                category === "men's clothing" && (
                    <Card allItems={data} length='All' type="mensClothing" />
                )
            }

            {
                category === "women's clothing" && (
                    <Card allItems={data} length='All' type="womensClothing" />
                )
            }

        </div>
    )
};