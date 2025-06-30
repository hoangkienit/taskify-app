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
import { GetFriends } from '../../api/friend.api';

const sampleFriends: IFriend[] = [
    {
        userId: "1",
        username: "Alice Nguyen",
        profileImg: "https://iampesmobile.com/uploads/user-avatar-taskify.jpg",
        createdAt: new Date("2023-01-15T10:00:00Z"),
    },
    {
        userId: "2",
        username: "Bob Tran",
        profileImg: "https://i.pravatar.cc/150?img=12",
        createdAt: new Date("2023-05-20T15:45:00Z"),
    },
    {
        userId: "3",
        username: "Charlie Le",
        profileImg: "https://i.pravatar.cc/150?img=18",
        createdAt: new Date("2024-02-10T08:30:00Z"),
    },
    {
        userId: "4",
        username: "David Pham",
        profileImg: "https://i.pravatar.cc/150?img=5",
        createdAt: new Date("2024-12-01T12:15:00Z"),
    },
];

const mockRequests: IFriendRequest[] = [
    {
        id: '1',
        username: 'Alice Nguyen',
        avatarUrl: 'https://i.pravatar.cc/40?u=alice',
        createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
    },
    {
        id: '2',
        username: 'Bob Tran',
        avatarUrl: 'https://i.pravatar.cc/40?u=bob',
        createdAt: new Date(Date.now() - 2 * 3600 * 1000), // 2 hours ago
    },
    {
        id: '3',
        username: 'Charlie Pham',
        createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000), // 1 day ago
    },
];



const Friends: React.FC = () => {
    const [friends, setFriends] = useState<IFriend[]>([]);
    const [search, setSearch] = useState('');
    const { t } = useTranslation("friend");
    useDocumentTitle(t('friend-title'));
    const [friendRequests, setFriendRequests] = useState<number>(0);

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

    const fetchFriends = async () => {
        try {
            setLoading(true);
            const response = await GetFriends();

            if (response.success) {
                setFriends(response.data.friends);
                setFriendRequests(response.data.requests);
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
                        onClick={() => setIsFriendRequestModalOpen(true)}
                        className="friends-page__add-btn"
                    >
                        {t('friend-requests-button')} ({friendRequests > 0 && `${friendRequests}`})
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
                requests={mockRequests}
            />
        </div>
    );
};

export default Friends;
