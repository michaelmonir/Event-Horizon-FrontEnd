import {RoutePathNames} from "../Routes/RoutePathNames";
import {IoHome} from "react-icons/io5";
import {GiMailbox} from "react-icons/gi";
import {FaBookmark} from "react-icons/fa";
import {removeUserLocalStorageData} from "../Authentication/UserAuthentication";
import {RiLogoutBoxLine} from "react-icons/ri";
import React from "react";
import {useNavigate} from "react-router-dom";


export const ProfileSideMenu = (props) => {

    const profileAttributes = props.profileAttributes

    const navigate = useNavigate();

    return (
        <div className="profile-sidebar">
            <div className="profile-header">
                <div className="profile-pic"></div>
                <div className="profile-name"> {profileAttributes.firstName + " " + profileAttributes.lastName} </div>
                <div className="profile-desc"> {profileAttributes.role} </div>
            </div>
            <div className="profile-menu">
                < div className="website-nav">
                    <div className="menu-item" onClick={() => {
                        navigate(RoutePathNames.dashboard)
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
                        navigate(RoutePathNames.dashboard)
                    }
                }>
                    <i><RiLogoutBoxLine/></i>
                    <span>Log out</span>
                </div>
            </div>
        </div>
    )
}