import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../AxiosInstance";
import "../../styles/Menu.css";
import MenuRegister from "./MenuRegister";

export type requestType = {
    category: string,
    name: string,
    price: number,
    introduction: string
};

export default function Menu() {

    const { designerId } = useParams();
    const navigator = useNavigate();

    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [selectCategory, setSelectCategory] = useState<string>("CUT") //분리 고려
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [requestList, setRequest] = useState<requestType[]>([]);

    useEffect(() => {

        const categoryApiHandler = async () => {

            const response = await axiosInstance.get<string[]>('/auth/menu-categories');
            setCategoryList(response.data);
            setSelectCategory(response.data[0]);
        }

        categoryApiHandler();
    }, []);


    const menuRegisterHanelr = () => { setIsShowModal(true) }
    const categoryChangeHandler = (c: string) => { setSelectCategory(c); }
    
    const submitHandler = async() => {

        if(requestList.length == 0){
            alert("하나 이상의 메뉴를 등록해야합니다.");
        }

        const token = localStorage.getItem("token");
         await axiosInstance.post(`/designers/${designerId}/service-menus`,
            requestList, { headers: { 'Authorization': token } })

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
                    <MenuRegister
                        selectCategory={selectCategory} setRequest={setRequest} setIsShowModal={setIsShowModal} />
                }

                <button onClick={menuRegisterHanelr}>추가</button>
            </div>
            <button type="submit" onClick={submitHandler}>등록</button>
        </div>
    )
}
