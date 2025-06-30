import type { TFunction } from "i18next";


export const formatTimeAgo = (date: string | Date, t: TFunction): string => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now.getTime() - then.getTime()) / 1000); // in seconds

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} ${t('minutes-ago')}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ${t('hours-ago')}`;
    return `${Math.floor(diff / 86400)} ${t('days-ago')}`;
};
