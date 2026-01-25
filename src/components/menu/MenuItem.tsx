import { useState } from "react";
import type { ServiceMenuRes } from "../../types/ServiceMenuRes";
import MenuEditModal from "./MenuEditModal";
import "../../styles/MenuView.css"
import { useLoginInfoStore } from "../../contexts/loginInfoStore";

export default function MenuItem({ menuRes, menuClickFuntion }
    : { menuRes: ServiceMenuRes, menuClickFuntion: ((n: number) => void) | undefined }) {

    
    const [isEditMode, setEditMode] = useState<boolean>(false);
    
    const userRole = useLoginInfoStore(s => s.userRole);
    const element = userRole == "OWNER" ? <button onClick={() => setEditMode(true)} >수정</button> : null;

    const fun = menuClickFuntion == undefined ? undefined : menuClickFuntion(menuRes.id);

    return (
        <>
            {isEditMode ? <MenuEditModal menuRes={menuRes} setEditMode={setEditMode} />
                : <div className="menu" onClick={() => fun}>
                    {menuRes.name} <br /><br />
                    {menuRes.price} <br /><br />
                    {menuRes.introduction} <br />
                    {element}
                </div>}
        </>
    )
}