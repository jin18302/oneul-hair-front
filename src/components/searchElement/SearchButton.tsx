

export default function SearchButton({searchHandler}:{searchHandler:() => void}) {

      console.log("SearchButton rendering");
    return (
        <button id="search-button" onClick={searchHandler}>검색</button>
    )
}