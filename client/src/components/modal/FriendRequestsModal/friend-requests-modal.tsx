// components/FriendRequestModal.tsx
import React from 'react';
import './friend-requests-modal.css';
import type { IFriendRequestModalProps } from '../../../interfaces/friend.interface';
import { formatTimeAgo } from '../../../utils';
import { useTranslation } from 'react-i18next';

const FriendRequestModal: React.FC<IFriendRequestModalProps> = ({
    isOpen,
    requests,
    onClose,
    onAccept,
    onReject
}) => {
    const { t } = useTranslation("friend");
    if (!isOpen) return null;

    return (
        <div className="fr-modal__overlay" onClick={onClose}>
            <div className="fr-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="fr-modal__header">
                    <h2 className="fr-modal__title">{ t("friend-requests-button")}</h2>
                    <button className="fr-modal__close-btn" onClick={onClose}>×</button>
                </div>

                <div className="fr-modal__body">
                    {requests.length === 0 ? (
                        <p className="fr-modal__message">{ t("no-friend-requests")}</p>
                    ) : (
                        <ul className="fr-request__list">
                            {requests.map(({ _id, username, profileImg, requestedAt }) => (
                                <li key={_id} className="fr-request__item">
                                    <div className="fr-request__info">
                                        <img
                                            src={profileImg || 'https://via.placeholder.com/40'}
                                            alt={username}
                                            className="fr-request__avatar"
                                        />
                                        <div className="fr-request__details">
                                            <span className="fr-request__username">{username}</span>
                                            <span className="fr-request__time">{formatTimeAgo(requestedAt, t)}</span>
                                        </div>
                                    </div>
                                    <div className="fr-request__actions">
                                        <button
                                            className="fr-btn fr-btn--accept"
                                            onClick={() => onAccept(_id)}
                                        >
                                            {t('accept-button')}
                                        </button>
                                        <button
                                            className="fr-btn fr-btn--reject"
                                            onClick={() => onReject(_id)}
                                        >
                                            {t('reject-button')}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendRequestModal;
