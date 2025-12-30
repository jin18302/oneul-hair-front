import type DesignerSummaryRes from "./DesignerSummaryRes";
import type { ShopDetailRes } from "./ShopDetailRes";

export interface ShopDetailState{

    shopDetail : ShopDetailRes | null,
    designerList : DesignerSummaryRes[]
}
