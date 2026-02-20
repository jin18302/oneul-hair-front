
import { useNavigate } from "react-router"
import SearchArea from "../../features/shop-search/component/SearchBox"
import React from "react";

export default function Header() {

    const navigator = useNavigate();
    console.log("Header rendaring")

    return (
        <header className="row-start-1 row-end-3 col-start-1 col-end-13 text-center">
            <h1 onClick={() => navigator('/')}>onuel hair</h1>
            <SearchArea />
        </header>
    )
}



