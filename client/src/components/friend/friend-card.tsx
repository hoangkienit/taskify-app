import type React from "react";
import type { IFriendListProps } from "../../interfaces/user.interface";
import './friend-card.css'
import { useTranslation } from "react-i18next";
import { FaUserTimes } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";


export const FriendCard: React.FC<IFriendListProps> = ({friend}) => {
    const { t } = useTranslation("friend");

    return (
        <div key={friend.userId} className="friend-card-container">
            <div className="friend-card-avatar-section">
                <img src={friend.profileImg} alt="User Avatar" className="friend-card-avatar" />
            </div>
            <div className="friend-card-info-section">
                <p className="friend-card-userId">#{friend.userId }</p>
                <p className="friend-card-username">{friend.username}</p>
                <p className="friend-card-createdAt">{t('joined-at')} {friend.createdAt.toLocaleDateString() }</p>
            </div>
            <div className="friend-card-action-section">
                <SiGooglemessages className="friend-card-action-icon message-icon"/>
                <FaUserTimes className="friend-card-action-icon unfriend-icon"/>
            </div>
        </div>
    )
}