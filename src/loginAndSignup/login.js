import React, {useState} from 'react';
import './login.css';
import Button from '@mui/material/Button';
import {FaGithub, FaFacebook, FaLinkedin} from "react-icons/fa";
import classNames from "classnames";




function Login() {
         const [isLoginActive, setIsLoginActive] = useState(false);


    return (
        <div className="Body">
            <div className= {classNames({ "Container":true,"active":isLoginActive })} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h2>Create Account</h2>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebook className="social-icon"/></a>
                            <a href="#" className="social"><FaGithub className="social-icon"/></a>
                            <a href="#" className="social"><FaLinkedin className="social-icon"/></a>
                        </div>
                        <span>or use your email for registration or Gmail</span>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Confirm Password"/>
                        <Button variant="contained">Sign up</Button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h2>Sign in</h2>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebook className="social-icon"/></a>
                            <a href="#" className="social"><FaGithub className="social-icon"/></a>
                            <a href="#" className="social"><FaLinkedin className="social-icon"/></a>
                        </div>
                        <span>use your account</span>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <a href="#">Forgot your password?</a>
                        <Button variant="contained">Sign In</Button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h2>Welcome Back!</h2>
                            <p>To keep connected with us please login with your personal info</p>
                            <Button variant="contained" className="ghost" id="signIn" onClick={() => setIsLoginActive(false)} >Sign In</Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h2>Hello, My Friend!</h2>
                            <p>Enter your details and start journey with us</p>
                            <Button variant="contained" className="ghost" id="signUp" onClick={ () => setIsLoginActive(true)}>Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;