import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";
import { NavBar } from "./NavBar";
import "./ProfilePage.css";
import EditIcon from '@mui/icons-material/Edit';
import Example from "./Loading";

export function ProfilePage() {
  const { id } = useParams();
  console.log(id);
  const [userDetails, setUserDetails] = useState();
  console.log(userDetails);

  const GetUserDetails = () => {
    const res = fetch(`${API}/users/${id}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((user) => setUserDetails(user));
  };

  useEffect(() => GetUserDetails(),[]);

  return (
    <div>
      <NavBar />
      {userDetails ? (
        <DisplayUserData userDetails={userDetails} />
      ) : (
        <Example/>
      )}
    </div>
  );
}




function DisplayUserData({ userDetails }) {
  const navigate = useNavigate();
  return (
    <div className="profilePage-container">
      <div className="form-container-profilePage">
        <div className="form-profilePage">
          <div type="text" id="firstName-profilePage">
            {userDetails.FirstName}
          </div>

          <div id="LastName-profilePage">{userDetails.LastName}</div>

          <div id="Email-profilePage">{userDetails.email}</div>

          <button
            type="button"
            className="saveButton-profilePage"
            onClick={() => navigate(`/Onstream/edit/${userDetails._id}`)}
          >
            <EditIcon/>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
