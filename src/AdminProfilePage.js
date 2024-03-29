import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAppBar } from "./AdminAppBar";
import { API } from "./global";
import Example from "./Loading";

export function AdminProfilePage() {
  const { id } = useParams();
  console.log(id);
  const [userDetails, setUserDetails] = useState();

  const GetUserDetails = () => {
    const res = fetch(`${API}/users/${id}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((user) => setUserDetails(user));
  };

  useEffect(() => GetUserDetails(), []);

  return (
    <div className="">
      <AdminAppBar userDetails={userDetails} />
      {userDetails ? (
        <DisplayUserData userDetails={userDetails} />
      ) : (
        <Example />
      )}
    </div>
  );
}

function DisplayUserData({ userDetails }) {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("message");
    navigate(`/`);
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("token");
    if (isAuth === false || isAuth == null) {
      navigate("/");
    }
  }, []);

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
            onClick={() => navigate(`/Onstream/edit/Admin/${userDetails._id}`)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
