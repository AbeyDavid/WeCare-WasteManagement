import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import PersonIcon from "@mui/icons-material/Person";
import "../styles/UserStyles/UserNavbar.css";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import {auth,provider} from '../constants/firebaseConfig'
import { signInWithPopup } from "firebase/auth";

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

export default function UserNavbar() {
    const [isActive, setActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
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
    const theme = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 450) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    function handleClickDriver() {
        navigate("/driver/driverLogin");
    }
    function handleClickAdmin() {
        navigate("/admin");
    }
    const signupWithGoogle = ()=>{
        signInWithPopup(auth,provider).then((data)=>{
            console.log(data.user);
        })
    }

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

                    <div className="main">
                        <a onClick={handleClickOpen}>
                            <PersonIcon fontSize="large" />
                        </a>
                        <button id="menu-icon" onClick={() => setActive(!isActive)}>
                            <MenuIcon />
                        </button>
                    </div>
                </header>

                {/* ------------DialogBox For Login------------ */}

                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <div style={{ width: "350px", height: "400px", textAlign: "center" }}>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Login
                        </BootstrapDialogTitle>
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "25ch", p: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Email" variant="standard" />
                            <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
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
                            <Button variant="contained">Login</Button>
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
                    <div style={{ width: "350px", height: "600px", textAlign: "center" }}>
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
                            <TextField id="standard-basic" label="User Name" variant="standard" />
                            <TextField id="standard-basic" label="Email" variant="standard" />
                            <TextField id="standard-basic" label="Mobile" variant="standard" />
                            <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
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
                            <Button variant="contained">Sign Up</Button>
                            <Button variant="outlined" onClick={signupWithGoogle} startIcon={<GoogleIcon />} >
                                Sign up with google
                            </Button>
                        </Box>
                    </div>
                </BootstrapDialog>

            </ThemeProvider>
        </div>
    );
}
