import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DriverStyles/DriverSignup.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { driverSignup } from "../../services/driverApi";
import { useDispatch } from "react-redux";
import { setDriverLogin } from "../../store/driverSlice";

export default function DriverSignup() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [image, setImage] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const initialValues = {
        name: "",
        age: "",
        password: "",
        conpassword: "",
        email: "",
        phone: "",
        experience: "",
        address: "",
        pincode: "",
        image: "",
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        age: Yup.number().required("Age Is Required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        conpassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
            .required("Phone Is Required"),
        experience: Yup.string().required("Experience is Required"),
        address: Yup.string().required("Address is Required"),
        pincode: Yup.string().required("PIN Code is Required"),
    });
    const onSubmit = (values) => {
        if (!image) {
            setTimeout(() => {
                setErrMsg("");
            }, 4000);
            return setErrMsg("Image Upload Is Mandatory");
        }
        try {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                const driverData = {
                    name: values.name,
                    age: values.age,
                    password: values.password,
                    email: values.email,
                    phone: values.phone,
                    experience: values.experience,
                    address: values.address,
                    pincode: values.pincode,
                    image: reader.result,
                };
                const result =await driverSignup(driverData);
                if (result.data.errRes) {
                    return setErrMsg(result.data.errRes)
                }else if (result.data.driverData) {
                    dispatch(setDriverLogin({
                        token:result.data.token,
                        driverData: result.data.driverData
                    }))
                    navigate("/driver/driverHome")
                }
            };
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div class="">
            <div class="register">
                <div class=" row ">
                    <div class="col-md-3  register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>Start Your New Journey With WeCare !</p>
                        <br />
                        <button class="btn btn-light" onClick={() => navigate("/driver/driverLogin")}>
                            Login
                        </button>
                    </div>
                    <div class="col-md-9 register-right">
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
                                <h3 class="register-heading">Apply As Driver</h3>
                                {/*------------------------------------ Form Start ------------------------------------ */}
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div class="row register-form">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <Field
                                                            type="text"
                                                            name="name"
                                                            class="form-control"
                                                            placeholder="Full Name *"
                                                        />
                                                        {errors.name && touched.name ? (
                                                            <p className="text-danger">{errors.name}</p>
                                                        ) : null}
                                                    </div>
                                                    <div class="form-group">
                                                        <Field
                                                            type="text"
                                                            name="age"
                                                            class="form-control"
                                                            placeholder="Age *"
                                                        />
                                                        {errors.age && touched.age ? (
                                                            <p className="text-danger">{errors.age}</p>
                                                        ) : null}
                                                    </div>
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
                                                    <div class="form-group">
                                                        <Field
                                                            type="password"
                                                            name="conpassword"
                                                            class="form-control"
                                                            placeholder="Confirm Password *"
                                                        />
                                                        {errors.conpassword && touched.conpassword ? (
                                                            <p className="text-danger">{errors.conpassword}</p>
                                                        ) : null}
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="maxl">
                                                            <p>
                                                                <span class="text-black me-3">
                                                                    Upload Your Licence Here
                                                                </span>
                                                                <Button variant="contained" component="label">
                                                                    Upload
                                                                    <input
                                                                        hidden
                                                                        name="image"
                                                                        accept="image/*"
                                                                        multiple
                                                                        type="file"
                                                                        onChange={(e) => setImage(e.target.files[0])}
                                                                    />
                                                                </Button>
                                                                {errors.image && touched.image ? (
                                                                    <p className="text-danger">{errors.image}</p>
                                                                ) : null}
                                                            </p>
                                                        </div>
                                                        {errMsg && <h6 className="text-danger">{errMsg}</h6>}
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <Field
                                                            name="email"
                                                            class="form-control"
                                                            placeholder="Your Email *"
                                                        />
                                                        {errors.email && touched.email ? (
                                                            <p className="text-danger">{errors.email}</p>
                                                        ) : null}
                                                    </div>
                                                    <div class="form-group">
                                                        <Field
                                                            name="phone"
                                                            class="form-control"
                                                            placeholder="Your Phone *"
                                                        />
                                                        {errors.phone && touched.phone ? (
                                                            <p className="text-danger">{errors.phone}</p>
                                                        ) : null}
                                                    </div>
                                                    <div class="form-group">
                                                        <Field
                                                            type="number"
                                                            name="experience"
                                                            class="form-control"
                                                            placeholder="Experience"
                                                        />
                                                        {errors.experience && touched.experience ? (
                                                            <p className="text-danger">{errors.experience}</p>
                                                        ) : null}
                                                    </div>
                                                    <div class="form-group">
                                                        <Field
                                                            as="textarea"
                                                            class="form-control"
                                                            placeholder="Address"
                                                            id="floatingTextarea"
                                                            name="address"
                                                        />
                                                        {errors.address && touched.address ? (
                                                            <p className="text-danger">{errors.address}</p>
                                                        ) : null}
                                                    </div>
                                                    <div class="form-group">
                                                        <Field
                                                            type="text"
                                                            minlength="10"
                                                            maxlength="10"
                                                            name="pincode"
                                                            class="form-control"
                                                            placeholder="Pincode"
                                                        />
                                                        {errors.pincode && touched.pincode ? (
                                                            <p className="text-danger">{errors.pincode}</p>
                                                        ) : null}

                                                        <button type="submit" class="btn btn-primary mt-3">
                                                            Register
                                                        </button>
                                                    </div>
                                                </div>
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
    );
}
