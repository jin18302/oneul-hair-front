import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance";
import type { ServiceMenuRes } from "../../types/ServiceMenuRes";
import MenuItem from "./MenuItem";

export default function MenuListView({designerId, menuClickFuntion}
    :{designerId : number, menuClickFuntion:((n: number) => void) | undefined}
) {

    console.log("MenuListView rendering");
    
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [selectCategory, setSelectCategory] = useState<string>("CUT");
    const [menuList, setMenuList] = useState<ServiceMenuRes[]>([]);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const categoryApiHandler = async() => {
            const response = await axiosInstance.get<string[]>(`/auth/menu-categories`);
            setCategoryList(response.data);
        }
        categoryApiHandler();
    },[])

    useEffect(() => {

        const menuApiHandler = async () => {
            const response = await axiosInstance.get<ServiceMenuRes[]>(`/auth/designers/${designerId}/service-menus`,
                { params: { category: selectCategory } });

            setMenuList(response.data);
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


