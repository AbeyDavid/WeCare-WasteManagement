import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, Input, InputLabel, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DriverStyles/DriverLogin.css";

export default function DriverLogin() {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function handleClickToHome() {
        navigate("/");
    }
    function handleClickToDriverHome(){
        navigate("/driver/driverHome");
    }

    return (
        <div className="mainbody">
            <div className="login-card">
                <h2>Driver Login</h2>
                <form className="login-form">
                    <TextField id="standard-basic" label="Email" variant="standard" />
                    <FormControl variant="standard" sx={{ marginTop: "10px" }}>
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
                    <p className="fp">
                        <a>Forget Password?</a>
                    </p>
                    <Button variant="outlined" sx={{ marginTop: "20px" }} onClick={handleClickToDriverHome}>
                        Login
                    </Button>
                </form>
                <Button variant="text" sx={{ marginBottom: "20px" }} onClick={handleClickToHome}>
                    Back To Home
                </Button>
            </div>
        </div>
    );
}
