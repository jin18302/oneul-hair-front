import { ErrorMessage, Field } from "formik";

export default function InputField({ name, type, placeholder, label, as }: { name: string, label?: boolean, type: string, placeholder?: string, as?:string }) {

    return (
        <>
            {label && <label htmlFor={name}>{name}</label>}
            <Field as ={as ? as : "input"} id={name} className="inline w-[70%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name={name} type={type} placeholder={placeholder} />
            <ErrorMessage name="name" component="" />
        </>
    )
}