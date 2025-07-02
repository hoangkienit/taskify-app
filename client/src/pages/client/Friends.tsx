import React, { useEffect, useState } from 'react';
import '../styles/friends.css';
import { FriendCard } from '../../components/friend/friend-card';
import type { IFriend, IFriendRequest } from '../../interfaces/friend.interface';
import { FaSearch } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import AddFriendModal from '../../components/modal/AddFriendModal/add-friend-modal';
import FriendRequestModal from '../../components/modal/FriendRequestsModal/friend-requests-modal';
import { handleApiError } from '../../utils/handleApiError';
import { FullPageLoader, Loading } from '../../components/loader/loader';
import { GetFriendRequests, GetFriends } from '../../api/friend.api';

const Friends: React.FC = () => {
    const [friends, setFriends] = useState<IFriend[]>([]);
    const [search, setSearch] = useState('');
    const { t } = useTranslation("friend");
    useDocumentTitle(t('friend-title'));
    const [friendRequestCount, setFriendRequestCount] = useState<number>(0);
    const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>([]);

    // Flag
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState<boolean>(false);
    const [isFriendRequestModalOpen, setIsFriendRequestModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const handleAddFriend = () => {
        setIsAddFriendModalOpen(true);
    };

    const filteredFriends = friends.filter((f) =>
        f.username.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        fetchFriends();
    }, []);

    const onAccept = async(_id: string) => {
        try {
            
        } catch (error) {
            
        }
    }

    const fetchFriendRequests = async() => {
        try {
            setLoading(true);
            const response = await GetFriendRequests();

            if (response.success) {
                setFriendRequests(response.data.requests);
                setIsFriendRequestModalOpen(true);
            }
        } catch (error) {
            handleApiError(error, "Error in Friend Request");
        }
        finally {
            setLoading(false);
        }
    }

    const fetchFriends = async () => {
        try {
            setLoading(true);
            const response = await GetFriends();

            if (response.success) {
                setFriends(response.data.friends);
                setFriendRequestCount(response.data.requests);
            }
        } catch (error) {
            handleApiError(error, "Error in Friend");
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <FullPageLoader
                size={50}
                loading={loading}
                color=''
            />
        )
    }

    return (
        <div className="friends-page">
            <h1 className="friends-page__title">{ t('friend-list-title')}</h1>

            <div className="friends-page__top-bar">
            <input
                    className="friends-page__search-input"
                    type="text"
                    placeholder={t('search-friend-placeholder')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />

                <div className="friends-page__add-wrapper">
                    <button
                        onClick={handleAddFriend}
                        className="friends-page__add-btn"
                    >
                        {t('add-friend-button')}
                    </button>
                    <button
                        onClick={() => fetchFriendRequests()}
                        className="friends-page__add-btn"
                    >
                        {t('friend-requests-button')} {friendRequestCount > 0 && `(${friendRequestCount})`}
                    </button>
                </div>
            </div>

            <div className="friends-page__list">
                {filteredFriends.map((friend, index) => (
                    <FriendCard
                        key={index}
                        friend={friend}
                    />
                ))}
                {filteredFriends.length === 0 && (
                    <li className="friends-page__empty">{t('no-friend-found')}</li>
                )}
            </div>

            {/** Add friend modal*/}
            <AddFriendModal
                isOpen={isAddFriendModalOpen}
                onClose={() => setIsAddFriendModalOpen(false)}
                onAddFriend={() => {}}
            />

            {/** Friend requests modal*/}
            <FriendRequestModal
                isOpen={isFriendRequestModalOpen}
                onClose={() => setIsFriendRequestModalOpen(false)}
                onAccept={() => { }}
                onReject={() => { }}
                requests={friendRequests}
            />
        </div>
    );
};

export default Friends;
