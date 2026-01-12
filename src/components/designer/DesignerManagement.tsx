import { useEffect, useState } from "react"
import type DesignerSummaryRes from "../../types/DesignerSummaryRes"
import { axiosInstance } from "../../AxiosInstance";
import { HttpStatusCode, isAxiosError } from "axios";
import { useNavigate } from "react-router";
import "../../styles/DesignerMenagement.css"

export default function DesignerManagement() {

    const navigator = useNavigate();

    const [designerList, setDesignerList] = useState<DesignerSummaryRes[]>([]);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const apiHandler = async () => {
            const token = localStorage.getItem("token");

            try {
                const reponse = await axiosInstance.get<DesignerSummaryRes[]>(`/shops/designers`,
                    { headers: { 'Authorization': token } });

                if (reponse.status == HttpStatusCode.NotFound) {
                    return "";
                    //  TODO 예외처리를 어케할지
                }

                setDesignerList(reponse.data);
                setIsLoding(false);

            } catch (e: unknown) {
                if (isAxiosError(e)) {
                    alert("데이터 로드중 문제 발생");
                }
            }
        }
        apiHandler();
    }, []);

    const designerClickHandler = (d: DesignerSummaryRes) => { navigator(`/designers/${d.id}`); }

    if (isLoding) { return <div>Loading...</div> }

    return (
        <div className="designer-management-container">
           <div className="designer-list">
                {designerList && designerList.map(d =>
                    <div key={d.id} className="designer" onClick={() => designerClickHandler(d)}>
                        id:{d.id}<br />
                        image: {d.profileImage}<br />
                        name:{d.name}<br />
                        introduce:{d.introduction}<br />
                    </div>
                )}

                 <button onClick={() => navigator("/my/shops/designers")}>디자이너 등록</button>
            </div>

           
        </div>
    )
}