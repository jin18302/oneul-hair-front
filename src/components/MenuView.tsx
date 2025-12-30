import { useEffect, useState } from "react";
import { axiosInstance } from "../AxiosInstance";
import type { ServiceMenuRes } from "../types/ServiceMenuRes";
import "../styles/MenuView.css"

export default function MenuView({ designerId, setMenu} 
: { designerId : string | undefined, setMenu : (menuId:number) => void }
){

     console.log("MenuView rendering");

    const [categoryList] = useState<string[]>(["CUT", "PARM", "COLOR", "CLINIC", "DRY", "SET", "EVENT"]);
    const [selectCategory, setSelectCategory] = useState<string>(categoryList[0]);
    const [menuList, setMenuList] = useState<ServiceMenuRes[]>([]);

    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const menuApiHandler = async () => {
            const response = await axiosInstance.get(`/auth/designers/${designerId}/service-menus`,
                { params: { category: selectCategory } });

            setMenuList(response.data);
        }
        menuApiHandler();
        setIsLoding(false);

    }, [selectCategory]);

    const categoryClickHandler = (c: string) => {setSelectCategory(c)};
    const menuClickHandler = (menuId: number) => {setMenu(menuId)};


    if (isLoding) { return <div>Loding...</div> }

    return (
        <>
            {!isLoding &&
                <div className="service-menu-container">
                    <div className="service-category-container">
                        {categoryList.map(c => <div className="category-element"  onClick={() => categoryClickHandler(c)} key={c}>{c}</div>)}
                    </div>

                    <div className="service-menus-container">
                        {menuList.map(m =>
                                <div className="menu" onClick={() => menuClickHandler(m.id)} key={m.id}>
                                    {m.name} <br/><br/>
                                    {m.price} <br/><br/>
                                    {m.introduction} <br/>
                                </div>
                            )}
                    </div>
                </div>
            }
            
        </>
    )
}