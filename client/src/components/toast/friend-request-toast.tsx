import React from 'react';
import './toast.css';
import type { IToastFriendRequestProps } from '../../interfaces/toast.interface';


function FriendRequestToast({ from, avatar, onAccept, onReject }: IToastFriendRequestProps) {
    return (
        <div className="frtoast-wrapper">
            <img src={avatar} alt="Avatar" className="frtoast-avatar" />
            <div className="frtoast-content">
                <p><strong>{from}</strong> sent you a friend request.</p>
                <div className="frtoast-actions">
                    <button className="frtoast-btn frtoast-accept" onClick={onAccept}>Accept</button>
                    <button className="frtoast-btn frtoast-reject" onClick={onReject}>Reject</button>
                </div>
            </div>
        </div>
    );
}

export default FriendRequestToast;
