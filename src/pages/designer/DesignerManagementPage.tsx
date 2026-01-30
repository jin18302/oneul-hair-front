import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type DesignerSummaryRes from "../../types/DesignerSummaryRes";
import { getAccessToken } from "../../utils/tokenmanager";
import "../../styles/DesignerMenagement.css";
import { designerService } from "../../features/designer/service/designerService";

export default function DesignerManagementPage() {

    const navigator = useNavigate();

    const [designerList, setDesignerList] = useState<DesignerSummaryRes[]>([]);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const apiHandler = async () => {

            const response = await designerService.getDesignerListByOwner(getAccessToken());

            setDesignerList(response);
            setIsLoding(false);
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