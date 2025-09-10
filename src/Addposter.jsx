import { useFormik } from "formik";
import * as yup from 'yup';


const NameValidationSchema=yup.object({
  name:yup.string().required(),
})
export function Addposter() {
  
  

  const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{name:""},
    validationSchema:NameValidationSchema,
    enableReinitialize:true,
    onSubmit:(newmovie)=>{
      console.log("OnSubmit",newmovie);
      // addMovie(newmovie);
    }
  })
  
  
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"
        name="name"
        placeholder="name" 
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.name && errors.name}
        value={values.name}/>
        <button type="submit">Submit</button>
      </form>
      {touched.name && errors.name?errors.name:""}
    </div>
  )
}
