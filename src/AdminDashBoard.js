import './AdminDashBoard.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from './global';



  const MovieValidationSchema=yup.object({
    id:yup.number().required(),
    name:yup.string().required(),
    director:yup.string().required(),
    Cast:yup.string().required(),
    Year:yup.number().required(),
    language:yup.string().required(),
    time:yup.string().required(),
    poster:yup.string(),
    summary:yup.string().required(),
    trailer:yup.string(),
    Genre:yup.string().required(),
    rating:yup.string().required(),
  })
export function AddMovie(newmovie) {

  const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{id:"",name:"",director:"",Cast:"",Year:"",language:"",time:"",poster:"",trailer:"",summary:"",Genre:"",rating:""},
    validationSchema:MovieValidationSchema,
    onSubmit:(newmovie)=>{
      console.log("OnSubmit",newmovie);
      // addMovie(newmovie);
      
    }
  })
function addMovie(newmovie){
fetch(`${API}/movies/add`,{
  method:"POST",
  body:JSON.stringify(newmovie),
  headers:{
    "content-type":"application/json",
  }

})

}
  return (
    <div className="Admin-portal-container">
Admin HomePage
<div className='Add-movie-container'>
  <p>Add Movies</p>
  <div>
  <form onSubmit={handleSubmit}>
<TextField 
 variant='standard'
 label='id'
 name='id'
 value={values.id}
 id='add-movie-id'
 onBlur={handleBlur} 
 onChange={handleChange}
 error={touched.id && errors.id}
 helperText={touched.id && errors.id?errors.id:""}
 className='add-movie-component' />
 

<TextField 
variant='standard'
label='name'
name='name'
value={values.name}
id='add-movie-name' 
onBlur={handleBlur} 
onChange={handleChange}
error={touched.name && errors.name}
helperText={touched.name && errors.name?errors.name:""}
className='add-movie-component' />

<TextField 
type="text" 
name='director'
value={values.director}
variant='standard'
label='Director'
onBlur={handleBlur} 
onChange={handleChange}
id='add-movie-director' 
error={touched.director && errors.director}
helperText={touched.director && errors.director?errors.director:""}
className='add-movie-component' />


<TextField 
type="text" 
name='Cast'
value={values.Cast}
variant='standard'
label='Cast'
id='add-movie-cast' 
onBlur={handleBlur} 
onChange={handleChange}
error={touched.Cast && errors.Cast}
helperText={touched.Cast && errors.Cast?errors.Cast:""}
className='add-movie-component' />


<TextField
name='Year'
value={values.Year}
variant='standard'
label='Year' 
id='add-movie-year' 
onBlur={handleBlur} 
onChange={handleChange}
error={touched.Year && errors.Year}
helperText={touched.Year && errors.Year?errors.Year:""}
className='add-movie-component' />


<TextField 
type="text" 
name='language'
value={values.language}
variant='standard'
label='language'
onBlur={handleBlur} 
onChange={handleChange}
error={touched.language && errors.language}
helperText={touched.language && errors.language?errors.language:""}
className='add-movie-component' />


<TextField 
type="text"
name='time'
value={values.time}
variant='standard'
label='Run Time'
onBlur={handleBlur} 
onChange={handleChange}
id='add-movie-time'
error={touched.time && errors.time}
helperText={touched.time && errors.time?errors.time:""}
className='add-movie-component' />

<Button variant='contained' component='label'>
  Upload Poster
<input 
multiple type="file"
accept='image/*'
id='add-movie-poster' 
name='poster'
className='add-movie-component'
onChange={handleChange} ></input>
</Button>

<textarea 
id='add-movie-summary' 
name='summary' 
rows='5' 
cols='40' 
onChange={handleChange}
error={touched.summary && errors.summary}
onBlur={handleBlur}
helperText={touched.summary && errors.summary?errors.summary:""} />

<Button variant='contained' component='label'>
Upload Movie
<input  
accept='video/*'  
type="file" 
id='add-movie-trailer' 
className='add-movie-component' 
name='trailer'
onChange={handleChange}></input>
</Button>

<FormControl>
<InputLabel id='movie-Genre' >Genre</InputLabel>
<Select 
id='movie-Genre' 
name='Genre' 
label='Genre' 
defaultValue=""
error={touched.Genre && errors.Genre}
onChange={handleChange("Genre")}>
  <MenuItem value="Comedy">Comedy</MenuItem>
  <MenuItem value="Horror">Horror</MenuItem>
  <MenuItem value="Action">Action</MenuItem>
  <MenuItem value="Documentary">Documentary</MenuItem>
  <MenuItem value="Romance">Romance</MenuItem>
</Select>
</FormControl>

<FormControl>
<InputLabel id='movie-rating' >Rating</InputLabel>
<Select 
id='movie-rating' 
name='rating' 
label="rating"
onChange={handleChange("rating")}
error={touched.rating && errors.rating}
defaultValue="">
  <MenuItem value="1">1</MenuItem>
  <MenuItem value="2">2</MenuItem>
  <MenuItem value="3">3</MenuItem>
  <MenuItem value="4">4</MenuItem>
  <MenuItem value="5">5</MenuItem>
  <MenuItem value="6">6</MenuItem>
  <MenuItem value="7">7</MenuItem>
  <MenuItem value="8">8</MenuItem>
  <MenuItem value="9">9</MenuItem>
  <MenuItem value="10">10</MenuItem>
</Select>
</FormControl>
<Button variant="contained" type='submit'>Add Movie</Button>
</form>
  </div>
  
</div>
    </div>
  );
}
