import { Outlet } from "react-router"


export default function Main() {

    return (
        <>
            <main className="row-start-3 row-end-9 col-start-3 col-end-12
            grid grid-cols-12 grid-rows-12 items-center justify-items-center gap-16">
                <Outlet />
            </main>
        </>
    )
}