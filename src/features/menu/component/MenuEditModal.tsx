import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import "../../styles/Menu.css";
import type { MenuRes } from "../type/response";
import { menuService } from "../service/menuService";
import { getAccessToken } from "../../../utils/tokenmanager";

export default function MenuEditModal({menuRes, setEditMode}
    :{menuRes:MenuRes, setEditMode: (b:boolean) => void}) {

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
                     
                       menuService.updateMenu(menuRes, request, getAccessToken());
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