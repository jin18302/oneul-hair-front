import { useState } from "react";
import { useNavigate, useParams } from "react-router";
// import "../../styles/Menu.css";
import { useCreateMenuQuery, useGetCategoriesQuery } from "../hook/useMenuQuery";
import type { CreateMenuReq } from "../type/request";
import MenuRegisterModal from "./MenuRegisterModal";

export default function MenuRegister() {

    console.log("Menu rendering");

    const { designerId } = useParams() as {designerId: string};
    const navigator = useNavigate();

    const { data: categoryList} = useGetCategoriesQuery();
    const { mutateAsync: createMenu } = useCreateMenuQuery();

    const [selectCategory, setSelectCategory] = useState<string>("CUT") //분리 고려
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [requestList, setRequest] = useState<CreateMenuReq[]>([]);

    const menuRegisterHanelr = () => { setIsShowModal(true) }
    const categoryChangeHandler = (c: string) => { setSelectCategory(c); }

    const submitHandler = async () => {

        if (requestList.length == 0) { alert("하나 이상의 메뉴를 등록해야합니다."); };
        
        await createMenu({ designerId: designerId, body: requestList });
        alert("등록이 완료되었습니다.");
        navigator("/my/designers/management");
    }

    return (
        <div>
            <div className="col-start-1 col-end-12 row-start-1 row-end-12
            flex flex-col items-center text-center w-200 border border-black">
                <div className="flex w-200 border border-black">
                    {categoryList?.map(c => (
                        <div className="inline-block grow border border-black" onClick={() => categoryChangeHandler(c)} key={c}>{c}</div>
                    ))}
                </div>

                <div >
                    {requestList.filter(r => r.category == selectCategory).map(m =>
                        <div className="w-200 border border-black" key={m.name}>
                            {m.name}<br />
                            {m.price}<br />
                            {m.introduction}
                        </div>)}
                </div>

                {isShowModal &&
                <MenuRegisterModal selectCategory={selectCategory} setRequest={setRequest} setIsShowModal={setIsShowModal} />}

                <button onClick={menuRegisterHanelr}>추가</button>
            </div>
            <button type="submit" onClick={submitHandler}>등록</button>
        </div>
    )
}
