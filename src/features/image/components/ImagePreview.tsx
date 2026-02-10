import { useGetPreviewPresigned } from "../hooks/useImageQuery"

export default function ImagePreview({image}:{image: string}){

    const {data: imageSource} = useGetPreviewPresigned(image);

    return(
         <img className="image-preview" src={imageSource.url} />
    )
}