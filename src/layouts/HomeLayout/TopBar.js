import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  MenuItem,
  Box,
  Container,
  Typography,
  TextField
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { UserContext } from "src/context/User";
import { AuthContext } from "src/context/Auth";
import { FaBell } from "react-icons/fa";
import LogoBox from "src/component/LogoBox";
import { CiSearch } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { HiLogin } from "react-icons/hi";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import toast from "react-hot-toast";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { CiShoppingBasket } from "react-icons/ci";
import CommonDialog from "src/component/CommonDialog";


const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "400",
    fontFamily: "Open Sans",
    borderRadius: 0,
    minWidth: "auto",
    color: "#262626",
    // padding: "0px 20px",
    textDecoration: " none",
    "@media (max-width: 900px)": {
      fontStyle: "normal",
      letterSpacing: "-0.6px",
      lineHeight: "24px",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&.active": {
      color: "#EC1F24",
    },
    "&:hover": {
      color: "#EC1F24",
    },
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 0,
    flexGrow: 1,
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    width: "140px",
  },
  drawerContainer: {
    padding: "20px 0px 20px 20px",
    height: "100%",
    background: "#ffffff",
    color: "#262626",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: '20px',
  },
  drawericon: {
    color: "#000",
    marginLeft: "0px !important",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
      width: "75px",
    },
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "500",
    paddingLeft: "10px",
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },

  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
  },
  search: {
    height: "40px",
    position: "relative",
    color: "#ABABAB",
    borderRadius: "100px",
    backgroundColor: "#DAF4FF",
    border: "1px solid #fff",
    marginLeft: 20,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: "0px 9px",
    color: "#000000",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontSize: "16px",
    width: "100%",
  },
  inputInput: {
    padding: "8px 6px 8px 0px",
    fontSize: "12px",
    marginTop: "-2px",
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#000",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
  menuButton1: {
    paddingLeft: "0",
  },
  searcBox: {
    backgroundColor: "#DAF4FF",
    borderRadius: " 50px",
  },
  menuMobile1: {
    padding: "15px 0",
    "& h4": {
      fontSize: "14px !important",
      lineHeight: " 17px",
      color: theme.palette.text.main,
      margin: "0 8px",
      fontWeight: "400",
      [theme.breakpoints.only("xs")]: {
        fontSize: "12px !important",
      },
    },
    "& svg": {
      color: theme.palette.text.main,
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& figure": {
      margin: 0,
      width: 40,
      height: 40,
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
      "& img": {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
      },
    },
  },
  menuMobile2: {
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: theme.palette.background.dark,
      margin: "0 5px",
      whiteSpace: "pre",
      fontWeight: "300",
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "& svg": {
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: "#ff3965",
    },
  },
  menuMobiledrawer: {
    "& h4": {
      fontSize: "16px",
      lineHeight: " 17px",
      color: "#000",

      whiteSpace: "pre",
      fontWeight: "400",
    },
  },
  searchdiaogBox: {
    "& .MuiDialogContent-root": {
      minHeight: "calc(100vh - 100px)",
      [theme.breakpoints.only("xs")]: {
        padding: "20px 0 !important",
      },
    },
    "& .MuiDialog-paperScrollPaper": {
      overflowY: "auto",
    },
  },
  afterLogin: {
    display: "flex",
    alignItems: "center",
    gap: "24px",

    "& h6": {

      "& span": {
        fontWeight: 600,
      },
    },

    "& .MuiIconButton-root": {
      padding: "0",
      color: theme.palette.text.primary,
    },

    "& p": {
      cursor: "pointer",
    },
  },

  mobileview:{
    display:'flex',
    flexDirection:'column',
    gap:'20px',
  },
  searchContainer: {
    width: '100%',
    maxWidth: '400px',

    "& .searchTextfield": {
      width: '100%',

      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: '1px',
      }
    },
  },
  categoryBox: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',

    "& .MuiIconButton-root": {
      "&:hover": {
        backgroundColor: 'transparent'
      }
    }

  },

  createProduct: {

  },

  drawerCategoryContainer: {
    padding: '20px',

    "& h4": {
      margin: '20px 0'
    },

    "& p": {
      margin: '10px 0',
      cursor: 'pointer',

      "&:hover": {
        color: 'red',
      },
    }
  }
}));

export default function Header() {
  const {
    menuMobile,
    menuButton,
    menuButton1,
    divstake,
    toolbar,
    drawerContainer,
    drawericon,
    logoDrawer,
    mainHeader,
    afterLogin,
    mobileview,
    searchContainer,
    categoryBox,
    createProduct,
    drawerCategoryContainer
  } = useStyles();

  const Navigate = useNavigate();
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem("username");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const handleLogoutClose = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };

  const handleCategoryDrawerClick = () => {
    setCategoryDrawerOpen(!categoryDrawerOpen);
  }

  const handleCreateProductClick = () => {
    if (!auth.isLoggedIn) {
      toast.error("Please sign in!")
    }
    if (auth.isLoggedIn) {
      Navigate("/create-product");
    }
  }

  const handleCategoryClick = (category) => {
    Navigate(`/view-all-products/${category}`);
    setCategoryDrawerOpen(false);
  };

  const allCategories = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllCategories
      });
      setCategories(res?.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.responseMessage)
      }
    }
  };

  useEffect(() => {
    allCategories();
  }, [])

  function TopbarContent(view) {
    return (
      <>
        <Box className={searchContainer}>
          <TextField
            variant='outlined'
            placeholder="Enter product name"
            className='searchTextfield'
            InputProps={{
              startAdornment: (
                <CiSearch size={30} style={{ marginRight: '14px' }} />
              ),
            }}
          />
        </Box>

        <Box className={createProduct}>
          <Button variant='contained'
            onClick={handleCreateProductClick}
            startIcon={<IoAddCircleOutline />}>Create Product</Button>
        </Box>

        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ gap: "24px" }}
        >

          {auth.isLoggedIn ? (
            <div
              className={view ==="desktop" ? afterLogin : mobileview}
            >
              <Typography variant='h6' color='primary'><span>Welcome!{" "}</span>{userName.length > 10 ?
                userName.slice(0, 10) + "..." : userName}</Typography>

              <Button variant='contained'
                onClick={() => setIsLogoutOpen(true)}
                startIcon={<FiLogOut />}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="alignCenter" style={{ gap: '10px' }}>
              <Button
                variant="contained"
                className="ecoButton"
                onClick={() => Navigate("/login")}
                startIcon={<HiLogin />}
              >
                Login
              </Button>

              <Button
                variant="contained"
                className="ecoButton"
                onClick={() => Navigate("/register")}
                startIcon={<PiTrademarkRegisteredLight />}
              >
                Register
              </Button>
            </div>
          )}
        </Box>
      </>
    )
  }

  function displayDesktop() {
    return (
      <Toolbar className={toolbar}>
        {TopbarContent('desktop')}
      </Toolbar>
    );
  };

  //mobile end
  function displayMobile() {

    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));

    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={toolbar}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            {TopbarContent('mobile')}
          </div>
        </Drawer>

        <Box className='alignCenter' style={{ position: 'absolute', right: '0' }}>
          <IconButton
            className={drawericon}
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon
              width="60px"
              height="60px"
              style={{ color: "#EC1F24", fontSize: "26px" }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    );
  };

  const displayLogo = (
    <Box
      style={{ cursor: 'pointer' }}
      onClick={() => Navigate("/")}
    >
      <LogoBox className="logoImg" />
    </Box>
  );

  return (
    <>
      <AppBar
        position={window.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#ffffff", borderBottom: "3px solid #FF7F26", }}
      >

        <Container maxWidth="xl" className="displaySpacebetween" style={{ padding: "15px 24px" }}>
          <div className="alignCenter">
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              {displayLogo}
            </Box>

            <Box className={categoryBox}>
              <IconButton>
                <CiShoppingBasket />
                <Typography variant="h6" color='primary' onClick={handleCategoryDrawerClick}>
                  Shop by Category</Typography>
              </IconButton>
            </Box>
          </div>
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>

        {/* category drawer */}
        <Drawer
          anchor="left"
          open={categoryDrawerOpen}
          onClose={handleCategoryDrawerClick}

        >
          <div className={drawerCategoryContainer}>
            <Typography variant="h4">Availabel Categories</Typography>
            {
              Array.isArray(categories) && categories.length !== 0 &&
              categories.map((category, i) => {
                return (
                  <Typography key={i} onClick={() => handleCategoryClick(category)}>
                    {category.toUpperCase()}
                  </Typography>
                )
              })
            }
          </div>
        </Drawer>

      </AppBar>

      <CommonDialog open={isLogoutOpen} onClose={handleLogoutClose} type="logout" />
    </>
  );
}
