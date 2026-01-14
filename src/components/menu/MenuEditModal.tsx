import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { axiosInstance } from "../../AxiosInstance";
import "../../styles/Menu.css";
import { type ServiceMenuRes } from "../../types/ServiceMenuRes";

export default function MenuEditModal({menuRes, setEditMode}
    :{menuRes:ServiceMenuRes, setEditMode: (b:boolean) => void}) {

    // const navigator = useNavigate();


    return (
           <>
               <Formik initialValues={menuRes}
                
                onSubmit={async (data, { setSubmitting, resetForm }) => {
   
                       setSubmitting(true);
   
                       const request = {
                           category: menuRes.category,
                           name: data.name,
                           price: Number(data.price),
                           introduction: data.introduction 
                       };

                       const token = localStorage.getItem("token");
                       await axiosInstance.patch(`/service-menus/${menuRes.id}`, request,  { headers: { 'Authorization': token } });

                       alert("수정이 완료되었습니다.");
                       setEditMode(false);
   
                       resetForm();
                   }}
   
                   validationSchema={Yup.object().shape({
                       name: Yup.string().required(),
                       price: Yup.string().required(),
                       introduction: Yup.string().required()
   
                   })}
               >
                   <Form className="form">
                       <Field className="input-field" name="name" type="name" placeholder="name:" />
                       <ErrorMessage name="name" component="" />
   
   
                       <Field className="input-field" name="price" type="text" placeholder="price:" />
                       <ErrorMessage name="price" component="" />
   
                       <Field className="input-field" name="introduction" type="text" placeholder="introduction:" />
                       <ErrorMessage name="introduction" component="" />
   
                       <button type="submit"> 완료 </button>
                   </Form>
               </Formik>
           </>)
}