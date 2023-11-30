import {useState, useEffect} from 'react';
import './login.css';
import Button from '@mui/material/Button';
import {FaGoogle} from "react-icons/fa";
import classNames from "classnames";
import {loginValidation} from "./validations/loginValidation";
import {signupValidation} from "./validations/signupValidation";
import {useFormik} from "formik";
import ProxyApi from "../Apis/ProxyApis/ProxyApis";
import {InputLabel} from "@mui/material";
import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useNavigate} from "react-router-dom";
import {isUserLoggedIn, setUserLocalStorageData} from "../Authentication/UserAuthentication";


function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn()) {
            alert("User already logged in")
            navigate('/dashboard')
        }
    }, []);


    const [isLoginActive, setIsLoginActive] = useState(false);
    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidation,
        onSubmit: async (values, actions) => {
            const authenticationRequest = {
                "email": values.email,
                "password": values.password
            }
            try {
                const response = await ProxyApi.post("basicSignIn", authenticationRequest)
                setUserLocalStorageData(response.data.id, response.data.token, response.data.role)
                navigate("/dashboard");
            } catch (error) {
                actions.resetForm();
                alert(error.response.data.message)
            }
        }
    });

    const signupFormik = useFormik({
        initialValues: {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "ROLE_CLIENT"
        },
        validationSchema: signupValidation,
        onSubmit: async (values, actions) => {
            const informationDto = {
                "id": 0,
                "userName": values.userName,
                "firstName": values.firstName,
                "lastName": values.lastName,
                "email": values.email,
                "password": values.password,
                "role": values.role,
                "gender": "MALE",
                "payPalAccount": "",
                "signInWithEmail": 0
            }
            try {
                const response =await ProxyApi.post("basicSignUp", informationDto)

                setUserLocalStorageData(response.data.id, response.data.token, response.data.role)
                navigate("/validation")
            } catch (error) {
                actions.resetForm();
                alert(error.response.data.message)
            }
        },
    });


    return (
        <div className="Body">
            <div className={classNames({"Container": true, "active": isLoginActive})} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={signupFormik.handleSubmit}>
                        <h2>Create Account</h2>

                        {/*will be added in the next phase*/}
                        {
                            false ? (
                                <div>
                                    <div className="social-container">
                                    <a href="#" className="social"><FaGoogle className="social-icon"/></a>
                                    </div>
                                    <span>or use your Gmail to register</span>
                                </div>
                            ) : null
                        }

                        <FormControl sx={{minWidth: 300}}>
                            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                            <Select
                                required={true}
                                value={signupFormik.values.role}
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                name={"role"}
                                label="Role"
                            >
                                <MenuItem value="ROLE_CLIENT">
                                    CLIENT
                                </MenuItem>
                                <MenuItem value="ROLE_ORGANIZER">
                                    ORGANIZER
                                </MenuItem>
                                <MenuItem value="ROLE_SPONSOR">
                                    SPONSOR
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <input name={"userName"}
                               onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.userName && signupFormik.errors.userName ? "Input error" : "Input"
                               }
                               type="text" placeholder="User Name "/>
                        {signupFormik.touched.userName && signupFormik.errors.userName ? (
                            <div className=" text-error">{signupFormik.errors.userName}</div>) : null}
                        <input name={"firstName"}
                               onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.firstName && signupFormik.errors.firstName ? "Input error" : "Input"
                               }
                               type="text" placeholder="First Name "/>
                        {signupFormik.touched.firstName && signupFormik.errors.firstName ? (
                            <div className=" text-error">{signupFormik.errors.firstName}</div>) : null}
                        <input name={"lastName"}
                               onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.lastName && signupFormik.errors.lastName ? "Input error" : "Input"
                               }
                               type="text" placeholder="Last Name"/>
                        {signupFormik.touched.lastName && signupFormik.errors.lastName ? (
                            <div className=" text-error">{signupFormik.errors.lastName}</div>) : null}
                        <input
                            name={"email"}
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            className={
                                signupFormik.touched.email && signupFormik.errors.email ? "Input error" : "Input"
                            }
                            type="email" placeholder="Email"/>
                        {signupFormik.touched.email && signupFormik.errors.email ? (
                            <div className=" text-error">{signupFormik.errors.email}</div>) : null}
                        <input name={"password"}
                               onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.password && signupFormik.errors.password ? "Input error" : "Input"
                               }
                               type="password" placeholder="Password"/>
                        {signupFormik.touched.password && signupFormik.errors.password ? (
                            <div className=" text-error">{signupFormik.errors.password}</div>) : null}

                        <input name={"confirmPassword"} onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? "Input error" : "Input"
                               } type="password" placeholder="Confirm Password"/>

                        {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? (
                            <div className=" text-error">{signupFormik.errors.confirmPassword}</div>) : null}
                        <Button variant="contained" type="submit">Sign up</Button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={loginFormik.handleSubmit}>
                        <h2>Sign in</h2>

                        {/*for another phase when we add the google authentication */}
                        {
                            false ? (
                                <div>
                                    <div className="social-container">
                                        <a href="#" className="social"><FaGoogle className="social-icon"/></a>
                                    </div>
                                    <span>use your account</span>
                                </div>
                            ) : null
                        }
                        <input
                            name={"email"}
                            value={loginFormik.values.email}
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            className={
                                loginFormik.touched.email && loginFormik.errors.email ? "Input error" : "Input"
                            } type="email" placeholder="Email "/>
                        {loginFormik.touched.email && loginFormik.errors.email ? (
                            <div className=" text-error">{loginFormik.errors.email}</div>) : null}
                        <input
                            name={"password"}
                            value={loginFormik.values.password}
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            className={loginFormik.touched.password && loginFormik.errors.password ? "Input error" : "Input"}
                            type="password" placeholder="Password"/>
                        {loginFormik.touched.password && loginFormik.errors.password ? (
                            <div className=" text-error">{loginFormik.errors.password}</div>) : null}
                        {
                            false ? (
                                <a href="#">Forgot your password?</a>
                            ) : null
                        }
                        <Button variant="contained" type="submit">
                            >Sign In</Button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h2>Welcome Back!</h2>
                            <p className="subTitle">To keep connected with us please login with your personal info</p>
                            <Button variant="contained" className="ghost" id="signIn"
                                    onClick={() => setIsLoginActive(false)}>Sign In</Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h2>Hello, My Friend!</h2>
                            <p className="subTitle">Enter your details and start journey with us</p>
                            <Button variant="contained" className="ghost" id="signUp"
                                    onClick={() => setIsLoginActive(true)}>Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;