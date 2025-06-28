import type React from "react";
import type { IFriendListProps } from "../../interfaces/user.interface";
import './friend-card.css'



export const FriendCard: React.FC<IFriendListProps> = ({friend}) => {

    return (
        <div key={friend.userId} className="friend-card-container">
            <div className="friend-card-avatar-section">
                <img src={friend.profileImg} alt="User Avatar" className="friend-card-avatar" />
            </div>
            <div className="friend-card-info-section">
                <p className="friend-card-userId">#{friend.userId }</p>
                <p className="friend-card-username">{friend.username}</p>
                <p className="friend-card-createdAt">{friend.createdAt.toLocaleDateString() }</p>
            </div>
        </div>
    )
}