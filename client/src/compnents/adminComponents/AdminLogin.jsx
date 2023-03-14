import React, { useState } from "react";
import "../../styles/AdminStyles/adminLogin.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { adminLogin } from "../../services/adminApi";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "../../store/adminSlice";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function AdminLogin() {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please Enter Valid Email").required("Required Field"),
        password: Yup.string().required("Required Field"),
    });
    const onSubmit = async (values, props) => {
        try {
            const adminLoginResponse = await adminLogin(values);
            if (adminLoginResponse.msg) {
                setMessage(adminLoginResponse.msg)
                setTimeout(() => {
                    setMessage("")
                }, 4000);
            }
            if (adminLoginResponse.token) {
                dispatch(setAdminLogin(adminLoginResponse.token));
                navigate("/admin");
            }
        } catch (error) {
            console.log(error.message);
            setMessage(error.response.data.msg);
        }
    };
    return (
        <div className="adminContainer">
            <div className="login-page">
                <h6>Admin Login</h6>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="user-avatar img-thumbnail" />
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <div className="form-content">
                                {message && <p className="text-danger">{message}</p>}
                                <div className="form-group text-danger">
                                    <Field
                                        type="text"
                                        name="email"
                                        className="form-control input-underline input-lg"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email" />
                                </div>
                                <div className="form-group text-danger">
                                    <Field
                                        type="password"
                                        name="password"
                                        className="form-control input-underline input-lg"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-info btn-lg">
                                Login
                            </button>
                            &nbsp;
                        </Form>
                    )}
                </Formik>
                <Button className="mt-2" variant="text" onClick={()=>{navigate("/")}} >Home Page</Button>
            </div>
        </div>
    );
}
