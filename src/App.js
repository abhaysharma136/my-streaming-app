import { Routes,Route } from "react-router-dom";
import { AdditionalLinks } from "./AdditionalLinks";
import "./App.css";
import { CreateProfile } from "./CreateProfile";
import { HomePage } from "./HomePageContainer/HomePage";
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
        <Route path="/Create-Profile" element={<CreateProfile/>}/>
        <Route path="/HomePage/Onstream" element={<HomePage/>}/>
        <Route path="/ProfilePage/Onstream" element={<ProfilePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;


