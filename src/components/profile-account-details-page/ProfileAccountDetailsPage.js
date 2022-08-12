import { useEffect, useState } from "react";
import { API } from "../../global";
import { ProfileAccountForm } from "./ProfileAccountForm";
import { ProfileSideBar } from "../ProfileSideBar";

export function ProfileAccountDetailsPage() {

  const user = window.localStorage.getItem('user');
  const token = window.localStorage.getItem('token');

  const [initialForm, setInitialForm] = useState(null);

  const getInitialForm = () => {
    fetch(`${API}/profile-page/account-details`, {
      method: 'POST',
      body: JSON.stringify({ user: user }),
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      }
    })
      .then(result => result.json())
      .then(data => { setInitialForm(data); })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getInitialForm();
  }, []);


  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <h3>Account Details</h3>
        {initialForm ? <ProfileAccountForm initialForm={initialForm} /> : <h3>Loading...</h3>}
      </div>
    </div>
  );
}