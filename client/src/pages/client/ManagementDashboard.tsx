import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";


export const ManagementDashboard = () => {
    const { t } = useTranslation("management");

    useDocumentTitle(t('title'));


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Management Dashboard</h1>
            <p className="text-lg">This is the management dashboard for administrators.</p>
        </div>
    );
}