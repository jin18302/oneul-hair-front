import { useState } from "react"
import TagFilterModal from "./TagFilterModal";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";

export default function TagFilter(){

     console.log("TagFilterArea rendering");

    const [isShowTagModal, setIsShowModal] = useState<boolean>(false);
    const selectTags = searchConditionStore((s) => s.tagList);
    const clickHandler = () => setIsShowModal(true);

    return(
       <div className="col-start-1 col-end-2 row-start-1 row-end-2 inline-block">
          <button className= "bg-blue-500" onClick={clickHandler}> 태그 선택 </button>
              {isShowTagModal && <TagFilterModal closeModal = {() => setIsShowModal(false)} />}
              {selectTags && selectTags.map(t => (<div key={t.id} className="inline-block py-1 px-2 m-1 bg-[rgb(163,163,245)] rounded-sm">{t.name}</div>))}
       </div>
    )

}