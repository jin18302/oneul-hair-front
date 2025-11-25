

export default function SearchButton({searchHandler}:{searchHandler:() => void}) {
    return (
        <button id="search-button" onClick={searchHandler}>검색</button>
    )
}