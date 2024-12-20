import React, { useState } from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    //relatedAudioMedia styles
    relatedAudioMediaCard: {
        maxWidth: '1350px',
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: '43px',
        minWidth: '1200px',
        overflow: 'auto',

        "& .gridContainer": {
            flexWrap: 'nowrap',
            "& .fulilizogriditem": {
                [theme.breakpoints.down("md")]: {
                    marginBottom: "30px",
                },
            },
        },

        "& .gridContainerAll": {
            "& .fulilizogriditem": {
                [theme.breakpoints.down("md")]: {
                    marginBottom: "30px",
                },
            },
        },

        "& .cardContent": {
            position: "relative",
            marginTop: "80px",
            padding: "0 26px",
            width: "100%",
            maxWidth: "280px",
            height: "320px",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            backgroundColor: "#FFF",
            boxSizing: "border-box",
            marginBottom: '20px',

            "& p": {
                fontFamily: "poppins",
            },
            "& .imageContainer": {
                width: "100%",
                maxWidth: "235px",
                height: "150px",
                position: "absolute",
                top: "-75px",
                overflow: "hidden",

                "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "10px",
                },
            },

            "& .mediaInfo": {
                marginTop: "90px",
            },

            "& .postedDate": {
                color: theme.palette.text.extralight,
                textAlign: "center",
                fontSize: "12px",
                lineHeight: '18px',
                fontWeight: 400,
                fontFamily: 'Poppins',
                marginTop: '13px',
            },

            "& .artistName": {
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "left",
                marginTop: "9px",
                lineHeight: '24px',
                fontFamily: 'Poppins',
            },

            "& .genre": {
                fontSize: "15px",
                color: theme.palette.text.extralight,
                textAlign: "left",
                marginTop: "4px",
                lineHeight: '22.5px',
                fontFamily: 'Poppins',
            },

            "& .description": {
                fontSize: "13px",
                color: theme.palette.text.extralight,
                textAlign: "left",
                marginTop: "9px",
                wordBreak: "break-all",
                fontFamily: 'Poppins',
                lineHeight: '19.5px',
                maxWidth: "220px",
            },

            "& .btnContainer": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "250px",
                position: "absolute",
                bottom: "20px",

                "& .IconsContainer": {
                    "& img": {
                        cursor: "pointer",
                    },
                    "& .download": {
                        marginLeft: "8px",
                    },
                },

                "& .viewWidth": {
                    width: "100%",
                    display: "flex",
                    justifyContent: 'center',
                },

                "& button": {
                    width: "100%",
                    maxWidth: "150px",
                    height: "48px",
                    fontFamily: "Poppins",
                    textTransform: "uppercase",
                    border: "1.5px solid rgba(0, 0, 0, 0.25)",
                    fontWeight: 400,
                    color: theme.palette.error.main,
                },
            },
        },
    },

}));

export default function Card({
    type,
    length,
    allItems,
    electronicItems,
    jewelery,
    mensClothing,
    womensClothing
}) {
    const classes = useStyles();
    const Navigate = useNavigate();

    const handleViewBtnClick = (id) => {
        Navigate(`/view-product/${id}`);
    }

    return (
        <>
            {type === "electronics" && (
                <>
                    <Container className={classes.relatedAudioMediaCard}>
                        <Grid container className={length === 'All' ? "gridContainerAll" : "gridContainer"}>
                            {(length === "All" ? allItems : electronicItems.slice(0, 4)).map((item, i) => (
                                <Grid
                                    item
                                    xs={3}
                                    key={i}
                                    style={{ position: "relative" }}
                                >
                                    <Box className="cardContent">
                                        <Box className="imageContainer">
                                            <img
                                                src={
                                                    item?.image
                                                        ? item?.image
                                                        : "images/Trainer.png"
                                                }
                                                alt={item?.title}
                                            />
                                        </Box>

                                        <Box className="mediaInfo">
                                            <Typography variant="body1" className="postedDate">
                                                Category :{" "}
                                                {item?.category ? item?.category : "--"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                                className="artistName"
                                            >
                                                {item?.title && item?.title.length > 20
                                                    ? item?.title.slice(0, 20) + "..."
                                                    : item?.title}
                                            </Typography>
                                            <div className="alignCenter" style={{ justifyContent: 'space-between' }}>
                                                <Typography variant="body2" className="genre">
                                                    Price: {"₹"}{item?.price ?? ""}
                                                </Typography>

                                                <Typography variant="body2" className="genre">
                                                    Rating: {item?.rating?.rate ?? "--"}
                                                    <img src="/images/star_image.png" />
                                                </Typography>
                                            </div>


                                            <Typography variant="body2" className="description">
                                                {item?.description &&
                                                    item?.description.length > 80
                                                    ? item?.description.slice(0, 80) + "......"
                                                    : item?.description}
                                            </Typography>
                                        </Box>

                                        <Box className="btnContainer displayCenter">
                                            <div className="viewWidth">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleViewBtnClick(item?.id)}
                                                >
                                                    View
                                                </Button>
                                            </div>


                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </>
            )}

            {type === "jewelery" && (
                <>
                    <Container className={classes.relatedAudioMediaCard}>
                        <Grid container className={length === 'All' ? "gridContainerAll" : "gridContainer"}>
                            {(length === "All" ? allItems : jewelery.slice(0, 4)).map((item, i) => (
                                <Grid
                                    item
                                    xs={3}
                                    key={i}
                                    style={{ position: "relative" }}
                                >
                                    <Box className="cardContent">
                                        <Box className="imageContainer">
                                            <img
                                                src={
                                                    item?.image
                                                        ? item?.image
                                                        : "images/Trainer.png"
                                                }
                                                alt={item?.title}
                                            />
                                        </Box>

                                        <Box className="mediaInfo">
                                            <Typography variant="body1" className="postedDate">
                                                Category :{" "}
                                                {item?.category ? item?.category : "--"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                                className="artistName"
                                            >
                                                {item?.title && item?.title.length > 20
                                                    ? item?.title.slice(0, 20) + "..."
                                                    : item?.title}
                                            </Typography>
                                            <div className="alignCenter" style={{ justifyContent: 'space-between' }}>
                                                <Typography variant="body2" className="genre">
                                                    Price: {"₹"}{item?.price ?? ""}
                                                </Typography>

                                                <Typography variant="body2" className="genre">
                                                    Rating: {item?.rating?.rate ?? "--"}
                                                    <img src="/images/star_image.png" />
                                                </Typography>
                                            </div>


                                            <Typography variant="body2" className="description">
                                                {item?.description &&
                                                    item?.description.length > 80
                                                    ? item?.description.slice(0, 80) + "......"
                                                    : item?.description}
                                            </Typography>
                                        </Box>

                                        <Box className="btnContainer displayCenter">
                                            <div className="viewWidth">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleViewBtnClick(item?.id)}
                                                >
                                                    View
                                                </Button>
                                            </div>


                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </>
            )}

            {type === "mensClothing" && (
                <>
                    <Container className={classes.relatedAudioMediaCard}>
                        <Grid container className={length === 'All' ? "gridContainerAll" : "gridContainer"}>
                            {(length === "All" ? allItems : mensClothing.slice(0, 4)).map((item, i) => (
                                <Grid
                                    item
                                    xs={3}
                                    key={i}
                                    style={{ position: "relative" }}
                                >
                                    <Box className="cardContent">
                                        <Box className="imageContainer">
                                            <img
                                                src={
                                                    item?.image
                                                        ? item?.image
                                                        : "images/Trainer.png"
                                                }
                                                alt={item?.title}
                                            />
                                        </Box>

                                        <Box className="mediaInfo">
                                            <Typography variant="body1" className="postedDate">
                                                Category :{" "}
                                                {item?.category ? item?.category : "--"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                                className="artistName"
                                            >
                                                {item?.title && item?.title.length > 20
                                                    ? item?.title.slice(0, 20) + "..."
                                                    : item?.title}
                                            </Typography>
                                            <div className="alignCenter" style={{ justifyContent: 'space-between' }}>
                                                <Typography variant="body2" className="genre">
                                                    Price: {"₹"}{item?.price ?? ""}
                                                </Typography>

                                                <Typography variant="body2" className="genre">
                                                    Rating: {item?.rating?.rate ?? "--"}
                                                    <img src="/images/star_image.png" />
                                                </Typography>
                                            </div>


                                            <Typography variant="body2" className="description">
                                                {item?.description &&
                                                    item?.description.length > 80
                                                    ? item?.description.slice(0, 80) + "......"
                                                    : item?.description}
                                            </Typography>
                                        </Box>

                                        <Box className="btnContainer displayCenter">
                                            <div className="viewWidth">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleViewBtnClick(item?.id)}
                                                >
                                                    View
                                                </Button>
                                            </div>


                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </>
            )}

            {type === "womensClothing" && (
                <>
                    <Container className={classes.relatedAudioMediaCard}>
                        <Grid container className={length === 'All' ? "gridContainerAll" : "gridContainer"}>
                            {(length === "All" ? allItems : womensClothing.slice(0, 4)).map((item, i) => (
                                <Grid
                                    item
                                    xs={3}
                                    key={i}
                                    style={{ position: "relative" }}
                                >
                                    <Box className="cardContent">
                                        <Box className="imageContainer">
                                            <img
                                                src={
                                                    item?.image
                                                        ? item?.image
                                                        : "images/Trainer.png"
                                                }
                                                alt={item?.title}
                                            />
                                        </Box>

                                        <Box className="mediaInfo">
                                            <Typography variant="body1" className="postedDate">
                                                Category :{" "}
                                                {item?.category ? item?.category : "--"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                                className="artistName"
                                            >
                                                {item?.title && item?.title.length > 20
                                                    ? item?.title.slice(0, 20) + "..."
                                                    : item?.title}
                                            </Typography>
                                            <div className="alignCenter" style={{ justifyContent: 'space-between' }}>
                                                <Typography variant="body2" className="genre">
                                                    Price: {"₹"}{item?.price ?? ""}
                                                </Typography>

                                                <Typography variant="body2" className="genre">
                                                    Rating: {item?.rating?.rate ?? "--"}
                                                    <img src="/images/star_image.png" />
                                                </Typography>
                                            </div>


                                            <Typography variant="body2" className="description">
                                                {item?.description &&
                                                    item?.description.length > 80
                                                    ? item?.description.slice(0, 80) + "......"
                                                    : item?.description}
                                            </Typography>
                                        </Box>

                                        <Box className="btnContainer displayCenter">
                                            <div className="viewWidth">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleViewBtnClick(item?.id)}
                                                >
                                                    View
                                                </Button>
                                            </div>


                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </>
            )}

        </>
    );
}
