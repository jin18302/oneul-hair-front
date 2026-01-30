
import { useNavigate } from "react-router"
import SearchArea from "../../features/shop-search/component/SearchBox"
import "../../styles/Header.css"
import "../../styles/Layout.css"
import React from "react";

export default function Header() {

    const navigator = useNavigate();
    console.log("Header rendaring")

    return (
        <header>
            <h1 onClick={() => navigator('/')}>onuel hair</h1>
            <SearchArea />
        </header>
    )
}



