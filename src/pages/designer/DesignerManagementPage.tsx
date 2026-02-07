import { useNavigate } from "react-router";
// import "../../styles/DesignerMenagement.css";
import { useGetDesignerList } from "../../features/designer/hook/useDesignerQuery";
import type { DesignerSummaryRes } from "../../features/designer/type/response";

export default function DesignerManagementPage() {

    const navigator = useNavigate();
    const {data: designerList} = useGetDesignerList("");

    const designerClickHandler = (d: DesignerSummaryRes) => { navigator(`/designers/${d.id}`); }
    
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