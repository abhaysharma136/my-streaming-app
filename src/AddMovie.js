import './AddMovie.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from './global';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from './firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminAppBar } from './AdminAppBar';



  const MovieValidationSchema=yup.object({
    id:yup.number().required(),
    name:yup.string().required(),
    director:yup.string().required(),
    Cast:yup.string().required(),
    Year:yup.number().required(),
    language:yup.string().required(),
    time:yup.string().required(),
    poster:yup.string().required(),
    summary:yup.string().required(),
    trailer:yup.string(),
    Genres:yup.string().required(),
    rating:yup.string().required(),
  })
export function AddMovie(newmovie) {
  const {id}=useParams();
  const navigate=useNavigate();
  const [percent, setPercent] = useState(0);
  const [urlResult,setUrlResult]=useState('');
  function handleUpload() {
    if (!file) {
        alert("Please choose a file first!")
    }
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrlResult(url);
          
          });
      }
  ); 
}
console.log(urlResult);
  const [file, setFile] = useState("");
 
  // Handles input change event and updates state
  function handleChangefile(event) {
      setFile(event.target.files[0]);
      
  }
  console.log(file);



  const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{poster:"",id:"",name:"",director:"",Cast:"",Year:"",language:"",time:"",trailer:"",summary:"",Genres:"",rating:""},
    validationSchema:MovieValidationSchema,
    onSubmit:(newmovie)=>{
      console.log("OnSubmit",newmovie);
      addMovie(newmovie);
      navigate(`/Onstream/AdminDashBoard/${id}`)
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
      <AdminAppBar/>
<h1>Add Movie </h1>
<div >
  <h3>Add new movies for your App from here</h3>
  <div>
  <form onSubmit={handleSubmit} className='Add-movie-container'>
<TextField 
 
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
label='Run Time'
onBlur={handleBlur} 
onChange={handleChange}
id='add-movie-time'
error={touched.time && errors.time}
helperText={touched.time && errors.time?errors.time:""}
className='add-movie-component' />

<div className='upload-inputs'>
<div>
<input type="file" accept="image/*" onChange={handleChangefile}/>

<Button onClick={handleUpload} type="button">Upload to Firebase</Button>
<p>{percent}"% done"</p>
</div>

<TextField 
type="text"
id='add-movie-poster' 
name='poster'
label='poster'
onBlur={handleBlur} 
onChange={handleChange}
value={values.poster}
error={touched.poster && errors.poster}
helperText={touched.poster && errors.poster?errors.poster:""}
className='add-movie-component' />
</div>


<div className='upload-inputs'>
  <div>
  <input type="file" accept='video/*' onChange={handleChangefile}/>
          <Button onClick={handleUpload} type="button">Upload to Firebase</Button>
          <p>{percent}"% done"</p>

  </div>

<TextField 
type="text"
label="trailer" 
id='add-movie-trailer' 
className='add-movie-component' 
name='trailer'
onChange={handleChange}/>
</div>

<div className='select-fields'>
  <div>
  <FormControl>
<InputLabel id='movie-Genre' >Genres</InputLabel>
<Select 
id='movie-Genre' 
name='Genres' 
label='Genres' 
defaultValue=""
error={touched.Genres && errors.Genres}
onChange={handleChange("Genres")}>
  <MenuItem value="Comedy">Comedy</MenuItem>
  <MenuItem value="Horror">Horror</MenuItem>
  <MenuItem value="Action">Action</MenuItem>
  <MenuItem value="Documentary">Documentary</MenuItem>
  <MenuItem value="Romance">Romance</MenuItem>
</Select>
</FormControl>
  </div>

<div>
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
</div>

</div>

<TextField 
id='add-movie-summary' 
name='summary' 
multiline
label="Summary"
rows={4}  
onChange={handleChange}
error={touched.summary && errors.summary}
onBlur={handleBlur}
helperText={touched.summary && errors.summary?errors.summary:""} />
<Button variant="contained" type='submit'>Add Movie</Button>
</form>
<p>{urlResult}</p>
  </div>
  
</div>
    </div>
  );
}
