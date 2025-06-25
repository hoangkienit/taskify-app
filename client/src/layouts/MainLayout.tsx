import { Outlet } from "react-router-dom"
import { MainHeader } from "../components/header/main-header"
import { Sidebar } from "../components/sidebar/sidebar"


export const MainLayout = () => {


    return (
        <>
            <MainHeader/>
            <div className="main-content">
                <Outlet />
            </div>
            <Sidebar/>
        </>
    )
}