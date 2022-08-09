import { ProfileDashboard } from "./ProfileDashboard";
import { ProfileSideBar } from "../ProfileSideBar";

export function ProfilePage() {
  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <ProfileDashboard />
      </div>
    </div>
  );
}
