import React, { useState } from 'react';
import '../styles/friends.css';
import { FriendCard } from '../../components/friend/friend-card';
import type { IFriend } from '../../interfaces/friend.interface';
import { FaSearch } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import AddFriendModal from '../../components/modal/AddFriendModal/add-friend-modal';

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


const Friends: React.FC = () => {
    const [friends, setFriends] = useState<IFriend[]>(sampleFriends);
    const [search, setSearch] = useState('');
    const [newFriendName, setNewFriendName] = useState('');
    const { t } = useTranslation("friend");
    useDocumentTitle(t('friend-title'));
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState<boolean>(false);

    const handleAddFriend = () => {
        setIsAddFriendModalOpen(true);
    };

    const filteredFriends = friends.filter((f) =>
        f.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="friends-page">
            <h1 className="friends-page__title">{ t('friend-list-title')}</h1>

            <div className="friends-page__top-bar">
                <div className="friend-search-input-section">
                    <input
                    className="friends-page__search-input"
                    type="text"
                    placeholder={t('search-friend-placeholder')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <FaSearch className='search-page-search-icon'/> */}
                </div>

                <div className="friends-page__add-wrapper">
                    <button
                        onClick={handleAddFriend}
                        className="friends-page__add-btn"
                    >
                        {t('add-friend-button')}
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
                    <li className="friends-page__empty">No friends found.</li>
                )}
            </div>

            {/** Add friend modal*/}
            <AddFriendModal
                isOpen={isAddFriendModalOpen}
                onClose={() => setIsAddFriendModalOpen(false)}
                onAddFriend={() => {}}
            />
        </div>
    );
};

export default Friends;
