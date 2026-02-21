import { Outlet } from "react-router"


export default function Main() {


    return (
        <>
            <main className="row-start-3 row-end-12 col-start-2 col-end-9
            grid grid-cols-12 grid-rows-12 items-center justify-items-center gap-16">
                <Outlet />
            </main>
        </>
    )
}
