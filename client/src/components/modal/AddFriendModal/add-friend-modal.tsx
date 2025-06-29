import React, { useState } from "react";
import "./add-friend-modal.css";
import type { IAddFriendModalProps } from "../../../interfaces/friend.interface";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Loading } from "../../loader/loader";
import { handleApiError } from "../../../utils/handleApiError";
import { AddFriend } from "../../../api/friend.api";
import { showTopToast } from "../../toast/toast";

const AddFriendModal: React.FC<IAddFriendModalProps> = ({ onClose, isOpen }) => {
    const [input, setInput] = useState("");
    const { t } = useTranslation("friend");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const response = await AddFriend(input);

            if (response.success) {
                showTopToast(response.message, "success", 5000);
            }
        } catch (error) {
            handleApiError(error, "Error while adding friend");
        }
        finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="find-friend-overlay">
            <div className="find-friend-modal">
                <button className="find-friend-close" onClick={onClose}>×</button>
                <h2 className="find-friend-title">🔍 {t('add-friend-modal-title')}</h2>
                <form onSubmit={handleSubmit} className="find-friend-form">
                    <input
                        type="text"
                        value={input}
                        required
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('add-friend-input-placeholder')}
                        className="find-friend-input"
                    />
                    {loading ? <Loading
                        size={25}
                        color="#5c70f3"
                        loading={loading}
                    /> :
                    <button type="submit" className="find-friend-button">{t('send-request-button')}</button>}
                </form>
            </div>
        </div>
    );
};

export default AddFriendModal;
