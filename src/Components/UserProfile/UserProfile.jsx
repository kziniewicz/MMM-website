import React from "react";
import { useLoggedInUser } from "../../js/user";
import userImage from "../../images/user.jpg";
import "./css/user.css";
import UserMenu from "./UserMenu";

const UserProfile = () => {
  const { data, isLoading, isError } = useLoggedInUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while fetching user data</div>;
  }

  return (
    <div>
      <h1>Profil użytkownika</h1>
      <div className="user-grid">
        <UserMenu />
        <div className="userImage">
          <img src={userImage} />
          <button>Zmień zdjęcie profilowe</button>
        </div>
        <div className="user-content">
          <h3>Imię i nazwisko:</h3>
          <p>{data.fullName}</p>
          <h3>Email:</h3>
          <p>{data.email}</p>
          <h3>User ID:</h3>
          <p>{data.id}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
