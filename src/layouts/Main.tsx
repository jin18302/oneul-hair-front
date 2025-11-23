import { Outlet } from "react-router"
import "../styles/Layout.css"


export default function Main() {

    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    )
}