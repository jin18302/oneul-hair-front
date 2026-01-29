import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import type { MenuRes } from "../type/response";
import { menuService } from "../service/menuService";

export default function MenuListView({designerId, menuClickFuntion}
    :{designerId : number, menuClickFuntion:((n: number) => void) | undefined}
) {

    console.log("MenuListView rendering");
    
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [selectCategory, setSelectCategory] = useState<string>("CUT");
    const [menuList, setMenuList] = useState<MenuRes[]>([]);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const categoryApiHandler = async() => {
            const response = await menuService.getMenuCategoryList();
            setCategoryList(response);
        }
        categoryApiHandler();
    },[])

    useEffect(() => {

        const menuApiHandler = async () => {
            const response = await menuService.getMenuListByDegisner(designerId, selectCategory);
            setMenuList(response);
            setIsLoding(false);
        }
        menuApiHandler();


    }, [selectCategory]);

    const categoryClickHandler = (c: string) => { setSelectCategory(c) };

    if (isLoding) { return <div>Loading...</div> }

    return (
        <>
            {!isLoding &&
                <div className="service-menu-container">
                    <div className="service-category-container">
                        {categoryList.map(c =>
                            <div className="category-element" onClick={() => categoryClickHandler(c)} key={c}>{c}</div>)}
                    </div>

                    <div className="menu-list-container">
                        {menuList.map(m => <MenuItem key={m.id} menuRes={m} menuClickFuntion={menuClickFuntion}/>)}
                    </div>
                </div>
            }
        </>
    )

}


