import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
    Typography,
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import NoDataFound from "src/component/NoDataFound";
import CommonDialog from "src/component/CommonDialog";


const useStyles = makeStyles(() => ({
    myProductsContainer: {
        padding: '30px',

        "& .MainTableBox":{
            "& .tableRow":{
                "& td":{
                    whiteSpace:'nowrap'
                }
            }
        }
    },
}));

export default function MyProducts() {
    const classes = useStyles();
    const Navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null);
    const localStorageArray = localStorage.getItem("apiResponses");
    let myProductsData = JSON.parse(localStorageArray) || [];

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(!deleteDialogOpen);
    }

    const handleDeleteProduct = () => {
        if (productToDelete !== null) {
            const updatedProducts = myProductsData.filter((_, index) => index !== productToDelete.index);
            localStorage.setItem("apiResponses", JSON.stringify(updatedProducts));
            myProductsData = updatedProducts;
            setDeleteDialogOpen(false);
        }
    }

    return (
        <div className={classes.myProductsContainer}>
            <div className='alignCenter'>
                <IconButton onClick={() => Navigate(-1)}>
                    <FaArrowLeft />
                </IconButton>
                <Typography variant='h3'>My Products</Typography>
            </div>
            <Box>
                <TableContainer>
                    <Table className="MainTableBox">
                        <TableHead>
                            <TableRow alignItems="center">
                                {[
                                    "Sr",
                                    "Product Name",
                                    "Product Price",
                                    "Product Category",
                                    "Product Description",
                                    "Action",
                                ].map((item, i) => (
                                    <TableCell key={i} style={{ whiteSpace: "nowrap" }}>
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                myProductsData.map((item, i) => (
                                    <TableRow key={i} className="tableRow">
                                        <TableCell>
                                            {i + 1}
                                        </TableCell>
                                        <TableCell>
                                            {item?.title ?? "--"}
                                        </TableCell>
                                        <TableCell>
                                            {item?.price ?? ""}
                                        </TableCell>
                                        <TableCell>
                                            {item?.category ?? ""}
                                        </TableCell>
                                        <TableCell>
                                            {item?.description.length > 20 ? item?.description.slice(0, 20) + "...." : item?.description}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="view">
                                                <IconButton
                                                    onClick={() => {
                                                        Navigate("/create-product", {
                                                            state: {
                                                                type: 'view',
                                                                data: item
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <FaEye />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title='edit'>
                                                <IconButton 
                                                onClick={() => {
                                                    Navigate("/create-product", {
                                                        state: {
                                                            type: 'edit',
                                                            data: item,
                                                            productIndex:i
                                                        }
                                                    })
                                                }}
                                                >
                                                    <FaEdit />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title='delete'>
                                                <IconButton onClick={() => {
                                                    setProductToDelete({ index: i, item });
                                                    setDeleteDialogOpen(true);
                                                }
                                                }>
                                                    <MdDelete />
                                                </IconButton>
                                            </Tooltip>

                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>

                    {myProductsData?.length === 0 && (
                        <NoDataFound />
                    )}
                </TableContainer>
            </Box>
            <CommonDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteProduct} type="delete" 
            />
        </div>
    )
}