import { useState } from "react";
import { useGetCategoriesQuery, useGetDesignerMenusQuery } from "../hook/useMenuQuery";
import MenuItem from "./MenuItem";

export default function MenuListView({ designerId, menuClickFuntion }
    : { designerId: string, menuClickFuntion: ((n: number) => void) | undefined }
) {

    console.log("MenuListView rendering");

    const [selectCategory, setSelectCategory] = useState<string>("CUT");
    const { data: menuList, isLoading: menuIsLoading } = useGetDesignerMenusQuery(designerId, selectCategory);
    const { data: categoryList } = useGetCategoriesQuery();


    const categoryClickHandler = (c: string) => { setSelectCategory(c) };

    if (menuIsLoading) { return <div>Loading...</div> }

    return (
        <>
                <div className="service-menu-container">
                    <div className="service-category-container">
                        {categoryList?.map(c =>
                            <div className="category-element" onClick={() => categoryClickHandler(c)} key={c}>{c}</div>)}
                    </div>

                    <div className="menu-list-container">
                        {menuList?.map(m => <MenuItem key={m.id} menuRes={m} menuClickFuntion={menuClickFuntion} />)}
                    </div>
                </div>
        </>
    )

}


