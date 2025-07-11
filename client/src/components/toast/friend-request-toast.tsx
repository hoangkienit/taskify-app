import React from 'react';
import './toast.css';
import type { IToastFriendRequestProps } from '../../interfaces/toast.interface';
import { formatTimeAgo } from '../../utils';


function FriendRequestToast({ from, avatar, time, onClick, t }: IToastFriendRequestProps) {
    return (
        <div className="frtoast-wrapper">
            <img src={avatar} alt="Avatar" className="frtoast-avatar" />
            <div className="frtoast-content">
                <p><strong>{from}</strong> {t('sent-you-friend-request')}</p>
                <div className="frtoast-actions">
                    <p className='frtoast-time'>{formatTimeAgo(time, t)}</p>
                    <button className="frtoast-btn frtoast-accept" onClick={onClick}>{t('view-button') }</button>
                </div>
            </div>
        </div>
    );
}

export default FriendRequestToast;
