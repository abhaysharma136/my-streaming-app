import React from "react";
import { Routes, Route } from "react-router-dom";
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
import { OldRegister } from "./Register";
import { WelcomePage } from "./WelcomePage";
import { AdminDashboard } from "./AdminDashboard";
import { AccountConfirmation } from "./AccountConfirmation";
import { VerifyYourEmail } from "./VerifyYourEmail";
import { DisplayPasswordForm } from "./ChangePassword";
import { AdminProfilePage } from "./AdminProfilePage";
import { EditAdminProfile } from "./EditAdminProfile";
import { AdminMovies } from "./AdminMovies";
import { AdminUsersData } from "./AdminUsersData";
import { AdminBanners } from "./AdminBanners";
import { SearchMovie } from "./SearchMovie";
import { EditMovie } from "./EditMovie";
import { EditBanner } from "./EditBanner";
import Example from "./Loading";
import { AddBanner } from "./AddBanner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetails";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import Profile from "./pages/Profile";
const LazyAllMovies2 = React.lazy(() => import("./AllMovie2"));
function App() {
  // const token=localStorage.getItem("token");
  // const id=localStorage.getItem("id")

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/FAQ" element={<AdditionalLinks />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/Need-Help" element={<NeedHelp />} />
        <Route path="/Loading" element={<Example />} />
        <Route path="/Register-now" element={<OldRegister />} />

        <Route path="/HomePage/Onstream/:id" element={<HomePage />} />
        <Route path="/ProfilePage/Onstream/:id" element={<ProfilePage />} />
        <Route path="/Onstream/edit/:id" element={<EditProfile />} />
        <Route path="/movie/:id/:movieid" element={<Movie />} />
        <Route path="/movies/:id/:queryType/:query" element={<AllMovie />} />
        <Route
          path="/movies/search/:id/name/:query"
          element={<SearchMovie />}
        />
        <Route
          path="/movies/:id/All"
          element={
            <React.Suspense fallback={<Example />}>
              <LazyAllMovies2 />
            </React.Suspense>
          }
        />
        <Route path="/Email-Sent/:email" element={<LinkSend />} />
        <Route
          path="/Onstream/AdminDashBoard/Add-Movie/:id"
          element={<AddMovie />}
        />
        <Route
          path="/Onstream/AdminDashBoard/Add-Banner/:id"
          element={<AddBanner />}
        />
        <Route
          path="/Onstream/AdminDashBoard/:id"
          element={<AdminDashboard />}
        />
        <Route path="/Onstream/Add-poster" element={<Addposter />} />
        <Route
          path="/Onstream/AccountConfirmation/:email/:token"
          element={<AccountConfirmation />}
        />
        <Route path="/verify-email" element={<VerifyYourEmail />} />
        <Route
          path="/Onstream/forgotPassword/:email/:token"
          element={<DisplayPasswordForm />}
        />
        <Route
          path="/AdminProfilePage/Onstream/:id"
          element={<AdminProfilePage />}
        />
        <Route path="/Onstream/Edit/Admin/:id" element={<EditAdminProfile />} />
        <Route
          path="/Onstream/AdminDashBoard/Movies/:id"
          element={<AdminMovies />}
        />
        <Route
          path="/Onstream/AdminDashBoard/banners/:id"
          element={<AdminBanners />}
        />
        <Route
          path="/Onstream/AdminDashBoard/users/:id"
          element={<AdminUsersData />}
        />
        <Route
          path="/Onstream/:id/editmovie/:movieId"
          element={<EditMovie />}
        />
        <Route
          path="/Onstream/:id/editbanner/:bannerId"
          element={<EditBanner />}
        />
      </Routes>
    </div>
  );
}

export default App;
