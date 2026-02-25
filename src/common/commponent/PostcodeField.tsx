import { ErrorMessage, Field, useFormikContext } from 'formik';
import { useKakaoPostcodePopup } from 'react-daum-postcode';

export default function PostcodeField({ field }: { field: string }) {

    const { setFieldValue } = useFormikContext();

    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useKakaoPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data: { jibunAddress : string | null, autoJibunAddress: string }) => {

        console.log("data:", data);

       if(data.jibunAddress == ""){
        setFieldValue(field, data.autoJibunAddress); 
        return;
       }
         setFieldValue(field, data.jibunAddress); 
        };

    // 버튼 클릭 시 팝업을 여는 함수
    const handleClick = () => {
        open({ onComplete: handleComplete, autoMapping: true });
    };

    return (
        <>

            <div className="w-full">
                <Field className="inline w-[70%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]"
                    name={field} type="text" placeholder="address" />
                <button className='inline' type="button" onClick={handleClick}>주소 검색</button>
                <ErrorMessage name={field} component="" />
            </div>
        </>
    );
}