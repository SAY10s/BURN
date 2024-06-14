import { Link, Outlet } from "react-router-dom";
import { Menu } from "../../assets/icons.tsx";

const Root = () => {
  return (
    <div className="root">
      <Link to={"/"} className="menu-link">
        <Menu />
      </Link>
      <Outlet />
    </div>
  );
};

export default Root;
