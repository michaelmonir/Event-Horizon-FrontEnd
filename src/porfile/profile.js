import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './profie.css';
import {IoHome} from "react-icons/io5";

import {GiMailbox} from "react-icons/gi";
import {FaBookmark} from "react-icons/fa";
import {RiLogoutBoxLine} from "react-icons/ri";
import BasicModal from "./profile-update-modal";
import informationApis from "../Apis/UserApis/InformationApis";


function Profile(props) {
    const navigate = useNavigate();
    const LOCAL_STORAGE_KEY = "token";
    const LOCAL_STORAGE_KEY_ID = "id";

    const [token, setToken] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);
    const [id, setId] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ID)) ?? []);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
    }, [token]);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_ID, JSON.stringify(id))
    }, [id]);
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
                    "id": id
                },
            });
            setProfileAttributtes(response.data)
        } catch (error) {
            alert("not Found")
        }
    }

    useEffect(() => {
        f()
    }, []);
    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-header">
                    <div className="profile-pic"></div>
                    <div className="profile-name">Mohamed Ryad</div>
                    <div className="profile-desc">Admin</div>
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
                            localStorage.removeItem("token");
                            localStorage.removeItem("id");
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