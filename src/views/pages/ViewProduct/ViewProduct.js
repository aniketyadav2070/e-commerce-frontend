import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import axios from "axios"
import ApiConfig from "src/config/APICongig";
import toast from "react-hot-toast";
import { makeStyles } from "@mui/styles";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataLoader from 'src/component/DataLoader';

const useStyles = makeStyles((theme) => ({
    viewProductContainer: {
        padding: '30px',

        "& .leftArrow": {
            marginBottom: '30px',
            "& button": {
                color: 'red'
            }
        },

        "& .gridContainer": {

            "& .leftgrid": {

                "& .imageContainer": {
                    width: '100%',
                    height: '400px',

                    "& img": {
                        objectFit: 'contain',
                        height: '100%',
                        width: '100%'
                    }
                }
            },

            "& .rightgrid": {
                "& .productinfo": {

                    "& h6": {
                        color: theme.palette.text.extralight
                    },

                    "& span": {
                        fontWeight: 600,
                        color: '#262626'
                    },

                    "& .description": {
                        "& h6": {
                            color: theme.palette.text.extralight
                        }
                    },

                }

            },
        },
    }
}));

export default function ViewProduct() {
    const classes = useStyles();
    const { id } = useParams();
    const Navigate = useNavigate();
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(false);

    const viewProduct = async (id) => {
        try {
            setLoading(true)
            const res = await axios({
                method: 'GET',
                url: `${ApiConfig.viewProduct}/${id}`,
            });
            if (res?.data.length !== 0) {
                setLoading(false)
                setProductData(res?.data);
            }

        } catch (error) {
            if (error.response) {
                setLoading(false)
                toast.error(error.response?.data?.responseMessage);
            }
        }
    };

    useEffect(() => {
        viewProduct(id)
    }, [id]);

    return (
        <div className={classes.viewProductContainer}>
            <div className='alignCenter leftArrow'>
                <IconButton onClick={() => Navigate(-1)}>
                    <FaArrowLeft />
                </IconButton>
                <Typography variant='h3'>View Product</Typography>
            </div>

            {
                loading ? <DataLoader /> : (
                    <Grid container spacing={4} className="gridContainer">
                        <Grid item xs={12} sm={12} md={6} className="leftgrid">
                            <Box className="imageContainer">
                                <img src={productData?.image ? productData?.image : ""} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} className='rightgrid'>
                            <Box className='productinfo'>
                                <Typography variant="h3">{productData?.title ?? "--"}</Typography>

                                <Typography variant="h5"><span>Category: </span>{productData?.category ?? "--"}</Typography>

                                <Typography variant="h6"><span>Price:</span> {"₹"} {productData?.price ?? "--"}</Typography>

                                <Typography variant="h6"><span>Rating:</span> {productData?.rating?.rate ?? "--"}
                                    {" "}   <img src="/images/star_image.png" />
                                </Typography>

                                <Typography variant="h6"><span>Stock: </span>{productData?.rating?.count ?? "--"}
                                    {" "}  Units
                                </Typography>

                                <div className="description">
                                    <Typography variant="h3">Description</Typography>
                                    <Typography variant="h6">{productData?.description ?? "--"}</Typography>
                                </div>
                            </Box>
                        </Grid>

                    </Grid>
                )
            }

        </div>
    );
};
