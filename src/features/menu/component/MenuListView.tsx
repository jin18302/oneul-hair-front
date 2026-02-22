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
                <div className="col-start-1 col-end-12 row-start-6 row-end-12 w-150">
                    <div className="flex w-150">
                        {categoryList.map(c =>
                            <div className="flex-1 bg-black border border-black" 
                            onClick={() => categoryClickHandler(c)} key={c}>{c}
                            </div>
                            )}
                    </div>

                    <div >
                        {menuList.map(m => <MenuItem key={m.id} menuRes={m} menuClickFuntion={menuClickFuntion} />)}
                    </div>
                </div>
        </>
    )

}


