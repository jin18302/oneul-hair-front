import { useState } from "react";
import AreaFilterButton from "./AreaFllterButton";
import ShopFilterButton from "./TagFilterButton";


export default function SearchArea(){

    const[selectArea, setSelectArea] = useState<string | null>(null);

   return  (
    <div>
        <AreaFilterButton selectArea = {selectArea} setSelectArea = {setSelectArea} />
        <ShopFilterButton />
    </div>
   )
}