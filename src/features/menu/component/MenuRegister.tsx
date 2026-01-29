import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../../styles/Menu.css";
import MenuRegisterModal from "./MenuRegisterModal";
import { menuService } from "../service/menuService";
import type { CreateMenuReq } from "../type/request";
import { getAccessToken } from "../../../utils/tokenmanager";


export default function MenuRegister() {

    console.log("Menu rendering");

    const { designerId } = useParams();
    const navigator = useNavigate();

    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [selectCategory, setSelectCategory] = useState<string>("CUT") //분리 고려
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [requestList, setRequest] = useState<CreateMenuReq[]>([]);

    useEffect(() => {

        const categoryApiHandler = async () => {

           const categoryResponse = await menuService.getMenuCategoryList();
            setCategoryList(categoryResponse);
            setSelectCategory(categoryResponse[0]);
        }

        categoryApiHandler();
    }, []);


    const menuRegisterHanelr = () => { setIsShowModal(true) }
    const categoryChangeHandler = (c: string) => { setSelectCategory(c); }

    const submitHandler = async () => {

        if (requestList.length == 0) {  alert("하나 이상의 메뉴를 등록해야합니다.");};
        menuService.createMenu(designerId, requestList, getAccessToken());

        alert("등록이 완료되었습니다.");
        navigator("/my/designers/management");
    }


    return (
        <div>
            <div className="menu-container">
                <div className="category-container">
                    {categoryList.map(c => (
                        <div className="category-element" onClick={() => categoryChangeHandler(c)} key={c}>{c}</div>
                    ))}
                </div>

                <div className="menu-list">
                    {requestList.filter(r => r.category == selectCategory).map(m =>
                        <div className="menu-element" key={m.name}>
                            {m.name}<br />
                            {m.price}<br />
                            {m.introduction}
                        </div>)}
                </div>

                {isShowModal &&
                    <MenuRegisterModal
                        selectCategory={selectCategory} setRequest={setRequest} setIsShowModal={setIsShowModal} />
                }

                <button onClick={menuRegisterHanelr}>추가</button>
            </div>
            <button type="submit" onClick={submitHandler}>등록</button>
        </div>
    )
}
