import * as React from 'react';
import {useState} from 'react';
import './login.css';
import Button from '@mui/material/Button';
import classNames from "classnames";
import {loginValidation} from "./validations/loginValidation";
import {signupValidation} from "./validations/signupValidation";
import {useFormik} from "formik";
import ProxyApi from "../Apis/ProxyApis/ProxyApis";
import {InputLabel} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useNavigate} from "react-router-dom";
import {setUserLocalStorageData} from "../Authentication/UserAuthentication";
import {RoutePathNames} from "../Routes/RoutePathNames";


function Login() {
    const navigate = useNavigate();

    const [isLoginActive, setIsLoginActive] = useState(false);
    const loginFormik = useFormik({
        initialValues: {
            email: "", password: ""
        }, validationSchema: loginValidation, onSubmit: async (values, actions) => {
            const authenticationRequest = {
                "email": values.email, "password": values.password
            }
            try {
                const response = await ProxyApi.post("basicSignIn", authenticationRequest)
                setUserLocalStorageData(response.data.id, response.data.token, response.data.role)
                navigate(RoutePathNames.dashboard);
            } catch (error) {
                actions.resetForm();
                alert(error.response.data.message)
            }
        }
    });

    const signupFormik = useFormik({
        initialValues: {
            userName: "", firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: ""
        }, validationSchema: signupValidation, onSubmit: async (values, actions) => {
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
                const response = await ProxyApi.post("basicSignUp", informationDto)
                setUserLocalStorageData(response.data.id, response.data.token, response.data.role)
                navigate(RoutePathNames.validation)
            } catch (error) {
                actions.resetForm();
                alert(error.response.data.message)
            }
        },
    });

    return (<div className="Body">
        <div className={classNames({"Container": true, "active": isLoginActive})} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={signupFormik.handleSubmit}>
                    <h2>Create Account</h2>
                    <FormControl sx={{
                        minWidth: 320, maxWidth: 300, border: "none", borderRadius: 2,
                        backgroundColor: '#f1f1f1',
                    }}>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            required={true}
                            value={signupFormik.values.role}
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            name={"role"}
                            label="Role"
                            sx={{
                                minWidth: 320, maxWidth: 300, borderRadius: 2, height: 40,
                                backgroundColor: '#f1f1f1;', border: 'none', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'

                            }}
                        >
                            <MenuItem value={""}></MenuItem>
                            <MenuItem value="ROLE_CLIENT"> Client </MenuItem>
                            <MenuItem value="ROLE_ORGANIZER">Organizer</MenuItem>
                            <MenuItem value="ROLE_SPONSOR">Sponsor</MenuItem>
                        </Select>
                    </FormControl>
                    <input name={"userName"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.userName && signupFormik.errors.userName ? "Input error" : "Input"}
                           type="text" placeholder="User Name "/>
                    {signupFormik.touched.userName && signupFormik.errors.userName ? (
                        <div className="text-error">{signupFormik.errors.userName}</div>) : null}
                    <input name={"firstName"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.firstName && signupFormik.errors.firstName ? "Input error" : "Input"}
                           type="text" placeholder="First Name"/>
                    {signupFormik.touched.firstName && signupFormik.errors.firstName ? (
                        <div className="text-error">{signupFormik.errors.firstName}</div>) : null}
                    <input name={"lastName"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.lastName && signupFormik.errors.lastName ? "Input error" : "Input"}
                           type="text" placeholder="Last Name"/>
                    {signupFormik.touched.lastName && signupFormik.errors.lastName ? (
                        <div className="text-error">{signupFormik.errors.lastName}</div>) : null}
                    <input
                        name={"email"}
                        onChange={signupFormik.handleChange}
                        onBlur={signupFormik.handleBlur}
                        className={signupFormik.touched.email && signupFormik.errors.email ? "Input error" : "Input"}
                        type="email" placeholder="Email"/>
                    {signupFormik.touched.email && signupFormik.errors.email ? (
                        <div className="text-error">{signupFormik.errors.email}</div>) : null}
                    <input name={"password"}
                           onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.password && signupFormik.errors.password ? "Input error" : "Input"}
                           type="password" placeholder="Password"/>
                    {signupFormik.touched.password && signupFormik.errors.password ? (
                        <div className="text-error">{signupFormik.errors.password}</div>) : null}

                    <input name={"confirmPassword"} onChange={signupFormik.handleChange}
                           onBlur={signupFormik.handleBlur}
                           className={signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? "Input error" : "Input"}
                           type="password" placeholder="Confirm Password"/>

                    {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? (
                        <div className="text-error">{signupFormik.errors.confirmPassword}</div>) : null}
                    <Button variant="contained" type="submit">Sign up</Button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={loginFormik.handleSubmit}>
                    <h2>Sign in</h2>
                    <input
                        name={"email"}
                        value={loginFormik.values.email}
                        onChange={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                        className={loginFormik.touched.email && loginFormik.errors.email ? "Input error" : "Input"}
                        type="email" placeholder="Email "/>
                    {loginFormik.touched.email && loginFormik.errors.email ? (
                        <div className="text-error">{loginFormik.errors.email}</div>) : null}
                    <input
                        name={"password"}
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                        className={loginFormik.touched.password && loginFormik.errors.password ? "Input error" : "Input"}
                        type="password" placeholder="Password"/>
                    {loginFormik.touched.password && loginFormik.errors.password ? (
                        <div className="text-error">{loginFormik.errors.password}</div>) : null}
                    <Button variant="contained" type="submit">Sign In</Button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h2>LOGIN FORM</h2>
                        <p className="subTitle">To keep connected with us please login with your personal info</p>
                        <Button variant="contained" className="ghost" id="signIn"
                                onClick={() => setIsLoginActive(false)}>Sign In</Button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h2>SIGN UP</h2>
                        <p className="subTitle">Enter your details and start journey with us</p>
                        <Button variant="contained" className="ghost" id="signUp"
                                onClick={() => setIsLoginActive(true)}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Login;