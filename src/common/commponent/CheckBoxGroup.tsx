import { useFormikContext } from "formik";
import type { CheckBoxItem } from "../types/checkBoxItem";

export default function CheckBoxGroup<T extends CheckBoxItem, K>({ itemList, field }: { itemList: T[], field: keyof K & string }) {

    const { setFieldValue, values } = useFormikContext<K>();
    const checkedItemList = (values[field] as number[]) || [];

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, item: CheckBoxItem) => {
        if (e.target.checked) {
            setFieldValue(field, [...checkedItemList, item.id]);

        } else {
            const filterResult = checkedItemList.filter(t => t != item.id);
            setFieldValue(field, filterResult);
        }
    }

    return (
        <div>
            {itemList.map(item => (
                <div className="check-element" key={item.id}>
                    <input key={item.id} type="checkbox"
                        checked={checkedItemList.includes(item.id)}
                        onChange={(e) => checkHandler(e, item)}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                    <br />
                </div>
            ))}
        </div>
    )
}

