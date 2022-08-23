import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { API } from "./global";
import './EditProfile.css';
import { NavBar } from "./NavBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <NavBar/>
      <div className="Edit-container">
        <form id="myForm-EditProfile" onSubmit={handleSubmit}>
          <TextField type="text"
            id="FirstName-EditProfile"
            label="First Name"
            name='FirstName'
            variant="outlined"
            value={values.FirstName}
            error={touched.FirstName && errors.FirstName}
            onChange={handleChange}
            helperText={touched.FirstName && errors.FirstName ? errors.FirstName : ""}
            onBlur={handleBlur}
          />
          
          <TextField type="text"
            id="LastName-EditProfile"
            label="Last Name"
            name='LastName'
            variant="outlined"
            value={values.LastName}
            error={touched.LastName && errors.LastName}
            onChange={handleChange}
            helperText={touched.LastName && errors.LastName ? errors.LastName : ""}
            onBlur={handleBlur}
          />
          
          
          <Button variant="outlined" type='submit' id="Save-Changes-EditProfile">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
