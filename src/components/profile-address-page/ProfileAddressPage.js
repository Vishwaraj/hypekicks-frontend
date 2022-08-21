import { ProfileAddressForm } from "./ProfileAddressForm";
import { ProfileSideBar } from "../ProfileSideBar";

export function ProfileAddressPage() {
  const addressStyle = {
    marginBottom: "2rem",
    marginLeft: "1rem",
  };
 
  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <h3 style={addressStyle}>Billing Address</h3>
        <ProfileAddressForm />
      </div>
    </div>
  );
}
