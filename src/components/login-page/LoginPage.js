import HypeKicks from "../../images/Hype Kicks.png";
import { LoginForm } from "./LoginForm";


export function LoginPage() {
  return (
    <div className="login-page">
      <img src={HypeKicks} alt="logo" />
      <LoginForm />
    </div>
  );
}
