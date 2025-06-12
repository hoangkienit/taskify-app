import { Outlet } from "react-router-dom"
import { Header } from "../components/header/header"


export const StarterLayout = () => {


    return (
        <div className="main-container">
            <main className="content">
                <Header/>
                <Outlet/>
            </main>
        </div>
    )
}