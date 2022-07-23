import { Routes,Route } from "react-router-dom";
import { AdditionalLinks } from "./AdditionalLinks";
import "./App.css";
import { CreateProfile } from "./CreateProfile";
import { HomePage } from "./HomePageContainer/HomePage";
import Movie from "./HomePageContainer/Movie";
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
        <Route path="/Register-now/:id" element={<Register/>}/>
        <Route path="/Create-Profile/:id" element={<CreateProfile/>}/>
        <Route path="/HomePage/Onstream/:id" element={<HomePage />}/>
        <Route path="/ProfilePage/Onstream/:id" element={<ProfilePage/>}/>
        <Route path="/movie/:id" element={<Movie/>}/>
      </Routes>

      
      
    </div>
  );
}

export default App;


