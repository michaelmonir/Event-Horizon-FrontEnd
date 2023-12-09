import React from "react";

export const ProfileAttributeComponent = ({attributeName, attributeValue}) => {
    return (
        <div className="profile-info-container">
            <div className="profile-info-item">
                <div className="profile-info-item-title">{attributeName}:</div>
                <div className="profile-info-item-value">{attributeValue}</div>
            </div>
        </div>
    )
}