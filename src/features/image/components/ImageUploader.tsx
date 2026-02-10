import { useFormikContext } from "formik";
import { useState } from "react";

export default function ImageUploader({fieldName}
    :{fieldName: string}){

    const {setFieldValue} = useFormikContext();
    const [uploadImgUrl, setUploadImgUrl] = useState("");


    const onchangeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files == null) { return; }

        const uploadFile = files[0];
        setFieldValue(fieldName, uploadFile);

        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => {
            setUploadImgUrl(reader.result as string);
        }
    }

    return (
        <>
            <img className="image-preview" src={uploadImgUrl} />
            <input name = {fieldName} type="file" accept="image/*" onChange={onchangeImageUpload} />
        </>
    )
}