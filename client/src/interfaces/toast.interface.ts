export interface IToastFriendRequestProps {
    from: string;
    avatar: string;
    onAccept: () => void;
    onReject: () => void;
}