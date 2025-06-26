import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useEffect } from "react";
import ToastNotification, { showTopToast } from "../../components/toast/toast";
import { GetUser } from "../../api/user.api";


export const ManagementDashboard = () => {
    const { t } = useTranslation("management");

    useDocumentTitle(t('title'));

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = async () => {
        try {
            await GetUser();
        } catch (error) {
            
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ToastNotification/>
            <h1 className="text-4xl font-bold mb-4">Management Dashboard</h1>
            <p className="text-lg">This is the management dashboard for administrators.</p>
        </div>
    );
}