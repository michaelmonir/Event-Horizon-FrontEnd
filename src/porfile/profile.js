import React, {useEffect} from 'react';
import './profie.css';
import BasicModal from "./profile-update-modal";
import informationApis from "../Apis/UserApis/InformationApis";
import {getUserId} from "../Authentication/UserAuthentication";
import {ProfileSideMenu} from "./ProfileSideMenu";
import {ProfileAttributeComponent} from "./ProfileAttributeComponent";


function Profile() {

    const [profileAttributes, setProfileAttributes] = React.useState({
        userName:"",
        firstName:"",
        lastName:"",
        role:"",
        gender:"",
        paypalAccount:"",
    });

    useEffect(() => {
        const sendInformationRequest = async() => {
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
        sendInformationRequest()
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
                    <ProfileAttributeComponent attributeName="UserName" attributeValue={profileAttributes.userName} />
                    <ProfileAttributeComponent attributeName="Email" attributeValue={profileAttributes.email} />
                    <ProfileAttributeComponent attributeName="First Name" attributeValue={profileAttributes.firstName} />
                    <ProfileAttributeComponent attributeName="Last Name" attributeValue={profileAttributes.lastName} />
                    <ProfileAttributeComponent attributeName="Role" attributeValue={profileAttributes.role} />
                    <ProfileAttributeComponent attributeName={"Gender"} attributeValue={profileAttributes.gender} />
                    <ProfileAttributeComponent attributeName="Paypal Account" attributeValue={profileAttributes.paypalAccount} />
                </div>
            </div>
        </div>
    );
}


export default Profile;