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
    Checkbox,
    FormControlLabel,
    CircularProgress
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import { MdMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "src/context/Auth";
import { HiOutlineX } from "react-icons/hi";
import LogoBox from "src/component/LogoBox";
import { useNavigate } from "react-router-dom";

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

        "& .checkboxBox": {
            marginBottom: "30px",

            "& .rememberText": {
                fontFamily: "Poppins",
                lineHeight: "21px",
            },

            "& .MuiFormControlLabel-root": {
                color: theme.palette.text.primary,
                marginLeft: "-8px",
            },

            "& .forget": {
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "Poppins",
                lineHeight: "24px",
            },
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

            "& .passwordTextfield": {
                "& input:-webkit-autofill": {
                    "-webkit-box-shadow": "0 0 0 1000px transparent inset",
                },
            },
        },
    },
}));

const formValidationSchema = Yup.object().shape({
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
});

export default function Login() {
    const classes = useStyles();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const auth = useContext(AuthContext);
    const [isRememberMe, setIsRememberMe] = useState(false);

    const handlePasswordClick = () => {
        setShowPassword(!showPassword);
    };

    function rememberMe() {
        if (!isRememberMe) {
            setIsRememberMe(true);
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            window.localStorage.setItem("email", email?.value);
            window.localStorage.setItem("password", password?.value);
        } else {
            setIsRememberMe(false);
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("password");
        }
    }

    useEffect(() => {
        if (window.localStorage.getItem("email")) {
            setIsRememberMe(true);
        } else {
            setIsRememberMe(false);
        }
    }, [window.localStorage.getItem("email")]);

    const handleSubmit = (values) => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (values.email === storedEmail && values.password === storedPassword) {
                toast.success("Login Successfully!");
                auth.updateIsLoggedIn(true);
                Navigate("/");
            } else {
                if (values.email !== storedEmail) {
                    toast.error("Invalid email!");
                }
                if (values.password !== storedPassword) {
                    toast.error("Invalid password!");
                }
            }
        }, 2000)


    };

    return (
        <Box className={classes.loginMainBox}>
            <Container>
                <Formik
                    initialValues={{
                        password: window.localStorage.getItem("password")
                            ? window.localStorage.getItem("password")
                            : "",
                        email: window.localStorage.getItem("email")
                            ? window.localStorage.getItem("email")
                            : "",
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
                                <IconButton className="crossIcon" onClick={() => Navigate("/")}>
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
                                            Signin to your account
                                        </Typography>

                                        <Box className="emailBox">
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

                                        <Box
                                            mt={touched.password && errors.password ? 3.5 : 1.75}
                                            className="displaySpacebetween checkboxBox"
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        icon={
                                                            <CheckBoxOutlineBlankIcon fontSize="medium" />
                                                        }
                                                        checkedIcon={<CheckBoxIcon fontSize="medium" />}
                                                        onChange={() => rememberMe()}
                                                    />
                                                }
                                                label={
                                                    <Typography variant="body1" className="rememberText">
                                                        Remember me
                                                    </Typography>
                                                }
                                            />
                                            <Typography
                                                color="error"
                                                variant="body2"
                                                className="forget"

                                            >
                                                Forgot Password?
                                            </Typography>
                                        </Box>

                                        <Box mb={3.5}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                className="loginBtn"
                                                type="submit"
                                                disabled={!values.email || !values.password}
                                            >
                                                LOGIN {loading && <CircularProgress color='primary' size={20} />}
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" className="dont">
                                                Don't have an account?{" "}
                                                <span onClick={() => Navigate("/register")}>
                                                    SIGN UP
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