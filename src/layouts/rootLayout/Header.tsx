
import { useNavigate } from "react-router"
import SearchArea from "../../components/searchElement/SearchArea"
import "../../styles/Header.css"
import "../../styles/Layout.css"

export default function Header() {

    const navigator = useNavigate();

    return (
        <header>
            <h1 onClick={() => navigator('/')}>onuel hair</h1>
            <SearchArea />
        </header>
    )
}