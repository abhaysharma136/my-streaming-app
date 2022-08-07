import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { API } from "./global";
import './EditProfile.css';



const PasswordValidationSchema=yup.object({
  FirstName:yup.string().required(),
  LastName:yup.string().required()
})
export function EditProfile() {
  const navigate=useNavigate();
  const {id}=useParams();
  console.log(id);
  function CreateUser(newDetails){
    const res=fetch(`${API}/users/${id}`,{
      method:"PUT",
      body:JSON.stringify(newDetails),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then((result)=>result.json()).then(()=>navigate(`/ProfilePage/Onstream/${id}`));
}

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{FirstName:"",LastName:""},
  validationSchema:PasswordValidationSchema,
  onSubmit:(newDetails)=>{
    console.log("OnSubmit",newDetails);
    CreateUser(newDetails)
  }
})

  return (
    <div className="top-container">
      <div className="Edit-container">
        <form id="myForm-EditProfile" onSubmit={handleSubmit}>
          <input type="text"
            id="FirstName-EditProfile"
            placeholder="First Name"
            name='FirstName'
            value={values.FirstName}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.FirstName && errors.FirstName ? errors.FirstName : ""}
          <input type="text"
            id="LastName-EditProfile"
            placeholder="Last Name"
            name='LastName'
            value={values.LastName}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.LastName && errors.LastName ? errors.LastName : ""}
          <br />
          <button type='submit' id="Save-Changes-EditProfile">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
