import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import PersonIcon from "@mui/icons-material/Person";
import "../styles/UserStyles/UserNavbar.css";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../constants/firebaseConfig";
import {
    sendPasswordResetEmail,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from "firebase/auth";

//---------DialogBox----------------
import styled from "@emotion/styled";
import { Dialog, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { continueWithGoogle } from "../services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin, setUserLogout } from "../store/userSlice";

//------------Modal Components-----------
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[800],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
//-----------Modal Components End --------------

export default function UserNavbar() {
    const [isActive, setActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setResetEmail] = useState("");
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const userToken = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.userData);

    //---------User Signup----------------

    const userSignup = (event) => {
        event.preventDefault();
        try {
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then(() => {
                    return updateProfile(auth.currentUser, {
                        displayName: userData.name,
                    });
                })
                .then(async () => {
                    const user = auth.currentUser;
                    const userData = {
                        userName: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                    };
                    const signupRes = await continueWithGoogle(userData);
                    if (signupRes.message) {
                        setTimeout(() => {
                            setMessage("");
                        }, 3000);
                        setMessage(signupRes.message);
                    } else if (signupRes.token) {
                        dispatch(
                            setUserLogin({
                                token: signupRes.token,
                                userData: signupRes.userData,
                            })
                        );
                        handleClose1();
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                    setMessage(err.message);
                    setTimeout(() => {
                        setMessage("");
                    }, 2500);
                });
        } catch (error) {
            console.log(error.message);
        }
    };

    //---------User Login----------------------------

    const userLogin = (event) => {
        event.preventDefault();
        try {
            const { email, password } = userData;
            signInWithEmailAndPassword(auth, email, password)
                .then(async (res) => {
                    const userData = {
                        userName: res.user.displayName,
                        email: res.user.email,
                        photo: res.user.photoURL,
                    };
                    const loginRes = await continueWithGoogle(userData);
                    console.log(loginRes);
                    dispatch(
                        setUserLogin({
                            token: loginRes.token,
                            userData: loginRes.userData,
                        })
                    );
                    setOpen(false);
                    setOpen1(false);
                })
                .catch((err) => {
                    console.log(err.message);
                    setMessage(err.message);
                    setTimeout(() => {
                        setMessage("");
                    }, 2500);
                });
        } catch (error) {
            console.log(error.message);
        }
    };

    //--------------User Continue With Google------------------

    const signupWithGoogle = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            console.log(data);
            console.log(data.user.displayName);
            const userData = {
                userName: data.user.displayName,
                email: data.user.email,
                photo: data.user.photoURL,
            };
            console.log(userData);
            const res = await continueWithGoogle(userData);
            if (res.message) {
                setTimeout(() => {
                    setMessage("");
                }, 3000);
                setMessage(res.message);
            } else if (res.token) {
                dispatch(
                    setUserLogin({
                        token: res.token,
                        userData: res.userData,
                    })
                );
                setOpen(false);
                setOpen1(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    //-------------User Reset Password-------------------

    const resetPassword = async (event) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email).then(() => {
                console.log("Password reset email sent successfully");
                setMessage("Reset email sent successfully");
                setTimeout(() => {
                    setMessage("");
                }, 2500);
            });
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setMessage("Error sending password reset email");
            setTimeout(() => {
                setMessage("");
            }, 2500);
        }
    };

    //-------------Dialog box handle-----------------------
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickOpen = () => {
        setOpen(true);
        setOpen2(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen(false);
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClickOpen2 = () => {
        setOpen(false);
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    //--------------End-----------------------------------------

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 450) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        setMessage("");
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const theme = useTheme();
    function handleClickDriver() {
        navigate("/driver/driverLogin");
    }
    function handleClickAdmin() {
        navigate("/admin");
    }

    const handleClickLogout = () => {
        dispatch(setUserLogout());
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <header style={{ backgroundColor: scrolled ? "#222327" : "transparent" }}>
                    <a className="logo">
                        <Diversity2Icon sx={{ color: "#e91e63" }} fontSize="large" /> <span>WeCare</span>{" "}
                    </a>

                    <ul className={"navbar"} id={isActive ? "nav1" : "nav"}>
                        <li>
                            <a className="active">Home</a>
                        </li>
                        <li>
                            <a>About Us</a>
                        </li>
                        <li>
                            <a>Services</a>
                        </li>
                        <li class="dropdown ">
                            <a href="#" id="drop1" data-toggle="dropdown" class="dropdown-toggle" role="button">
                                Operators <b class="caret"></b>
                            </a>
                            <ul role="menu" class="dropdown-menu" aria-labelledby="drop1">
                                <li role="presentation">
                                    <a href="#" onClick={handleClickDriver} role="menuitem">
                                        Driver
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#" onClick={handleClickAdmin} role="menuitem">
                                        Admin
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>Contact</a>
                        </li>
                    </ul>

                    {userToken ? (
                        <div className="d-flex p-2">
                            <li class="dropdown ">
                                <span>{user.name}</span>
                                <a href="#" id="drop1" data-toggle="dropdown" class="dropdown-toggle" role="button">
                                    <PersonIcon fontSize="large" />
                                </a>
                                <ul role="menu" class="dropdown-menu" aria-labelledby="drop1">
                                    <li role="presentation">
                                        <a href="#" onClick={handleClickDriver} role="menuitem" className="text-white">
                                            My Account
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#" onClick={handleClickLogout} role="menuitem" className="text-white">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <button className="ms-2" id="menu-icon" onClick={() => setActive(!isActive)}>
                                <MenuIcon />
                            </button>
                        </div>
                    ) : (
                        <div className="main">
                            <a onClick={handleClickOpen}>
                                <PersonIcon fontSize="large" />
                            </a>
                            <button id="menu-icon" onClick={() => setActive(!isActive)}>
                                <MenuIcon />
                            </button>
                        </div>
                    )}
                </header>

                {/* ------------DialogBox For Login------------ */}

                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <div style={{ width: "350px", height: "450px", textAlign: "center" }}>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Login
                        </BootstrapDialogTitle>

                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 0.5, width: "25ch", p: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Button
                                className="googleAuthBtn"
                                variant="text"
                                onClick={signupWithGoogle}
                                startIcon={<GoogleIcon />}
                                size="small"
                            >
                                Continue with google
                            </Button>
                            <TextField
                                id="standard-basic"
                                onChange={onChange}
                                name="email"
                                label="Email"
                                variant="standard"
                            />
                            <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    name="password"
                                    onChange={onChange}
                                    id="standard-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {message && (
                                <p style={{ textAlign: "center", marginLeft: "60px" }} className="text-danger">
                                    {message}
                                </p>
                            )}
                            <Button variant="contained" onClick={userLogin}>
                                Login
                            </Button>
                            <p className="text-primary" style={{ textAlign: "center", marginLeft: "60px" }}>
                                <a onClick={handleClickOpen2}>Forget Password?</a>
                            </p>
                            <div style={{ textAlign: "center", marginLeft: "60px" }}>
                                <p>
                                    No account yet ? <Button onClick={handleClickOpen1}>Sign up</Button>
                                </p>
                            </div>
                        </Box>
                    </div>
                </BootstrapDialog>

                {/* ------------DialogBox For Signup------------ */}

                <BootstrapDialog onClose={handleClose1} aria-labelledby="customized-dialog-title" open={open1}>
                    <div style={{ width: "350px", height: "500px", textAlign: "center" }}>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
                            Signup
                        </BootstrapDialogTitle>

                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "25ch", p: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Button
                                className="googleAuthBtn"
                                variant="outlined"
                                onClick={signupWithGoogle}
                                startIcon={<GoogleIcon />}
                                size="small"
                            >
                                Continue with google
                            </Button>
                            <TextField
                                id="standard-basic"
                                name="name"
                                onChange={onChange}
                                label="User Name"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                name="email"
                                onChange={onChange}
                                label="Email"
                                variant="standard"
                            />
                            <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    name="password"
                                    onChange={onChange}
                                    id="standard-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {message && (
                                <p style={{ textAlign: "center", marginLeft: "80px" }} className="text-danger">
                                    {message}
                                </p>
                            )}
                            <Button onClick={userSignup} variant="contained">
                                SignUp
                            </Button>
                        </Box>
                    </div>
                </BootstrapDialog>

                {/* ------------DialogBox For ForgetPassword------------ */}

                <BootstrapDialog onClose={handleClose2} aria-labelledby="customized-dialog-title" open={open2}>
                    <div style={{ width: "400px", height: "300px", textAlign: "center" }}>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}></BootstrapDialogTitle>
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "25ch", p: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {message && (
                                <p style={{ textAlign: "center", marginLeft: "80px" }} className="text-success">
                                    {message}
                                </p>
                            )}
                            <TextField
                                id="standard-basic"
                                onChange={(event) => setResetEmail(event.target.value)}
                                label="Email"
                                variant="standard"
                            />
                            <Button variant="contained" onClick={resetPassword}>
                                Reset Password
                            </Button>
                            <Button variant="contained" onClick={handleClickOpen}>
                                Back To Login
                            </Button>
                        </Box>
                    </div>
                </BootstrapDialog>
            </ThemeProvider>
        </div>
    );
}
