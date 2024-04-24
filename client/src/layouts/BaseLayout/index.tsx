import { Outlet } from "react-router-dom";
import "./styles.css";

export default function BaseLayout() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
