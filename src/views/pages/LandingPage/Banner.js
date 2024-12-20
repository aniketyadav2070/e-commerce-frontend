import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import Slider from "react-slick";
import {makeStyles} from "@mui/styles";



const useStyles = makeStyles((theme) => ({
    mulimediaResourceContainer: {
        padding: "80px 0 85px 0",
        background: "#010824",
        "& .micImg": {
            position: "absolute",
            left: "123px",
            top: "106px",
            width: "100%",
            maxWidth: "95px",
            height: "83px",
            "@media (max-width:1000px)": {
                display:'none'
               },
        },

        "& .starsImg": {
            position: "absolute",
            right: "50px",
            top: "157px",
            width: "100%",
            maxWidth: "135px",
            height: "117px",

            "@media (max-width:1000px)": {
               display:'none'
              },
        },

        "& .multimediaContainer": {
            "& .multimediaTextData": {
                textAlign: "center",

                "& .heading": {
                    fontSize: "100px",
                    fontWeight: 700,
                    lineHeight:'100px',
                    textTransform:'uppercase',
                    "@media (max-width:767px)": {
                        fontSize:'50px !important',
                        lineHeight:'50px !important',
                       },
                },

                "& .sub-heading": {

                    fontFamily: "Gruppo, sans-serif",

                    textTransform: "uppercase",
                    fontFamily: 'Gruppo',
                    color: "#fff",
                    marginTop: "30px",
                    fontWeight: 400,
                },

                "& h4": {
                    color: "#fff",
                    marginTop: "20px",
                    fontWeight: 400,
                },

                "& button": {
                    marginTop: "32px",
                    height: "53px",
                    width: "100%",
                    maxWidth: "219px",
                },
            },

            "& .leftgrid":{

                "@media(max-width:1200px)":{
                    display:'flex',
                    justifyContent:'center',
                },

                "& .leftgridbbox": {
                    width: "100%",
                    maxWidth: "304px",
                    [theme.breakpoints.down("md")]: {
                        margin: "0 auto",
                    },
    
                    "& .lgFirstImgContainer": {
                        width: "100%",
                        height: "81px",
    
                        "& img": {
                            width: "100%",
                            height: "100%",
                        },
                    },
    
                    "& .lgSecondImgContainer": {
                        width: "100%",
                        height: "295px",
                        marginTop: "24px",
    
                        "& img": {
                            width: "100%",
                            height: "100%",
                        },
                    },
                },
            },

          

            "& .middlegridbbox": {
                [theme.breakpoints.down("md")]: {
                    margin: "0 auto",
                    maxWidth: "629px",
                },

                "& .slickCarousel": {
                    "& .slick-dots": {
                        bottom: "-75px",
                        "@media (max-width:1200px)": {
                           display:'none !important'
                           },

                        [theme.breakpoints.down("md")]: {
                            bottom: "-50px",
                        },
                    },
                },
            },

            "& .rightgrid":{

                "@media(max-width:1200px)":{
                    display:'flex',
                    justifyContent:'center',
                },

                "& .rightgridbbox": {
                    width: "100%",
                    maxWidth: "304px",
                    [theme.breakpoints.down("md")]: {
                        margin: "0 auto",
                    },
                    "& .rgFirstImgContainer": {
                        width: "100%",
                        height: "295px",
    
                        "& img": {
                            width: "100%",
                            height: "100%",
                        },
                    },
    
                    "& .rgSecondImgContainer": {
                        width: "100%",
                        height: "81px",
                        marginTop: "24px",
    
                        "& img": {
                            width: "100%",
                            height: "100%",
                        },
                    },
                },
            },
        },
    },
}));

const imageData = [
    {
        img: "images/Coffee 1.jpg",
    },

    {
        img: "images/Coffee 2.webp",
    },

    {
        img: "images/Coffee.webp",
    },
    
    {
        img: "images/Coffee 3.jpg",
    },
    
    {
        img: "images/Coffee 4.jpg",
    },

    {
        img: "images/Coffee 5.webp",
    },

    {
        img: "images/Coffee 6.webp",
    },

    {
        img: "images/Coffee 7.webp",
    },

    {
        img: "images/Coffee 8.webp",
    },
];

export default function Banner() {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        customPaging: (i) => (
            <Box
                style={{
                    width: "12px",
                    height: "12px",
                    margin: "0 4px",
                    borderRadius: "50%",
                    backgroundColor: i === currentSlide ? "red" : "#E6E6E6",
                }}
            />
        ),
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    return (
        <Box className={classes.mulimediaResourceContainer}>
            <Container maxWidth="lg" className="multimediaContainer">
                <img src="images/mic_landing.svg" alt="micimage" className="micImg" />

                <Box className="multimediaTextData">
                    <Typography variant="h1" color="textSecondary" className="heading">
                    Welcome to our Ecommerce Store
                    </Typography>

                    <Typography variant="h1" className="sub-heading">
                    Discover the Best Deals Online
                    </Typography>

                    <Typography variant="h4">
                    Shop the latest trends in fashion, electronics, home decor, and more!
                    </Typography>

                   
                </Box>

                <img
                    src="images/stars_landing_top.svg"
                    alt="micimage"
                    className="starsImg"
                />

                <Box mt={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={3} className="leftgrid">
                            <Box className="leftgridbbox">
                                <div className="lgFirstImgContainer">
                                    <img src="images/multimedia_left_top.png" alt="mic" />
                                </div>

                                <div className="lgSecondImgContainer">
                                    <img src="images/multimedia_left_bottom.png" alt="mic" />
                                </div>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Box className="carouselContainer middlegridbbox">
                                <Slider {...settings} className="slickCarousel">
                                    {imageData.map((item, i) => (
                                        <Box key={i}>
                                            <img
                                                src={item.img}
                                                alt="banner"
                                                style={{
                                                    width: "100%",
                                                    height: "398px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Slider>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={3} className="rightgrid">
                            <Box className="rightgridbbox">
                                <div className="rgFirstImgContainer">
                                    <img src="images/multimedia_right_top.png" alt="mic" />
                                </div>
                                <div className="rgSecondImgContainer">
                                    <img src="images/multimedia_right_bottom.png" alt="mic" />
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}







