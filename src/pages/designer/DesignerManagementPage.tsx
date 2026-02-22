import { useNavigate } from "react-router";
import DesignerSummary from "../../features/designer/component/DesignerSummary";
import { useGetDesignerList } from "../../features/designer/hook/useDesignerQuery";

export default function DesignerManagementPage() {

    const navigator = useNavigate();
    const {data: designerList} = useGetDesignerList("");
    
    return (
        <div className="col-start-1 col-end-12 row-start-1 row-end-12">
                {designerList && designerList.map(d =><DesignerSummary data={d}/>)}
                <button onClick={() => navigator("/my/shops/designers")}>디자이너 등록</button>
            </div>
    )
}