import { useNavigate } from "react-router";
import ImagePreview from "../../image/components/ImagePreview";
import type { DesignerSummaryRes } from "../type/response";

export default function DesignerSummary({ data }: { data: DesignerSummaryRes }) {

    const navigate = useNavigate();
    const designerClickHandler = (d: DesignerSummaryRes) => { navigate(`/designers/${d.id}`); }

    return (
        <div key={data.id} className="w-200 border border-b-5 mb-2.5"
            onClick={() => designerClickHandler(data)}
        >
            <ImagePreview image={data.profileImage} />
            name:{data.name}<br />
            introduce:{data.introduction}<br />
        </div>
    )
}