import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    FormHelperText,
    Container,
    FormControl,
    CircularProgress
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import { MdMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { HiOutlineX } from "react-icons/hi";
import LogoBox from "src/component/LogoBox";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
    loginMainBox: {

        "& .loginSubText": {
            color: "#78819F",
            marginBottom: "40px",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            fontFamily: "Poppins",
        },

        "& .crossIconContainer": {
            position: "relative",
            "& .crossIcon": {
                position: "absolute",
                right: "-22px",
                top: "-47px",
            },
        },

        "& .logoContainer": {
            margin: "47px 0 41px 0",
        },

        "& .textfield": {

            "& .MuiOutlinedInput-adornedStart": {
                paddingLeft: 0,
            },

            "& .MuiOutlinedInput-root": {
                background: "rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                paddingLeft: 0
            },

            "& .MuiOutlinedInput-notchedOutline": {
                border: 'none'
            }
        },

        "& .iconBtn": {
            "& .MuiIconButton-root": {
                borderRight: "1px solid #BFBFBF",
                borderRadius: "0",
                padding: "6px 8.5px 6px 11px",
            },
            "& svg , & img": {
                color: "#ADADAD",
                cursor: "pointer",
                border: "1px solid #B1B1B1",
                padding: "9px",
                borderRadius: "7px",
            },
        },

        "& svg": {
            color: "#ADADAD",
            cursor: "pointer",
        },



        "& .loginBtn": {
            height: "55px",
            fontSize: "20px",
        },

        "& .dont": {
            color: theme.palette.text.primary,
            textAlign: "center",
            paddingBottom: "119px",
            fontFamily: "Poppins",
            lineHeight: "24px",
            fontWeight: 400,

            "& span": {
                color: theme.palette.error.main,
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: 400,
            },
        },

        "& .bodyBox": {
            width: "100%",
            maxWidth: "400px",

            "& .title": {
                fontWeight: 500,
                lineHeight: "49.2px",
                fontFamily: "Clash Display",
            },

            "& .helperText": {
                marginTop: "7px",
                fontFamily: "Poppins",
                fontSize: "12px",
                lineHeight: "18px",
            },

            "& .emailBox": {
                height: "60px",
            },

            "& .passwordBox": {
                height: "auto",
            },
        },
    },
}));

const formValidationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .matches(
            /^[a-zA-Z0-9._-]{5,255}$/,
            "Please enter a valid username."
        )
        .required("Username is required."),

    email: Yup.string()
        .trim()
        .matches(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{5,255}@[a-zA-Z0-9-]{2,63}\.[a-zA-Z]{2,63}/,
            "Please enter a valid email."
        )
        .max(256, "Email should not exceed 256 characters.")
        .required("Email is required."),

    password: Yup.string()
        .trim()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Please enter a valid password. It must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8-16 characters long."
        )
        .required("Password is required.")
        .max(16, "Password should not exceed 16 characters.")
        .min(8, "Password must be a minimum of 8 characters."),

    confirmpassword: Yup.string()
        .trim()
        .oneOf([Yup.ref('password'), null], 'Password and Confrim password must match.')
        .required('Confirm Password is required.')
});

export default function SignUp() {
    const classes = useStyles();
    const Navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);

    const handlePasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleConfimPasswordClick = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleSubmit = (values) => {
        setLoading(true);
        setTimeout(() => {
            toast.success("Account created successfully!");
            localStorage.setItem("email", values.email);
            localStorage.setItem("password", values.password);
            localStorage.setItem("username", values.username);
            setLoading(false);
            Navigate("/login");
        }, 2000); 
    }

    return (
        <Box className={classes.loginMainBox}>
            <Container>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        confirmpassword: ''
                    }}
                    initialStatus={{
                        success: false,
                        successMsg: "",
                    }}
                    validationSchema={formValidationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        touched,
                        values,
                        handleSubmit,
                    }) => (
                        <Form>
                            <div className="crossIconContainer">
                                <IconButton className="crossIcon"onClick={() => Navigate("/login")}>
                                    <HiOutlineX />
                                </IconButton>
                            </div>

                            <Box>
                                <div className="displayCenter logoContainer">
                                    <LogoBox />
                                </div>

                                <Box className="displayCenter">
                                    <Box className="bodyBox">
                                        <Typography
                                            variant="h2"
                                            color="textPrimary"
                                            className="title"
                                        >
                                            Hello!
                                        </Typography>
                                        <Typography variant="body2" className="loginSubText">
                                            Create your account
                                        </Typography>

                                        <Box className="emailBox">
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder="Enter username"
                                                    type="text"
                                                    id="email"
                                                    autoComplete="off"
                                                    className="passwordTextfield textfield"
                                                    value={values.username}
                                                    name="username"
                                                    inputProps={{ maxLength: 256 }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === " ") {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment
                                                                position="start"
                                                                className="iconBtn"
                                                            >
                                                                <IconButton>
                                                                    <CiUser
                                                                        fontSize="14px"
                                                                        fontWeight="400"
                                                                    />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <FormHelperText error className="helperText">
                                                    {touched.username && errors.username}
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>

                                        <Box mt={3.125} className="emailBox">
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder="Enter email address"
                                                    type="text"
                                                    id="email"
                                                    autoComplete="off"
                                                    className="passwordTextfield textfield"
                                                    value={values.email}
                                                    name="email"
                                                    inputProps={{ maxLength: 256 }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === " ") {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        handleChange({
                                                            target: {
                                                                name: "email",
                                                                value: value.toLowerCase(),
                                                            },
                                                        });
                                                    }}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment
                                                                position="start"
                                                                className="iconBtn"
                                                            >
                                                                <IconButton>
                                                                    <MdMailOutline
                                                                        fontSize="14px"
                                                                        fontWeight="400"
                                                                    />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <FormHelperText error className="helperText">
                                                    {touched.email && errors.email}
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>

                                        <Box mt={3.125} className="passwordBox">
                                            <FormControl fullWidth>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    placeholder="Enter password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={values.password}
                                                    name="password"
                                                    id="password"
                                                    onKeyDown={(e) => {
                                                        if (e.key === " ") {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className="passwordTextfield textfield"
                                                    inputProps={{ maxLength: 16 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment
                                                                position="start"
                                                                className="iconBtn"
                                                            >
                                                                <IconButton>
                                                                    <RiLockPasswordLine
                                                                        fontSize="14px"
                                                                        fontWeight="400"
                                                                    />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handlePasswordClick}>
                                                                    {showPassword ? (
                                                                        <MdVisibility
                                                                            fontSize="18px"
                                                                            fontWeight="400"
                                                                        />
                                                                    ) : (
                                                                        <MdVisibilityOff
                                                                            fontSize="18px"
                                                                            fontWeight="400"
                                                                        />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <FormHelperText error className="helperText">
                                                    {touched.password && errors.password}
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>

                                        <Box mt={3.125} className="passwordBox">
                                            <FormControl fullWidth>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    placeholder="Enter confirm password"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={values.confirmpassword}
                                                    name="confirmpassword"

                                                    onKeyDown={(e) => {
                                                        if (e.key === " ") {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className="passwordTextfield textfield"
                                                    inputProps={{ maxLength: 16 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment
                                                                position="start"
                                                                className="iconBtn"
                                                            >
                                                                <IconButton>
                                                                    <RiLockPasswordLine
                                                                        fontSize="14px"
                                                                        fontWeight="400"
                                                                    />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handleConfimPasswordClick}>
                                                                    {showConfirmPassword ? (
                                                                        <MdVisibility
                                                                            fontSize="18px"
                                                                            fontWeight="400"
                                                                        />
                                                                    ) : (
                                                                        <MdVisibilityOff
                                                                            fontSize="18px"
                                                                            fontWeight="400"
                                                                        />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <FormHelperText error className="helperText">
                                                    {touched.confirmpassword && errors.confirmpassword}
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>

                                        <Box mt={3.125} mb={3.5}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                className="loginBtn"
                                                type="submit"
                                                disabled={!values.email || !values.password}
                                            >
                                                REGISTER {" "} {loading && <CircularProgress color='primary' size={20}/>}
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" className="dont">
                                                Already have an account?{" "}
                                                <span onClick={() => Navigate(-1)}>
                                                    LogIn
                                                </span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Box>
    );
}