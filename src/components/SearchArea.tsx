import { useState } from "react";
import AreaFilterButton from "./AreaFllterButton";


export default function SearchArea(){

    const[selectArea, setSelectArea] = useState<string | null>(null);
   return  <AreaFilterButton selectArea = {selectArea} setSelectArea = {setSelectArea} />
}