import React, { useContext } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
    DialogMan: {

        "& .MuiDialog-paperWidthXs": {
            width: '100%',
            maxWidth: "430px !important",
        },

        "& .titleBox": {
            background: "#767676",
            position: 'relative',
            textAlign: "center",
            padding: "18px 0px",

            "& .icon": {
                color: "#fff",
                alignItems: "end",
                position: "absolute",
                top: "0px",
                right: "0px",
            },
        },

        "& .MuiTypography-h5": {
            color: "#fff",
        },

        "& .MuiTypography-body2": {
            color: "rgba(0, 0, 0, 0.87)",
            fontFamily: "Open Sans",
        },

        "& .imgBox": {
            paddingTop: "20px",
        },


        "& .actionBtn": {
        },
    },
}));

export default function CommonDialog({ open, onClose, type, onConfirm }) {
    const classes = useStyles();
    const auth = useContext(AuthContext);

    const handleYesBtnClick = () => {
        if (type === "logout") {
            auth.updateIsLoggedIn(false);
        }

        if (type === 'delete') {
            onConfirm();
        }
    };

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            className={classes.DialogMan}
            open={open}
            onClose={() => onClose()}
        >

            <Box className="titleBox">
                {
                    type === "logout" && (
                        <Typography variant="h5">Logout</Typography>
                    )
                }

                {
                    type === "delete" && (
                        <Typography variant="h5">Delete</Typography>
                    )
                }

                <IconButton className="icon" onClick={() => onClose()}>
                    <CloseIcon />
                </IconButton>

            </Box>
            <DialogContent>
                <Box align="center" className="imgBox">
                    <img src="images/Logout.svg" className="img" />
                    {
                        type === "logout" && (
                            <Typography variant="body2">
                                Are you sure, you want to logout?
                            </Typography>
                        )
                    }

                    {
                        type === "delete" && (
                            <Typography variant="body2">
                                Are you sure, you want to delete this product?
                            </Typography>
                        )
                    }
                </Box>
            </DialogContent>
            <Box mt={2} mb={2} className="displayCenter actionBtn">
                <Button
                    color='primary'
                    variant="contained"
                    className="btn"
                    onClick={() => {
                        onClose();
                    }}
                >
                    No
                </Button>
                &nbsp; &nbsp;
                <Button
                    color='primary'
                    variant="contained"
                    className="btn"
                    onClick={() => {
                        handleYesBtnClick();
                        onClose();
                    }}
                >
                    Yes
                </Button>
            </Box>

        </Dialog>
    )
}