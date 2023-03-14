import { Button } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../styles/DriverStyles/DriverLogin.css";
import { driverLogin } from "../../services/driverApi";
import { useDispatch } from "react-redux";
import { setDriverLogin } from "../../store/driverSlice";
export default function DriverSignup() {
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });
    const onSubmit = async (values) => {
        try {
            const driver = {
                email: values.email,
                password: values.password,
            };
            const result = await driverLogin(driver);
            if (result.msg) {
                setMsg(result.msg);
                setTimeout(() => {
                    setMsg("");
                }, 4000);
            } else if (result.token) {
                dispatch(
                    setDriverLogin({
                        token: result.token,
                        driverData: result.driverData,
                    })
                );
                navigate("/driver/driverHome");
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            <div class="register">
                <div class=" row ">
                    <div class="col-md-3  register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>Start Your New Journey With WeCare !</p>
                        <br />
                        <button onClick={() => navigate("/driver/driverSignup")} class="btn btn-light">
                            Signup
                        </button>
                    </div>
                    <div class="col-md-9 login-right">
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    id="home-tab"
                                    data-toggle="tab"
                                    href="#home"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                    onClick={() => navigate("/")}
                                >
                                    Home
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Driver Login</h3>
                                <div class="row register-form">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        {({ errors, touched }) => (
                                            <Form>
                                                <div class="col-md-6">
                                                    {msg && <p class="text-danger">{msg}</p>}
                                                    <div class="form-group">
                                                        <Field
                                                            type="email"
                                                            name="email"
                                                            class="form-control"
                                                            placeholder="Your Email *"
                                                        />
                                                        {errors.email && touched.email ? (
                                                            <p className="text-danger">{errors.email}</p>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <Field
                                                            type="password"
                                                            name="password"
                                                            class="form-control"
                                                            placeholder="Password *"
                                                        />
                                                        {errors.password && touched.password ? (
                                                            <p className="text-danger">{errors.password}</p>
                                                        ) : null}
                                                    </div>
                                                    <Button type="submit" class="btnRegister">
                                                        Login
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
