import React, {useEffect} from 'react';
import './profie.css';
import {IoHome} from "react-icons/io5";

import {GiMailbox} from "react-icons/gi";
import {FaBookmark} from "react-icons/fa";
import {RiLogoutBoxLine} from "react-icons/ri";
import BasicModal from "./profile-update-modal";
import informationApis from "../Apis/UserApis/InformationApis";
import {getUserId, removeUserLocalStorageData} from "../Authentication/UserAuthentication";
import {RoutePathNames} from "../Routes/RoutePathNames";
import {ProfileSideMenu} from "./ProfileSideMenu";


function Profile() {


    const [profileAttributes, setProfileAttributes] = React.useState({
        firstName:"",
        lastName:"",
        paypalAccount:"",
        userName:"",
        role:"",
        gender:""
    });

    const f = async() => {
        try {
            const response = await informationApis.get("getInformationViewDto", {
                params: {
                    "id": getUserId()
                },
            });
            setProfileAttributes(response.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        f()
    }, []);
    return (
        <div className="profile-container">
            <ProfileSideMenu profileAttributes={profileAttributes} />
            <div className="profile-main-content">
                <div className="profile-main-content-header">
                    <div className="header-title">
                        Profile
                    </div>
                    <div className="header-btns">
                        <BasicModal
                            defaultFirstName={profileAttributes.firstName}
                            defaultGender={profileAttributes.gender}
                            defaultLastName={profileAttributes.lastName}
                            defaultPaypalAccount={profileAttributes.paypalAccount}/>
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
                            <div className="profile-info-item-value">{profileAttributes.userName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">first name:</div>
                            <div className="profile-info-item-value">{profileAttributes.firstName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">last name:</div>
                            <div className="profile-info-item-value">{profileAttributes.lastName}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">Role:</div>
                            <div className="profile-info-item-value">{profileAttributes.role}</div>
                        </div>

                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">Email:</div>
                            <div className="profile-info-item-value">
                                {profileAttributes.email}
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-item">
                            <div className="profile-info-item-title">gender:</div>
                            <div className="profile-info-item-value">{profileAttributes.gender}</div>
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
                            <div className="profile-info-item-value"> {profileAttributes.paypalAccount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Profile;