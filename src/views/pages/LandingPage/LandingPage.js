import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Banner from "./Banner";
import axios from 'axios';
import ApiConfig from 'src/config/APICongig';
import toast from 'react-hot-toast';
import Electronics from "./Electronics"
import Jewelery from "./Jewelery";
import MensClothing from "./MensClothing";
import WomensClothing from "./WomensClothing";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MenuItem, Select } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    landingPageContainer: {
        "& .section": {
            padding: '30px',
        },

        "& .selectFilter":{
            width:'100%',
            maxWidth:'150px',

            "& .MuiOutlinedInput-notchedOutline":{
                borderWidth:'1px',
            },
        },
    }
}));

export default function LandingPage() {
    const classes = useStyles();
    const [allProducts, setAllProducts] = useState([]);
    const [selectedFilter , setSelectedFilter] = useState('');

    const getAllProducts = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: ApiConfig.getAllProducts,
                params:{
                    sort:selectedFilter ?? ""
                }
            });

            setAllProducts(res?.data);
        } catch (error) {
            if (error.response) {
                toast.error(error.response?.data?.responseMessage);
            }
        }
    };

    const electronics = allProducts.filter((product) => {
        return product?.category === "electronics"
    });

    const jewelery = allProducts.filter((product) => {
        return product?.category === "jewelery"
    });

    const mensClothing =
        allProducts.filter((product) => {
            return product?.category === "men's clothing"
        });

    const womensClothing = allProducts.filter((product) => {
        return product?.category === "women's clothing"
    });

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value)
    }

    useEffect(() => {
        getAllProducts();
    }, [selectedFilter]);

    useEffect(() => {
        AOS.init({
            once: false
        });
    }, [selectedFilter]);



    return (
        <div className={classes.landingPageContainer}>

            <section>
                <Banner />
            </section>

            <div className='section displayEnd'>
                <Select
                variant='outlined'
                value={selectedFilter}
                displayEmpty
                onChange={handleFilterChange}
                className='selectFilter'
                >
                    <MenuItem value="">Filter</MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>

                </Select>
            </div>

            <div className='section' data-aos="flip-left" data-aos-duration="500">
                <Electronics electronicItems={electronics} />
            </div>

            <div className='section' data-aos="flip-right" data-aos-duration="500">
                <Jewelery jewelery={jewelery} />
            </div>

            <div className='section'  data-aos="flip-up" data-aos-duration="500">
                <MensClothing mensClothing={mensClothing} />
            </div>

            <div className='section'  data-aos="flip-down" data-aos-duration="500">
                <WomensClothing womensClothing={womensClothing} />
            </div>

        </div>
    );
};