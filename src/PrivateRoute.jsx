import React from 'react';
import { Navigate, Route, Routes} from "react-router-dom";
import { HomePage } from "./HomePageContainer/HomePage";




const PrivateRoute = () => {
  
    return (
     <><Route path="/HomePage/Onstream/:id" element={HomePage} />
     <Navigate to='/HomePage/Onstream/:id"' /></>
        
      
        
      
    )
  }
  
  export default PrivateRoute;