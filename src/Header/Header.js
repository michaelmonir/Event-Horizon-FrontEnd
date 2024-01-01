/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import {Link} from "react-router-dom";
import {RoutePathNames} from "../Routes/RoutePathNames";
import { useMyContext } from '../Authentication/LogInContext';

export default function Header() {
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { isUserLoggedIn, removeUserLocalStorageData } = useMyContext();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);// Assuming initial state is logged in

    useEffect(() => {
    }, [isUserLoggedIn]);

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
                    <a href={RoutePathNames.dashboard}>Home</a>
                    <a href={RoutePathNames.profile}>Profile</a>
                    {/*{ isUserLoggedIn ?*/}
                    {/*    <a href="">logged in</a>*/}
                    {/*    :*/}
                    {/*    <a href="">Not logged in</a>}*/}
                    <Link to={RoutePathNames.login}>
                        <button onClick={
                            () => {
                                removeUserLocalStorageData();
                            }
                        }>Logout </button>
                    </Link>
                </nav>
            </CSSTransition>
        </header>
    );
}