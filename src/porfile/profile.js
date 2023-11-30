import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './profie.css';
import {IoHome} from "react-icons/io5";

import {GiMailbox} from "react-icons/gi";
import {FaBookmark} from "react-icons/fa";
import {RiLogoutBoxLine} from "react-icons/ri";
import BasicModal from "./profile-update-modal";
import informationApis from "../Apis/UserApis/InformationApis";
import {getUserId, isUserLoggedIn, removeUserLocalStorageData} from "../Authentication/UserAuthentication";


function Profile(props) {
    const navigate = useNavigate();

    const [profileAttributtes, setProfileAttributtes] = React.useState({
        "firstName":"",
        "lastName":"",
        "paypalAccount":"",
        "userName":"",
        "role":"",
        "gender":""
    });

    const f = async() => {
        try {
            const response = await informationApis.get("getInformationViewDto", {
                params: {
                    "id": getUserId()
                },
            });
            setProfileAttributtes(response.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        if (isUserLoggedIn() === false) {
            alert("User not logged in")
            navigate('/dashboard')
        }
        else {
            f()
        }
    }, []);
    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-header">
                    <div className="profile-pic"></div>
                    <div className="profile-name"> {profileAttributtes.firstName + " " + profileAttributtes.lastName} </div>
                    <div className="profile-desc"> {profileAttributtes.role} </div>
                </div>
                <div className="profile-menu">
                    < div className="website-nav">
                        <div className="menu-item" onClick={() => {
                            navigate("/dashboard")
                        }
                        }>
                            <i><IoHome/></i>
                            <span>Home</span>
                        </div>
                        <div className="menu-item">
                            <i>
                                <GiMailbox/>
                            </i>
                            <span>Messages</span>
                        </div>
                        <div className="menu-item">
                            <i>
                                <FaBookmark/>
                            </i>
                            <span>Bookmarks</span>
                        </div>
                    </div>

                    <div className="menu-item" onClick={
                        () => {
                                removeUserLocalStorageData()
                                navigate("/")
                            }
                        }>
                        <RiLogoutBoxLine/>
                        <span>Log out</span>
                    </div>
                </div>
            </div>
            <div className="profile-main-content">
                <div className="profile-main-content-header">
                    <div className="header-title">
                        Profile
                    </div>
                    <div className="header-btns">
                        <BasicModal defaultFirstName={profileAttributtes.firstName} defaultGender={profileAttributtes.gender} defaultLastName={profileAttributtes.lastName}
                                    defaultPaypalAccount={profileAttributtes.paypalAccount}/>
                    </div>
                </div>
                <div className="profile-main-content-body">
                    <div className="profile-info-container"
                         style={{
                             borderTopLeftRadius: "35px",
                             borderTopRightRadius: "35px",
                         }}
                    >
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">UserName:</div>
                            <div className="profile-info-item-value">{profileAttributtes.userName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">first name:</div>
                            <div className="profile-info-item-value">{profileAttributtes.firstName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">last name:</div>
                            <div className="profile-info-item-value">{profileAttributtes.lastName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">Role:</div>
                            <div className="profile-info-item-value">{profileAttributtes.role}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">Email:</div>
                            <div className="profile-info-item-value">
                                {profileAttributtes.email}
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">gender:</div>
                            <div className="profile-info-item-value">{profileAttributtes.gender}</div>
                        </div>
                    </div>
                    <div className="profile-info-container"
                         style={{
                             borderBottomLeftRadius: "35px",
                             borderBottomRightRadius: "35px",
                         }}
                    >
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">paypal account:</div>
                            <div className="profile-info-item-value"> {profileAttributtes.paypalAccount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Profile;