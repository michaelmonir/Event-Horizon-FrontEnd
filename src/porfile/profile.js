import React from 'react';
import './profie.css';
import {IoHome} from "react-icons/io5";
import {FaPen} from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

import {GiMailbox} from "react-icons/gi";
import {FaBookmark} from "react-icons/fa";
import {RiLogoutBoxLine} from "react-icons/ri";
import BasicModal from "./profile-update-modal";


function Profile(props) {

    const { firstName, lastName, email, gender, paypalAccount, userName, role } = props.profileAttributes;

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
                        <div className="menu-item">
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

                    <div className="menu-item">
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
                       <BasicModal defaultFirstName={firstName} defaultGender={gender} defaultLastName={lastName} defaultPaypalAccount={paypalAccount}/>
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
                            <div className="profile-info-item-value">{userName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">first name:</div>
                            <div className="profile-info-item-value">{firstName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">last name:</div>
                            <div className="profile-info-item-value">{lastName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">Role:</div>
                            <div className="profile-info-item-value">{role}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">Email:</div>
                            <div className="profile-info-item-value">
                                {email}
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">gender:</div>
                            <div className="profile-info-item-value">{gender}</div>
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
                            <div className="profile-info-item-value"> {paypalAccount}</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}


export default Profile;