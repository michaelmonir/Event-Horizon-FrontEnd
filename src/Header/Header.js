/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import {Link} from "react-router-dom";
import {removeUserLocalStorageData} from "../Authentication/UserAuthentication";

export default function Header({isLoggedIn, setIsLoggedIn}) {
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);// Assuming initial state is logged in

    useEffect(() => {
    }, [isLoggedIn]);

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    return (
        <header className="Header">
            <div className="title">
                <img src={require("./b.PNG")} className="Logo" alt="logo" />
                <div className="HeaderTitle">Event Horizon</div>
            </div>
            <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
            >
                <nav className="Nav">
                    <a href="/">Home</a>
                    <a href="/profile">Profile</a>
                    <a href="/shelter">Shelter</a>
                    <a href="/myPets">My Pets</a>
                    <a href="/myApplications">My Applications</a>
                    <Link to="/login">
                        <button onClick={
                            () => {
                                removeUserLocalStorageData();
                                setIsLoggedIn(false);
                            }
                        }>Logout </button>
                    </Link>
                </nav>
            </CSSTransition>
        </header>
    );
}