import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Grid, Box, Button, IconButton, TextField, FormHelperText, Select, MenuItem, CircularProgress } from "@mui/material";
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import ApiConfig from 'src/config/APICongig';


const useStyles = makeStyles((theme) => ({
    createProductContainer: {
        padding: '30px',
        "& .gridContainer": {

            "& .leftgrid": {

                "& .uploadFiles": {
                    height: '400px',
                    width: '100%',
                    borderRadius: '10px',
                    border: '1px solid',
                    position: 'relative',

                    "& .imageContainer": {
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',

                        '& img': {
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        },

                        "& button": {
                            position: 'absolute',
                            right: '0',
                            top: '0px',
                        }
                    }
                },
            },

            "& .rightgrid": {

                "& .textfield": {

                    "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: '1px',
                    }
                },

                "& .categorySelect": {
                    color: theme.palette.text.extralight
                },

                "& .submitBtnContainer": {
                    "& button": {
                        width: '100%',
                        maxWidth: '150px',
                    },
                }
            },
        },
    },
}));

const formValidationSchema = Yup.object().shape({
    productName: Yup.string()
        .required('Product name is required'),
    productImage: Yup.string()
        .nullable()
        .required('Product image is required'),
    productCategory: Yup.string()
        .required('Product category is required'),
    productPrice: Yup.string()
        .required('Product price is required')
        .matches(/^\d+(\.\d{1,2})?$/, 'Invalid price format')
        .test('is-positive', 'Price cannot be negative', value => {
            if (value) {
                const price = parseFloat(value);
                return price >= 0;
            }
            return true;
        }),

    productDescription: Yup.string()
        .required('Product description is required')
        .min(10, 'Description must be at least 10 characters long')
        .max(500, 'Description must be at most 500 characters long'),
});


export default function CreateProduct() {
    const classes = useStyles();
    const Navigate = useNavigate();
    const location = useLocation();
    const type = location?.state?.type ?? "";
    const locationData = location?.state?.data ?? "";
    const productIndex = location?.state?.productIndex ?? "";
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(locationData?.image ?? null);
    const [selectedCategory, setSelectedCategory] = useState(locationData?.category ? locationData?.category : "");
    const [loading, setLoading] = useState(false);
    const productCategories = [
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing",
    ];

    const formInitialSchema = {
        productName: locationData?.title ?? "",
        productPrice: locationData?.price ?? "",
        productDescription: locationData?.description ?? "",
        productImage: selectedImage,
        productCategory: selectedCategory,
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event, setFieldValue) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setFieldValue("productImage", reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const removeBtnClick = (setFieldValue) => {
        setSelectedImage(null);
        setFieldValue("productImage", "")
    }

    const handleProductCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    // const handleSubmit = async (values) => {
    //         try {
    //             setLoading(true);
    //             const res = await axios({
    //                 method: 'POST',
    //                 url: ApiConfig.getAllProducts,
    //                 data: {
    //                     title: values.productName,
    //                     price: values.productPrice,
    //                     description: values.productDescription,
    //                     image: selectedImage !== null ? selectedImage : "",
    //                     category: values.productCategory
    //                 }
    //             });
    //             if (Object.keys(res.data).length > 0) {
    //                 setLoading(false);
    //                 toast.success("Product created successfully!");
    //                 const storedResponses = JSON.parse(localStorage.getItem("apiResponses")) || [];
    //                 storedResponses.push(res.data);
    //                 localStorage.setItem("apiResponses", JSON.stringify(storedResponses));
    //                 Navigate("/my-products");
    //             }

    //         } catch (error) {
    //             if (error.response?.status === 413) {
    //                 setLoading(false);
    //                 toast.error("Please upload an small filesize image");
    //             }
    //         }   
    // };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            let updatedProducts = [];
            let storedResponses = JSON.parse(localStorage.getItem("apiResponses")) || [];
            if (type === "edit") {
                updatedProducts = [...storedResponses];
                updatedProducts[productIndex] = {
                    title: values.productName,
                    price: values.productPrice,
                    description: values.productDescription,
                    image: selectedImage || "",
                    category: values.productCategory
                };
            } else {
                const res = await axios.post(ApiConfig.getAllProducts, {
                    title: values.productName,
                    price: values.productPrice,
                    description: values.productDescription,
                    image: selectedImage || "",
                    category: values.productCategory
                });
                updatedProducts = [...storedResponses, res.data];
            }

            localStorage.setItem("apiResponses", JSON.stringify(updatedProducts));
            setLoading(false);
            toast.success(type === "edit" ? "Product updated successfully!" : "Product created successfully!");
            Navigate("/my-products");

        } catch (error) {
            if (error.response?.status === 413) {
                setLoading(false);
                toast.error("Please upload a smaller image file");
            }
        }
    };



    return (
        <div className={classes.createProductContainer}>
            <Box mb={2} className='displaySpacebetween'>
                <div className='alignCenter'>
                    <IconButton onClick={() => Navigate(-1)}>
                        <FaArrowLeft />
                    </IconButton>
                    <Typography variant='h3'>Add Product</Typography>
                </div>
                <Button variant='contained' onClick={() => Navigate("/my-products")}>My Products</Button>
            </Box>

            <Formik
                initialValues={formInitialSchema}
                initialStatus={{}}
                validationSchema={formValidationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    touched,
                    values,
                    setFieldValue
                }) => (
                    <Form>
                        <Grid container spacing={4} className='gridContainer'>
                            <Grid item xs={12} sm={12} md={6} className='leftgrid'>
                                <Box className='uploadFiles displayCenter'>
                                    {
                                        selectedImage && (
                                            <Box className='imageContainer'>
                                                <img src={selectedImage} />
                                                <IconButton
                                                    onClick={() => removeBtnClick(setFieldValue)}
                                                    disabled={type === "view"}
                                                >
                                                    <MdDelete />
                                                </IconButton>
                                            </Box>


                                        )
                                    }
                                    {
                                        !selectedImage && (
                                            <Box className='btnContainer'>
                                                <Button
                                                    variant='contained'
                                                    startIcon={<IoMdCloudUpload />}
                                                    onClick={handleButtonClick}
                                                >
                                                    Upload Image                                                </Button>
                                                <input
                                                    type='file'
                                                    accept="image/*"
                                                    value={values.productImage}
                                                    name='productName'
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRef}
                                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                                />
                                            </Box>
                                        )
                                    }
                                </Box>

                                <FormHelperText error className='helpertext'>
                                    {touched.productImage && errors.productImage}
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} className='rightgrid'>
                                <Box>
                                    <Box className='productNameContainer'>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            type='text'
                                            placeholder='Enter Product Name'
                                            name='productName'
                                            className='textfield'
                                            disabled={type === "view"}
                                            inputProps={{ maxLength: 256 }}
                                            value={values.productName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                        <FormHelperText error className='helpertext'>
                                            {touched.productName && errors.productName}
                                        </FormHelperText>
                                    </Box>

                                    <Box className='productPriceContainer' mt={2}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            type='text'
                                            placeholder='Enter Product Price'
                                            inputProps={
                                                {
                                                    maxLength: 5,
                                                    pattern: "[0-9]*",
                                                    inputMode: 'numeric'
                                                }
                                            }
                                            name='productPrice'
                                            className='textfield'
                                            disabled={type === "view"}
                                            value={values.productPrice}
                                            onChange={(e) => {
                                                const { value } = e.target;
                                                const onlyNums = value.replace(/[^0-9]/g, '');
                                                handleChange({
                                                    target: {
                                                        name: 'productPrice',
                                                        value: onlyNums
                                                    }
                                                });
                                            }}
                                            onBlur={handleBlur}
                                        />
                                        <FormHelperText error className='helpertext'>
                                            {touched.productPrice && errors.productPrice}
                                        </FormHelperText>
                                    </Box>

                                    <Box className='productCategoryContainer' mt={2}>
                                        <Select
                                            fullWidth
                                            variant='outlined'
                                            name="productCategory"
                                            className='textfield categorySelect'
                                            displayEmpty
                                            disabled={type === "view"}
                                            value={values.productCategory}
                                            onChange={(e) => {
                                                setFieldValue("productCategory", e.target.value)
                                                handleProductCategoryChange(e)
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value="" style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Select Product Category</MenuItem>
                                            {
                                                productCategories.map((category, i) => {
                                                    return (
                                                        <MenuItem value={category} key={i}>
                                                            {category.toUpperCase()}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>

                                        <FormHelperText error className='helpertext'>
                                            {touched.productCategory && errors.productCategory}
                                        </FormHelperText>
                                    </Box>

                                    <Box className='productDescriptionContainer' mt={2}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            placeholder='Enter Product Description'
                                            className='textfield'
                                            multiline
                                            disabled={type === "view"}
                                            inputProps={{ maxLength: 500 }}
                                            rows={4}
                                            name='productDescription'
                                            value={values.productDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                        <FormHelperText error className='helpertext'>
                                            {touched.productDescription && errors.productDescription}
                                        </FormHelperText>
                                    </Box>

                                    <Box className='submitBtnContainer displayCenter' mt={4}>
                                        <Button variant='contained' type='submit' disabled={
                                            !values.productName || !values.productDescription ||
                                            !values.productCategory || !values.productImage ||
                                            !values.productPrice || type === "view"}>Submit{" "}
                                            {loading && <CircularProgress size={20} color='secondary' />}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                )}

            </Formik>
        </div>
    )
}