import { Routes,Route } from "react-router-dom";
import { AdditionalLinks } from "./AdditionalLinks";
import { AllMovie } from "./AllMovie";
import { AllMovie2 } from "./AllMovie2";
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

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/FAQ" element={<AdditionalLinks/>}/>
        <Route path="/login-page" element={<LoginPage/>}/>
        <Route path="/Need-Help" element={<NeedHelp/>}/>
        <Route path="/Register-now" element={<Register/>}/>
        <Route path="/HomePage/Onstream/:id" element={<HomePage />}/>
        <Route path="/ProfilePage/Onstream/:id" element={<ProfilePage/>}/>
        <Route path="/Onstream/edit/:id" element={<EditProfile/>}/>
        <Route path="/movie/:id/:movieid" element={<Movie/>}/>
        <Route path="/movies/:id/:queryType/:query" element={<AllMovie/>}/>
        <Route path="/movies/:id/All" element={<AllMovie2/>}/>
        <Route path="/Email-Sent/id" element={<LinkSend/>}/>
      </Routes>

      
      
    </div>
  );
}

export default App;


