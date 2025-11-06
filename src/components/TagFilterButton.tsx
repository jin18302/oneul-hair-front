import { useState } from "react"
import TagFilterModal from "./TagFilterModal";
import type { ShopTag } from "../types/ShopTag";
import "../styles/Modal.css"


export default function ShopFilterButton(){

    const [isShowTagModal, setIsShowModal] = useState<boolean>(false);
    const[selectedTags, setSeletedTags] = useState<ShopTag[]>([]);

    const clickHandler = () => setIsShowModal(true);

    return(
        <>
        <div>
              <button onClick={clickHandler}>태그 선택</button>
              {isShowTagModal && <TagFilterModal 
              closeModal = {() => setIsShowModal(false)} 
              selectedTags = {selectedTags} setSeletedTags = {(s:ShopTag) => setSeletedTags(prev => [...prev, s])}/>}
              {selectedTags && selectedTags.map(t => (<div key={t.id} className="seleted-element">{t.name}</div>))}
        </div>
        </>
    )

}