import React, { useState } from 'react';
import '../styles/friends.css';
import { FriendCard } from '../../components/friend/friend-card';
import type { IFriend } from '../../interfaces/user.interface';

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

    const handleAddFriend = () => {
        if (newFriendName.trim() === '') return;
        const newFriend: IFriend = {
            userId: "fsfsef",
            username: newFriendName.trim(),
            profileImg: "",
            createdAt: new Date("2024-12-01T12:15:00Z")
        };
        setFriends([...friends, newFriend]);
        setNewFriendName('');
    };

    const filteredFriends = friends.filter((f) =>
        f.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="friends-page">
            <h1 className="friends-page__title">My Friends</h1>

            <div className="friends-page__top-bar">
                <input
                    className="friends-page__search-input"
                    type="text"
                    placeholder="Search friends..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="friends-page__add-wrapper">
                    <input
                        type="text"
                        className="friends-page__add-input"
                        placeholder="Add new friend"
                        value={newFriendName}
                        onChange={(e) => setNewFriendName(e.target.value)}
                    />
                    <button
                        onClick={handleAddFriend}
                        className="friends-page__add-btn"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="friends-page__list">
                {filteredFriends.map((friend) => (
                    <FriendCard
                        friend={friend}
                    />
                ))}
                {filteredFriends.length === 0 && (
                    <li className="friends-page__empty">No friends found.</li>
                )}
            </div>
        </div>
    );
};

export default Friends;
