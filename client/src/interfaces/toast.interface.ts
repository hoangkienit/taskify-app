import type { TFunction } from "i18next";

export interface IToastFriendRequestProps {
    from: string;
    avatar: string;
    time: string | Date;
    onClick: () => void;
    t: TFunction;
}