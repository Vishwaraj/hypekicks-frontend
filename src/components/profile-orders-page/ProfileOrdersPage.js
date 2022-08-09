import { OrderList } from "./OrderList";
import { ProfileSideBar } from "../ProfileSideBar";

export function ProfileOrdersPage() {
  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <h3>Orders</h3>
        <OrderList />
      </div>
    </div>
  );
}
