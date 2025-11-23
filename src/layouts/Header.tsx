
import SearchArea from "../components/SearchArea"
import "../styles/Header.css"
import "../styles/Layout.css"

export default function Header({searchHandler}:{searchHandler:() => void}){

    return(
        <header>
        <h1>onuel hair</h1>
        <SearchArea searchHandler = {searchHandler}/>
        </header>
    )
}