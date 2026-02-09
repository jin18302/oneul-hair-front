import { useState } from "react";

export default function ImageUploader({setImage}:{setImage: (image: File) => void}){

    const [uploadImgUrl, setUploadImgUrl] = useState("");


    const onchangeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files == null) { return; }
        setImage(files[0]);

        const uploadFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => {
            setUploadImgUrl(reader.result as string);
        }
    }

    return (
        <>
            <img className="image-preview" src={uploadImgUrl} />
            <input type="file" accept="image/*" onChange={onchangeImageUpload} />
        </>
    )
}