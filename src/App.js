import React from "react";
import { Routes,Route } from "react-router-dom";
import { AdditionalLinks } from "./AdditionalLinks";
import { Addposter } from "./Addposter";
import { AddMovie } from "./AddMovie";
import { AllMovie } from "./AllMovie";
// import { AllMovie2 } from "./AllMovie2";
import "./App.css";
import { EditProfile } from "./EditProfile";
import { HomePage } from "./HomePageContainer/HomePage";
import Movie from "./HomePageContainer/Movie";
import { LinkSend } from "./LinkSend";
import { LoginPage } from "./LoginPage";
import { NeedHelp } from "./NeedHelp";
import { ProfilePage } from "./ProfilePage";
import { Register } from "./Register";
import { WelcomePage } from "./WelcomePage";
import { AdminDashboard } from "./AdminDashboard";
import { AccountConfirmation } from "./AccountConfirmation";
import { VerifyYourEmail } from "./VerifyYourEmail";
import { DisplayPasswordForm } from "./ChangePassword";
import { AdminProfilePage } from "./AdminProfilePage";
import { EditAdminProfile } from "./EditAdminProfile";
import CustomizedSnackbars from "./Alert";
import { AdminMovies } from "./AdminMovies";
import { AdminUsersData } from "./AdminUsersData";
import { AdminBanners } from "./AdminBanners";
import { SearchMovie } from "./SearchMovie";
import { EditMovie } from "./EditMovie";
const LazyAllMovies2 = React.lazy(()=>import('./AllMovie2'))
function App() {
  // const token=localStorage.getItem("token");
  // const id=localStorage.getItem("id")
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/FAQ" element={<AdditionalLinks/>}/>
        <Route path="/login-page" element={<LoginPage/>}/>
        <Route path="/Need-Help" element={<NeedHelp/>}/>
        <Route path="/Register-now" element={<Register/>}/>
        <Route path="/HomePage/Onstream/:id" element={<HomePage/>}/>
        <Route path="/ProfilePage/Onstream/:id" element={<ProfilePage/>}/>
        <Route path="/Onstream/edit/:id" element={<EditProfile/>}/>
        <Route path="/movie/:id/:movieid" element={<Movie/>}/>
        <Route path="/movies/:id/:queryType/:query" element={<AllMovie/>}/>
        <Route path="/movies/search/:id/name/:query" element={<SearchMovie/>}/>
        <Route path="/movies/:id/All" element={<React.Suspense fallback="...Loading"><LazyAllMovies2/></React.Suspense>}/>
        <Route path="/Email-Sent/:email" element={<LinkSend/>}/>
        <Route path="/Onstream/AdminDashBoard/Add-Movie/:id" element={<AddMovie/>}/>
        <Route path="/Onstream/AdminDashBoard/:id" element={<AdminDashboard/>}/>
        <Route path="/Onstream/Add-poster" element={<Addposter/>}/>
        <Route path="/Onstream/AccountConfirmation/:email/:token" element={<AccountConfirmation/>}/>
        <Route path="/verify-email" element={<VerifyYourEmail/>}/>
        <Route path="/Onstream/forgotPassword/:email/:token" element={<DisplayPasswordForm/>}/>
        <Route path="/AdminProfilePage/Onstream/:id" element={<AdminProfilePage/>}/>
        <Route path="/Onstream/Edit/Admin/:id" element={<EditAdminProfile/>}/>
        <Route path="/Onstream/Alert" element={<CustomizedSnackbars/>}/>
        <Route path="/Onstream/AdminDashBoard/Movies/:id" element={<AdminMovies/>}/>
        <Route path="/Onstream/AdminDashBoard/banners/:id" element={<AdminBanners/>}/>
        <Route path="/Onstream/AdminDashBoard/users/:id" element={<AdminUsersData/>}/>
        <Route path="/Onstream/:id/editmovie/:movieId" element={<EditMovie/>}/>
        
      </Routes>

      
      
    </div>
  );
}

export default App;


