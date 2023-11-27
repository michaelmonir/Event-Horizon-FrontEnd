
import {useState} from 'react';
import './login.css';
import Button from '@mui/material/Button';
import {FaGithub, FaFacebook, FaLinkedin} from "react-icons/fa";
import classNames from "classnames";
import {loginValidation} from "./validations/loginValidation";
import {signupValidation} from "./validations/signupValidation";
import {useFormik} from "formik";


function Login() {

    const [isLoginActive, setIsLoginActive] = useState(false);

    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidation,
        onSubmit: (values, actions) => {
            console.log("loginFormik submit");
            console.log(values);
            console.log(actions);
            actions.resetForm();
        }
    });
    const signupFormik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signupValidation,
        onSubmit: (values, actions) => {
            console.log(values);
            console.log(actions);
        },
    });
    console.log(signupFormik.errors);


    return (
        <div className="Body">
            <div className={classNames({"Container": true, "active": isLoginActive})} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={signupFormik.handleSubmit}>
                        <h2>Create Account</h2>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebook className="social-icon"/></a>
                            <a href="#" className="social"><FaGithub className="social-icon"/></a>
                            <a href="#" className="social"><FaLinkedin className="social-icon"/></a>
                        </div>
                        <span>or use your Gmail to register</span>

                        <input name={"firstName"}
                               onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.firstName && signupFormik.errors.firstName ? "Input error" : "Input"
                               }
                               type="text" placeholder="First Name "/>
                        {signupFormik.touched.firstName && signupFormik.errors.firstName ? ( <div className=" text-error">{signupFormik.errors.firstName}</div>) : null}
                        <input name={"lastName"}
                               onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.lastName && signupFormik.errors.lastName ? "Input error" : "Input"
                               }
                               type="text" placeholder="Last Name"/>
                        {signupFormik.touched.lastName && signupFormik.errors.lastName ? ( <div className=" text-error">{signupFormik.errors.lastName}</div>) : null}
                        <input
                            name={"email"}
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            className={
                                signupFormik.touched.email && signupFormik.errors.email ? "Input error" : "Input"
                            }
                            type="email" placeholder="Email"/>
                        {signupFormik.touched.email && signupFormik.errors.email ? ( <div className=" text-error">{signupFormik.errors.email}</div>) : null}
                        <input name={"password"}
                               onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.password && signupFormik.errors.password ? "Input error" : "Input"
                               }
                               type="password" placeholder="Password"/>
                        {signupFormik.touched.password && signupFormik.errors.password ? ( <div className=" text-error">{signupFormik.errors.password}</div>) : null}

                        <input name={"confirmPassword"} onChange={signupFormik.handleChange}
                               onBlur={signupFormik.handleBlur}
                               className={
                                   signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? "Input error" : "Input"
                               } type="password" placeholder="Confirm Password"/>
                        {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? ( <div className=" text-error">{signupFormik.errors.confirmPassword}</div>) : null}
                        <Button variant="contained" type="submit">Sign up</Button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={loginFormik.handleSubmit}>
                        <h2>Sign in</h2>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebook className="social-icon"/></a>
                            <a href="#" className="social"><FaGithub className="social-icon"/></a>
                            <a href="#" className="social"><FaLinkedin className="social-icon"/></a>
                        </div>
                        <span>use your account</span>
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
                        <a href="#">Forgot your password?</a>
                        <Button variant="contained" type="submit">Sign In</Button>
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

export default login;